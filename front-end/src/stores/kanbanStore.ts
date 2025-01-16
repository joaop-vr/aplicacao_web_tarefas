import type { Column, Task } from "@/types";
import { useLocalStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// URL base da API
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Substitua pela URL correta
let key = "KANBAN-STORE";

export const STORE = useLocalStorage<Column[]>(key, []);

export function createColumn(name: Column["name"]) {
  STORE.value.push({
    columnId: uuidv4(), // Cria um ID único para cada coluna
    name,
    tasks: [],
  });
}

export function updateColumn(payload: Pick<Column, "name" | "columnId">) {
  let column = STORE.value.find(
    (column: Column) => column.columnId === payload.columnId
  );

  if (!column) return;

  column.name = payload.name;
}

export function deleteColumn(columnId: Column["columnId"]) {
  STORE.value = STORE.value.filter(
    (column: Column) => column.columnId !== columnId
  );
}

export function moveColumn(
  columnId: Column["columnId"],
  targetColumnId: Column["columnId"]
) {
  let columnToMove: Column;
  let targetColumnIndex: number;

  // Filtra as colunas, removendo a coluna a ser movida e encontrando o índice da coluna de destino
  STORE.value = STORE.value.filter((column: Column, index: number) => {
    if (column.columnId === columnId) {
      columnToMove = column;
      return false;
    }

    if (column.columnId === targetColumnId) {
      targetColumnIndex = index;
    }

    return true;
  });

  // Insere a coluna movida na posição correta
  STORE.value.splice(targetColumnIndex!, 0, columnToMove!);
}

// Função para obter todas as tarefas agrupadas por status
export async function fetchTasks() {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    console.log("Dados recebidos do banco:", response.data);

    // Formatação dos dados para renomear 'id' para 'taskId'
    const formattedData = response.data.map((task: any) => ({
      ...task,
      taskId: task.id, // Renomeia o campo 'id' para 'taskId'
    }));

    console.log("Dados formatados:", formattedData);
    return formattedData; // Retorna os dados formatados
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
}

// Função para carregar tarefas do backend e atualizar as colunas
export async function loadTasks() {
  try {
    const tasks: Task[] = await fetchTasks();

    console.log("Resposta do Fetch:");
    console.log(tasks);

    // Atualiza as tarefas em cada coluna de acordo com o status
    STORE.value.forEach((column: Column) => {
      column.tasks = tasks.filter((task) => {
        // Formate o nome da coluna para garantir que a comparação seja feita corretamente
        const formattedColumnName = column.name
          .toLowerCase()
          .normalize("NFD") // Normaliza a string para decompor os caracteres com acento
          .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
          .replace(" ", "-"); // Substitui o espaço por hífen
        console.log(`formattedColumnName: ${formattedColumnName}`);

        // Verifique se o status da tarefa corresponde ao nome da coluna
        if (task.status === formattedColumnName) {
          return true;
        }
        return false;
      });
    });

    // Verifique o conteúdo de STORE após a atualização
    console.log("Valores de STORE:");
    console.log(STORE.value);
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
}

// Função para criar uma nova tarefa
export async function createTask(
  payload: Pick<Task, "title" | "description" | "status">
) {
  try {
    const response = await axios.post(`${API_BASE_URL}/task`, payload);
    loadTasks();
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}

// Função para atualizar uma tarefa
export async function updateTask(
  taskId: Task["taskId"],
  updates: Partial<Task>
) {
  try {
    console.log(`taskId: ${taskId} | updates: ${JSON.stringify(updates)}`);
    const response = await axios.put(`${API_BASE_URL}/task/${taskId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
}

// Função para excluir uma tarefa
export async function deleteTask(taskId: Task["taskId"]) {
  try {
    await axios.delete(`${API_BASE_URL}/task/${taskId}`);
    await loadTasks();
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    throw error;
  }
}

export async function moveTask(
  taskId: Task["taskId"],
  targetColumnId: Column["columnId"],
  targetTaskId?: Task["taskId"]
) {
  let currentTask!: Task;
  let currentTaskIndex!: number;

  // Encontrar a coluna que contém a tarefa a ser movida no STORE
  let column = STORE.value.find((column: Column) =>
    column.tasks.find((task, index) => {
      if (task.taskId === taskId) {
        currentTask = task;
        currentTaskIndex = index;
        return true;
      }
    })
  );

  if (!column) return;

  // Remove a tarefa da coluna original
  column.tasks.splice(currentTaskIndex, 1);

  // Encontrar a coluna de destino
  let targetColumn = STORE.value.find(
    (column: Column) => column.columnId === targetColumnId
  );

  if (!targetColumn) return;

  // Atualiza o status da tarefa com base na coluna de destino
  if (targetColumn.name === "Não Iniciado") {
    currentTask.status = "nao-iniciado";
  } else if (targetColumn.name === "Em Andamento") {
    currentTask.status = "em-andamento";
  } else if (targetColumn.name === "Concluído") {
    currentTask.status = "concluido";
  }

  // Se targetTaskId for fornecido, insere a tarefa antes da tarefa de destino
  if (targetTaskId) {
    let targetTaskIndex = targetColumn.tasks.findIndex(
      (task: Task) => task.taskId === targetTaskId
    );
    if (targetTaskIndex !== undefined && targetTaskIndex >= 0) {
      targetColumn.tasks.splice(targetTaskIndex, 0, currentTask);
    }
  } else {
    // Se targetTaskId não for fornecido, a tarefa é inserida ao final da coluna alvo
    targetColumn.tasks.push(currentTask);
  }

  // Agora, envia a tarefa movida para o servidor via PUT
  try {
    await axios.put(`${API_BASE_URL}/task/${taskId}`, currentTask); // Envia a tarefa atualizada para o banco
    console.log("Tarefa movida e atualizada com sucesso no banco de dados.");
  } catch (error) {
    console.error("Erro ao atualizar a tarefa no banco de dados:", error);
  }
}

export default {
  STORE,
  createColumn,
  updateColumn,
  deleteColumn,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  moveColumn,
};
