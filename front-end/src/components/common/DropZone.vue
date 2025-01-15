<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { TRANSFER_DATA } from "@/types";

// Define o evento "dropData" acionado quando uma Task é solta em uma coluna
const emit = defineEmits<{
  (e: "dropData", payload: TRANSFER_DATA): void;
}>();

// Função chamada quando ocorre o "drop" de dados,
// verificando e convertendo os dados do evento para um objeto
function onDrop(e: DragEvent) {
  if (e.dataTransfer) {
    let payload = JSON.parse(e.dataTransfer.getData("payload"));
    emit("dropData", payload);
  }
}
</script>
