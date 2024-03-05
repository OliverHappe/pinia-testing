<template>
  <div v-if="card !== undefined" class="card">
    <div class="card-header">
      {{ card.id }}
      {{ boardStore.selectCardLock(card.id) }}
      <button v-if="!isDisabled" class="delete-button" @click="onDelete">X</button>
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
import { lockCardRequestAction, unlockCardRequestAction, updateCardRequestAction } from "@/types/BoardStore/Actions";
import { computed, defineProps, defineEmits } from "vue";

const emit = defineEmits(["delete:card"]);

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
  boardStore.dispatch(lockCardRequestAction({ id: cardId, userId: userStore.currentUser.id }));
const unlockCard = (cardId: string) => boardStore.dispatch(unlockCardRequestAction({ id: cardId }));
const updateCard = () => boardStore.dispatch(updateCardRequestAction({ id: props.id, text: card.value?.text ?? "" }));
const onDelete = () => {
  if (isDisabled.value) return;
  emit("delete:card", props.id);
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
.card:has(input:disabled) {
  background: lightgrey;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.delete-card {
  align-self: flex-end;
}
</style>
