<template>
  <template v-if="column !== undefined">
    <div class="column" :id="column.id">
      <div style="margin-top: 2rem">{{ column.id }}</div>
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
          fallbackOnBody: false,
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
        :data-column-id="column.id"
      >
        <template #item="{ element }">
          <Card
            :data-card-id="element.id"
            :id="element.id"
            :key="element.id"
            @delete:card="onDeleteCard"
            class="draggable"
          ></Card>
        </template>
      </Sortable>
      <button class="add-button" @click="createCard">+ Add Card</button>
    </div>
  </template>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import { useBoardStore } from "@/stores/BoardStore";
import {
  deleteCardRequestAction,
  lockCardRequestAction,
  unlockCardRequestAction,
  createCardRequestAction,
  moveCardRequestAction,
} from "@/types/BoardStore/Actions";
import { defineProps } from "vue";
import { Sortable } from "sortablejs-vue3";
import { SortableEvent } from "sortablejs";
import { extractDataAttribute } from "../utils/extractDataAttribute.util";
import { useUserStore } from "@/stores/UserStore";

const BoardStore = useBoardStore();
const userStore = useUserStore();

const props = defineProps<{ column: { id: string; cards: any[] } }>();

const onDeleteCard = (cardId: string) =>
  BoardStore.dispatch(deleteCardRequestAction({ columnId: props.column.id, cardId }));

const onDragStart = (event: SortableEvent) => {
  const cardId = extractDataAttribute(event.item, "cardId") as string;
  BoardStore.dispatch(lockCardRequestAction({ id: cardId, userId: userStore.currentUser.id }));
};

const onDragEnd = async (event: SortableEvent) => {
  const { oldIndex, newIndex, to, from } = event;

  if (oldIndex === undefined || newIndex === undefined) return;

  const toColumnId = extractDataAttribute(to, "columnId") as string;
  const fromColumnId = extractDataAttribute(from, "columnId") as string;
  const cardId = extractDataAttribute(event.item, "cardId") as string;
  BoardStore.dispatch(moveCardRequestAction({ oldIndex, newIndex, from: fromColumnId, to: toColumnId, cardId }));

  BoardStore.dispatch(unlockCardRequestAction({ id: cardId }));
};
const createCard = () =>
  BoardStore.dispatch(createCardRequestAction({ columnId: props.column.id, userId: userStore.currentUser.id }));
</script>

<style scoped>
.column {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
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
.add-button {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid lightgrey;
  border-radius: 0.25rem;
  background-color: rgba(211, 211, 211, 0.969);
  cursor: pointer;
}
</style>
