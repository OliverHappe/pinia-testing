<template>
  <div>
    <div>{{ lockedCards }}</div>
    <div class="board">
      <div>
        <Sortable tag="div" class="column" :list="board.columns" group="columns" item-key="id">
          <template #item="{ element }">
            <div>
              <Column :id="element" :cards="columns[element].cards" :key="element"></Column>
            </div>
          </template>
        </Sortable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Column from "@/components/Column.vue";
import { useBoardStore } from "@/stores/BoardStore";
import { Sortable } from "sortablejs-vue3";

const boardStore = useBoardStore();

const { board, lockedCards, columns } = boardStore;
</script>

<style scoped>
.board .column {
  display: flex;
}
.column {
  display: flex;
}
</style>
