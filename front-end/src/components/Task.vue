<template>
  <DropZone @drop-data="onTaskDrop">
    <Draggable
      class="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded p-2"
      :transfer-data="{
        taskId: task.taskId,
        type: TYPES.TASK,
      }"
    >
      <div>
        <div class="flex gap-2">
          <span class="font-bold"> {{ task.title }}</span>
          <div class="flex gap-1">
            <button class="text-sm font-bold" @click="toggleTaskModal()">
              &#9998;
            </button>
            <button class="text-sm font-bold" @click="toggleDeleteTaskModal()">
              &#88;
            </button>
          </div>
        </div>
        <div></div>
      </div>
      <p class="w-full mt-1 text-sm text-gray-400">{{ task.description }}</p>
      <p class="w-full mt-1 text-sm text-gray-400">{{ task.status }}</p>
    </Draggable>
  </DropZone>

  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`Editar Tarefa`"
    @close-modal="toggleTaskModal()"
  >
    <TaskForm
      :column-id="columnId"
      :task="task"
      :action="ACTIONS.UPDATE_TASK"
      @close-modal="toggleTaskModal()"
    />
  </Modal>

  <Modal
    :is-modal-active="isDeleteTaskModalActive"
    :heading="`Deletar Tarefa`"
    @close-modal="toggleDeleteTaskModal"
  >
    <div class="p-2">
      <span>Tem certeza que deseja deletar {{ task && task.title }}?</span>
      <div class="flex justify-around pt-3">
        <button @click="toggleDeleteTaskModal()">Não</button>
        <button @click="deleteTask">Sim</button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {
  TYPES,
  type Column,
  type Task,
  ACTIONS,
  type TRANSFER_DATA,
} from "@/types";
import Modal from "./common/Modal.vue";
import TaskForm from "./TaskForm.vue";
import { ref } from "vue";
import kanbanStore from "@/stores/kanbanStore";
import DropZone from "./common/DropZone.vue";
import Draggable from "./common/Draggable.vue";

const props = defineProps<{
  task: Task;
  columnId: Column["columnId"];
}>();

console.log("Valor de task recebido (Task.vue):", props.task);

const isTaskModalActive = ref(false);
const isDeleteTaskModalActive = ref(false);

function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value;
}

function toggleDeleteTaskModal() {
  isDeleteTaskModalActive.value = !isDeleteTaskModalActive.value;
}

function deleteTask() {
  kanbanStore.deleteTask(props.task.taskId);
  toggleDeleteTaskModal();
}

function onTaskDrop(transferData: TRANSFER_DATA) {
  if (transferData.type === TYPES.TASK && transferData.taskId) {
    kanbanStore.moveTask(
      transferData.taskId,
      props.columnId!,
      props.task.taskId
    );
  }
}
</script>
