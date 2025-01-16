<template>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="all" checked @change="filter" />
    <span class="whitespace-nowrap ml-1">Todos</span>
  </label>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="today" @change="filter" />
    <span class="whitespace-nowrap ml-1">Para Hoje</span>
  </label>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="past" @change="filter" />
    <span class="whitespace-nowrap ml-1">Atrasados</span>
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits(emitOptions: ['filter']);
const filter = (e) => {
    emit(event: "filter", e.target.value);
}
</script>
