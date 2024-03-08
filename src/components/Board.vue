<template>
  <div>
    <div>{{ lockedCards }}</div>
    <div class="board">
      <div>
        <Sortable
          tag="div"
          class="column"
          :list="board.columns"
          group="columns"
          item-key="columns.id"
          :options="{
            group: 'columns',
            animation: 250,
            bubbleScroll: true,
            direction: 'horizontal',
            disabled: false,
            dragClass: 'sortable-drag',
            dragoverBubble: false,
            easing: 'cubic-bezier(1, 0, 0, 1)',
            preventOnFilter: false,
            forceFallback: true,
            fallbackOnBody: false,
            ghostClass: 'sortable-drag-ghost',
            filter: '.input',
          }"
        >
          <template #item="{ element }">
            <div>
              <Column :column="element" :key="element.id"></Column>
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
import { storeToRefs } from "pinia";
import { Sortable } from "sortablejs-vue3";

const boardStore = useBoardStore();

const { board, lockedCards } = storeToRefs(boardStore);
</script>

<style scoped>
.board .column {
  display: flex;
}
.column {
  display: flex;
}
</style>
