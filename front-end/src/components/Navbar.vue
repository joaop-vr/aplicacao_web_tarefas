<template>
  <div>
    <div class="flex justify-center px-2 mt-10 mb-3 text-white">
      <h1 class="font-bold text-7xl">Minhas Tarefas</h1>
    </div>
    <button
      class="font-bold"
      @click="isColumnModalActive = !isColumnModalActive"
    >
      Adicionar Coluna
    </button>
  </div>
  <Modal
    :is-modal-active="isColumnModalActive"
    :heading="`Adicionar Coluna`"
    @close-modal="isColumnModalActive = !isColumnModalActive"
  >
    <ColumnForm
      :action="ACTIONS.ADD_COLUMN"
      @close-modal="isColumnModalActive = !isColumnModalActive"
    />
  </Modal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ColumnForm from "./ColumnForm.vue";
import Modal from "./common/Modal.vue";
import { ACTIONS } from "@/types";

const isColumnModalActive = ref(false);
</script>
