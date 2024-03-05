<template>
  <template v-if="column !== undefined">
    <div class="column" :id="id">
      <div style="margin-top: 2rem">{{ id }}</div>
      <Sortable
        :options="{
          group: 'cards',
          animation: 250,
          bubbleScroll: true,
          direction: 'vertical',
          disabled: false,
          dragClass: 'sortable-drag',
          dragoverBubble: false,
          easing: 'cubic-bezier(1, 0, 0, 1)',
          preventOnFilter: false,
          forceFallback: true,
          ghostClass: 'sortable-drag-ghost',
          filter: '.input',
        }"
        tag="div"
        class="sortable-column"
        :list="column.cards"
        group="cards"
        @start="onDragStart"
        @end="onDragEnd"
        item-key="cardId"
        :data-column-id="id"
      >
        <template #item="{ element, index }">
          <Card :data-card-id="element" :id="element" :key="index" @delete:card="onDeleteCard" class="draggable"></Card>
        </template>
      </Sortable>
    </div>
  </template>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import { useBoardStore } from "@/stores/BoardStore";
import {
  DeleteCardRequestAction,
  LockCardRequestAction,
  MoveCardRequestAction,
  UnlockCardRequestAction,
} from "@/types/BoardStore/Actions";
import { defineProps, nextTick } from "vue";
import { Sortable } from "sortablejs-vue3";
import { SortableEvent } from "sortablejs";
import { extractDataAttribute } from "../utils/extractDataAttribute.util";
import { useUserStore } from "@/stores/UserStore";

const BoardStore = useBoardStore();
const userStore = useUserStore();

const props = defineProps<{ id: string }>();

const column = BoardStore.selectColumn(props.id);

const onDeleteCard = (cardId: string) => BoardStore.dispatch(DeleteCardRequestAction({ columnId: props.id, cardId }));

const onDragStart = (event: SortableEvent) => {
  const cardId = extractDataAttribute(event.item, "cardId") as string;
  BoardStore.dispatch(LockCardRequestAction({ id: cardId, userId: userStore.currentUser.id }));
};

const onDragEnd = async (event: SortableEvent) => {
  console.log("drag end", event);
  const { oldIndex, newIndex, to, from } = event;

  console.log({ oldIndex, newIndex, to, from });
  if (oldIndex === undefined || newIndex === undefined) return;

  const toColumnId = extractDataAttribute(to, "columnId") as string;
  const fromColumnId = extractDataAttribute(from, "columnId") as string;
  const cardId = extractDataAttribute(event.item, "cardId") as string;

  BoardStore.dispatch(MoveCardRequestAction({ oldIndex, newIndex, from: fromColumnId, to: toColumnId, cardId }));

  BoardStore.dispatch(UnlockCardRequestAction({ id: cardId }));
  console.log({ toColumnId, fromColumnId, cardId });

  console.log(oldIndex, newIndex);
  await nextTick();
};
</script>

<style scoped>
.column {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
.sortable-column {
  border: 2px solid lightgrey;
  border-radius: 0.25rem;
  padding: 0.75rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
}
.sortable-drag-ghost {
  opacity: 0.6;
  background-color: #bbb;
  width: 346px;
}
</style>
