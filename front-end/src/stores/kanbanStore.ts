import type { Column, Task } from "@/types";
import { useLocalStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
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

export function createTaskToColumn(
  columnId: Column["columnId"],
  payload: Pick<Task, "name" | "description" | "status">
) {
  let column = STORE.value.find(
    (column: Column) => column.columnId === columnId
  );

  if (!column) return;

  // Adiciona a nova tarefa à lista de tarefas da coluna
  column.tasks.push({
    taskId: uuidv4(), // Cria um ID único para cada task
    name: payload.name,
    description: payload.description,
    status: payload.status,
  });
}

export function updateTask(columnId: Column["columnId"], task: Task) {
  let column = STORE.value.find(
    (column: Column) => column.columnId === columnId
  );

  if (!column) return;

  column.tasks = column.tasks.map((oldTask: Task) => {
    if (oldTask.taskId === task.taskId) {
      return {
        ...oldTask, // Mantém as propriedades antigas da tarefa
        ...task, // Substitui com as novas propriedades da tarefa
      };
    }

    return oldTask;
  });
}

export function deleteTask(
  columnId: Column["columnId"],
  taskId: Task["taskId"]
) {
  let column = STORE.value.find(
    (column: Column) => column.columnId === columnId
  );

  if (!column) return;

  column.tasks = column.tasks.filter((task: Task) => task.taskId !== taskId);
}

export function moveTask(
  taskId: Task["taskId"],
  targetColumnId: Column["columnId"],
  targetTaskId?: Task["taskId"]
) {
  let currentTask!: Task;
  let currentTaskIndex!: number;

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

  let targetColumn = STORE.value.find(
    (column: Column) => column.columnId === targetColumnId
  );

  // Atualiza o status da tarefa com base na coluna de destino
  console.log(targetColumn?.name);
  if (targetColumn?.name === "Não Iniciado") {
    currentTask.status = "nao-iniciado";
  } else if (targetColumn?.name === "Em Andamento") {
    currentTask.status = "em-andamento";
  } else if (targetColumn?.name === "Concluído") {
    currentTask.status = "concluido";
  }

  // Se targetTaskId for fornecido, insere a tarefa antes da tarefa de destino
  // senão a tarefa é inserida ao final da coluna alvo
  if (targetTaskId) {
    let targetTaskIndex = targetColumn?.tasks.findIndex((task: Task) => {
      task.taskId === targetTaskId;
    });

    targetColumn?.tasks.splice(targetTaskIndex!, 0, currentTask);
  } else {
    targetColumn?.tasks.push(currentTask);
  }
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

export default {
  STORE,
  createColumn,
  updateColumn,
  deleteColumn,
  createTaskToColumn,
  updateTask,
  deleteTask,
  moveTask,
  moveColumn,
};
