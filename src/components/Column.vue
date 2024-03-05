<template>
  <template v-if="column !== undefined">
    <div class="column">
      <div v-for="cardId in column.cards" :key="cardId">
        <Card :id="cardId" @delete:card="onDeleteCard"></Card>
      </div>
      <button @click="createCard">+ Add Card</button>
    </div>
  </template>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import { useBoardStore } from "@/stores/BoardStore";
import { deleteCardRequestAction, createCardRequestAction } from "@/types/BoardStore/Actions";
import { defineProps } from "vue";
import { useUserStore } from "@/stores/UserStore";

const BoardStore = useBoardStore();
const userStore = useUserStore();

const props = defineProps<{ id: string }>();

const column = BoardStore.selectColumn(props.id);

const onDeleteCard = (cardId: string) => BoardStore.dispatch(deleteCardRequestAction({ columnId: props.id, cardId }));
const createCard = () =>
  BoardStore.dispatch(createCardRequestAction({ columnId: props.id, userId: userStore.currentUser.id }));
</script>

<style scoped>
.column {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
</style>
