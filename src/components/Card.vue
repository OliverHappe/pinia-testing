<template>
  <div v-if="card !== undefined" class="card">
    <div>
      {{ card.id }}
      {{ boardStore.selectCardLock(card.id) }}
    </div>

    <input
      v-model="card.text"
      @focus="lockCard(card.id)"
      @blur="unlockCard(card.id)"
      @change="updateCard"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/BoardStore";
import { useUserStore } from "@/stores/UserStore";
import { computed, defineProps } from "vue";

const boardStore = useBoardStore();
const userStore = useUserStore();

const props = defineProps<{ id: string }>();

const card = boardStore.selectCard(props.id);

const cardLock = boardStore.selectCardLock(props.id);

const isDisabled = computed(() => {
  const userId = cardLock.value;
  return userId !== undefined && userId !== userStore.currentUser.id;
});

const lockCard = (cardId: string) =>
  boardStore.dispatchAction({
    type: "lock-card",
    payload: { id: cardId, userId: userStore.currentUser.id },
  });
const unlockCard = (cardId: string) => boardStore.dispatchAction({ type: "unlock-card", payload: { id: cardId } });
const updateCard = () => {
  boardStore.dispatchAction({
    type: "update-card",
    payload: { id: props.id, text: card.value?.text ?? "" },
  });
};
</script>

<style scoped>
.card {
  border: 2px solid lightgrey;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
}
</style>
