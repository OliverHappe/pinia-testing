<template>
  <div>
    <div>{{ boardStore.lockedCards }}</div>
    <div class="board">
      <div v-for="columnId in boardStore.board.columns" :key="columnId">
        <Column :id="columnId"></Column>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Column from "@/components/Column.vue";
import { useBoardStore } from "@/stores/BoardStore";

const boardStore = useBoardStore();
</script>

<style scoped>
.board {
  display: flex;
}
</style>
