<template>
  <div>
    <div>{{ boardStore.lockedCards }}</div>
    <div class="board">
      <div>
        <Sortable tag="div" class="column" :list="boardStore.board.columns" group="columns" item-key="id">
          <template #item="{ element, index }">
            <div>
              <Column :id="element" :key="index"></Column>
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
</script>

<style scoped>
.board .column {
  display: flex;
}
.column {
  display: flex;
}
</style>
