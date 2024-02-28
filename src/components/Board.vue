<template>
  <div class="board">
    {{ BoardStore.lockedCards }}<br />
    <div v-for="columnId in BoardStore.board.columns" :key="columnId">
      <Column :id="columnId"></Column>
    </div>
  </div>
</template>

<script setup lang="ts">
import Column from "@/components/Column.vue";
import { useBoardStore } from "@/stores/BoardStore";

const BoardStore = useBoardStore();
</script>

<style scoped>
.board {
  display: flex;
}
</style>
