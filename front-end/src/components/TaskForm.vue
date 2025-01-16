<template>
  <Form
    ref="taskForm"
    :validation-schema="validationSchema"
    @submit="onSubmit"
    class="flex flex-col gap-2"
  >
    <label for="title">Título</label>
    <Field
      id="title"
      type="text"
      name="title"
      class="p-2 border-2 rounded-sm border-gray-300"
    />
    <ErrorMessage name="title" class="text-red-700" />

    <label for="description">Descrição</label>
    <Field
      id="description"
      type="text"
      name="description"
      class="p-2 border-2 rounded-sm border-gray-300"
    />
    <ErrorMessage name="description" class="text-red-700" />

    <label for="status">Status</label>
    <Field
      as="select"
      id="status"
      name="status"
      class="p-2 border-2 rounded-sm border-gray-300"
    >
      <option value="nao-iniciado">Não Iniciado</option>
      <option value="em-andamento">Em andamento</option>
      <option value="concluido">Concluído</option>
    </Field>
    <ErrorMessage name="status" class="text-red-700" />

    <button type="submit" class="mt-3">Concluir</button>
  </Form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";

import { taskFormSchema } from "@/schemas";
import kanbanStore from "@/stores/kanbanStore";
import { ACTIONS, type Column, type Task } from "@/types";

const emit = defineEmits<{
  (e: "close-modal"): void;
}>();

const props = defineProps<{
  columnId: Column["columnId"];
  task?: Task;
  action: ACTIONS;
}>();

const taskForm = ref();
console.log("Valor de task recebido (Task.vue):", props.task);

onMounted(() => {
  if (props.action === ACTIONS.UPDATE_TASK) {
    taskForm.value.setFieldValue("title", props.task?.title); //<!-- Alterado de name para title -->
    taskForm.value.setFieldValue("description", props.task?.description);
    taskForm.value.setFieldValue("status", props.task?.status);
  }
});

let validationSchema = toTypedSchema(taskFormSchema);

async function onSubmit(values: any) {
  try {
    if (props.action === ACTIONS.ADD_TASK) {
      // Criar uma nova tarefa usando o kanbanStore.createTask
      const newTask = await kanbanStore.createTask({
        title: values.title,
        description: values.description,
        status: values.status,
      });
      // Passar a nova tarefa para a coluna correta
      kanbanStore.moveTask(newTask.taskId, values.status);
    } else if (props.action === ACTIONS.UPDATE_TASK && props.task) {
      // Passando o taskId diretamente da props
      const updatedTask = await kanbanStore.updateTask(props.task.taskId, {
        title: values.title, // Valores do formulário
        description: values.description,
        status: values.status,
      });
    }
    emit("close-modal"); // Fechar o modal após a ação ser completada
  } catch (error) {
    console.error("Erro ao enviar tarefa:", error);
  }
}
</script>
