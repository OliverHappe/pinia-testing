<template>
  <div v-if="card !== undefined" class="card" :class="{ draggable: !isDisabled }">
    <div class="card-header">
      {{ card.id }}
      {{ lockedFor }}
      <button v-if="!isDisabled" class="delete-button" @click="onDelete">X</button>
    </div>

    <textarea
      v-model="card.text"
      @focus="lockCard(card.id)"
      @blur="unlockCard(card.id)"
      @change="updateCard"
      :disabled="isDisabled"
    ></textarea>
    <slot></slot>
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
  const userId = cardLock.value?.id;
  return userId !== undefined && userId !== userStore.currentUser.id;
});

const lockedFor = computed(() => cardLock.value?.name ?? "");

const lockCard = (cardId: string) =>
  boardStore.dispatch(
    lockCardRequestAction({ id: cardId, userId: userStore.currentUser.id, userName: userStore.currentUser.name })
  );
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
.card:has(textarea:disabled) {
  background: lightgrey;
}
textarea {
  resize: none;
  height: 150px;
  border-color: lightgrey;
  border-radius: 0.25rem;

  &:disabled {
    background-color: #f3f3f3;
  }
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
