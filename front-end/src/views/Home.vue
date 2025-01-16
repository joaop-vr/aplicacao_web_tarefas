<template>
  <div class="app-container">
    <div class="content">
      <p class="text-2xl font-semibold text-gray-800">
        Bem-vindo ao <span class="text-[#6B8E23]">Minhas Tarefas Space</span>,
        aqui você pode gerenciar suas tarefas da forma como desejar.
      </p>

      <p class="text-lg text-gray-600 mt-2">
        A aplicação permite que você
        <span class="font-bold">crie novas tarefas</span>,
        <span class="font-bold">visualize todas as suas tarefas</span>, ou até
        mesmo <span class="font-bold">acesse uma tarefa específica</span> para
        detalhes.
      </p>
      <p class="text-xl text-gray-600 mt-2">
        Você pode escolher entre a visualização por
        <span class="font-bold">Kanban</span> e por
        <span class="font-bold">Dashboard</span>. Explore!
      </p>

      <!-- Botões de navegação -->
      <div class="flex gap-4 mt-6">
        <router-link
          to="/kanban"
          class="px-6 py-2 bg-[#6B8E23] text-white font-medium rounded hover:bg-[#556B2F] focus:ring-2 focus:ring-[#6B8E23] focus:ring-opacity-50 transition-colors duration-300 cursor-pointer"
        >
          Visualizar Kanban
        </router-link>
        <router-link
          to="/dashboard"
          class="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300 cursor-pointer"
        >
          Visualizar Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #dcdcdc;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 8%;
  background-color: #dcdcdc;
}
</style>
