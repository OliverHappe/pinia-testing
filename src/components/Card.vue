<template>
  <div v-if="card !== undefined" class="card">
    {{ card.text }}
    <input
      v-model="card.text"
      @focus="lockCard(card.id)"
      @blur="unlockCard(card.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/BoardStore";
import { defineProps } from "vue";

const BoardStore = useBoardStore();

const props = defineProps<{ id: string }>();

const card = BoardStore.selectCard(props.id);

const lockCard = (cardId: string) =>
  BoardStore.dispatchAction({ type: "lock-card", payload: { id: cardId } });
const unlockCard = (cardId: string) =>
  BoardStore.dispatchAction({ type: "unlock-card", payload: { id: cardId } });
</script>

<style scoped>
.card {
  border: 2px solid lightgrey;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  min-height: 150px;
}
</style>
