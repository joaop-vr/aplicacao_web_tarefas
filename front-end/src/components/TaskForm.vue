<template>
  <Form
    ref="taskForm"
    :validation-schema="validationSchema"
    @submit="onSubmit"
    class="flex flex-col gap-2"
  >
    <label for="name">Título</label>
    <Field
      id="name"
      type="text"
      name="name"
      class="p-2 border-2 rounded-sm border-gray-300"
    />
    <ErrorMessage name="name" class="text-red-700" />
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

onMounted(() => {
  if (props.action === ACTIONS.UPDATE_TASK) {
    taskForm.value.setFieldValue("name", props.task?.name);
    taskForm.value.setFieldValue("description", props.task?.description);
    taskForm.value.setFieldValue("status", props.task?.status);
  }
});

let validationSchema = toTypedSchema(taskFormSchema);

function onSubmit(values: any) {
  if (props.action === ACTIONS.ADD_TASK) {
    kanbanStore.createTaskToColumn(props.columnId, {
      name: values.name,
      description: values.description,
      status: values.status,
    });
  } else if (props.action === ACTIONS.UPDATE_TASK && props.task) {
    let updatedTask = {
      taskId: props.task.taskId,
      name: values.name,
      description: values.description,
      status: values.status,
    };

    kanbanStore.updateTask(props.columnId, updatedTask);
  }
  emit("close-modal");
}
</script>
