<template>
  <div>
    <UserName />
    <div class="board">
      <Sortable
        tag="div"
        class="column"
        item-key="id"
        :list="board.columns"
        :options="{
          group: 'columns',
          animation: 250,
          bubbleScroll: true,
          direction: 'horizontal',
          disabled: false,
          draggable: '.column',
          dragoverBubble: false,
          easing: 'cubic-bezier(1, 0, 0, 1)',
          preventOnFilter: false,
          forceFallback: true,
          fallbackOnBody: false,
          ghostClass: 'sortable-drag-ghost',
          filter: '.input, .card:not(.draggable)',
        }"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <Column :data-column-id="element.id" :column="element" :key="index"></Column>
        </template>
      </Sortable>
    </div>
  </div>
</template>

<script setup lang="ts">
import Column from "@/components/Column.vue";
import UserName from "@/components/UserName.vue";
import { useBoardStore } from "@/stores/BoardStore";
import { extractDataAttribute } from "@/utils/extractDataAttribute.util";
import { Sortable } from "sortablejs-vue3";
import { SortableEvent } from "sortablejs";
import { moveColumnRequestAction } from "@/types/BoardStore/Actions";
import { storeToRefs } from "pinia";

const boardStore = useBoardStore();

const { board, lockedCards } = storeToRefs(boardStore);

const onDragEnd = (event: SortableEvent) => {
  const { oldIndex, newIndex, item } = event;
  const columnId = extractDataAttribute(item, "columnId") as string;

  if (oldIndex === undefined || newIndex === undefined) return;
  boardStore.dispatch(moveColumnRequestAction({ oldIndex, newIndex, columnId }));
};
</script>

<style scoped>
.board .column {
  display: flex;
}
.column {
  display: flex;
}
</style>
