<template>
  <Form
    ref="columnForm"
    :validation-schema="validationSchema"
    @submit="onSubmit"
    class="flex flex-col gap-2"
  >
    <!-- Campo de entrada para o nome da coluna -->
    <label for="name">Nome</label>
    <Field
      id="name"
      type="text"
      name="name"
      class="p-2 border-2 rounded-sm border-gray-300"
    />
    <!-- Mensagem de erro, caso o campo não seja validado corretamente -->
    <ErrorMessage name="name" class="text-red-700" />
    <button type="submit">Concluir</button>
  </Form>
</template>
<script setup lang="ts">
import { columnFormSchema } from "@/schemas";
import kanbanStore from "@/stores/kanbanStore";
import { ACTIONS, type Column } from "@/types";
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { onMounted, ref } from "vue";

// Define o evento para fechar o modal
const emit = defineEmits<{
  (e: "close-modal"): void;
}>();

const props = defineProps<{
  column?: Column;
  action: ACTIONS;
}>();

const columnForm = ref();

onMounted(() => {
  if (props.action === ACTIONS.UPDATE_COLUMN) {
    columnForm.value.setFieldValue("name", props.column?.name);
  }
});

let validationSchema = toTypedSchema(columnFormSchema);

// Função chamada ao submeter o formulário
function onSubmit(values: any) {
  if (props.action === ACTIONS.ADD_COLUMN) {
    kanbanStore.createColumn(values.name);
  } else if (props.action === ACTIONS.UPDATE_COLUMN) {
    kanbanStore.updateColumn({
      columnId: props.column?.columnId!,
      name: values.name,
    });
  }
  emit("close-modal");
}
</script>
