<template>
  <template v-if="column !== undefined">
    <div class="column">
      <div v-for="cardId in column.cards" :key="cardId">
        <Card :id="cardId" @delete:card="onDeleteCard"></Card>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import { useBoardStore } from "@/stores/BoardStore";
import { deleteCardRequestAction } from "@/types/BoardStore/Actions";
import { defineProps } from "vue";

const BoardStore = useBoardStore();

const props = defineProps<{ id: string }>();

const column = BoardStore.selectColumn(props.id);

const onDeleteCard = (cardId: string) => BoardStore.dispatch(deleteCardRequestAction({ columnId: props.id, cardId }));
</script>

<style scoped>
.column {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
</style>
