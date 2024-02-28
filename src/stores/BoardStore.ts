import {
  AnyAction,
  LockCardAction,
  UnlockCardAction,
  UpdateCardAction,
} from "@/types/BoardStore/Actions";
import { defineStore } from "pinia";
import { ComputedRef, computed, ref } from "vue";

interface Card {
  id: string;
  text: string;
}

interface Column {
  id: string;
  cards: Card["id"][];
}

interface Board {
  id: string;
  columns: Column["id"][];
}

export const useBoardStore = defineStore("BoardStore", () => {
  const board = ref<Board>({
    id: "board1",
    columns: ["column1", "column2"],
  });

  const columns = ref<Record<Column["id"], Column>>({
    column1: {
      id: "column1",
      cards: ["card1", "card2", "card3"],
    },
    column2: {
      id: "column2",
      cards: ["card4", "card5", "card6"],
    },
  });

  const cards = ref<Record<Card["id"], Card>>({
    card1: { id: "card1", text: "" },
    card2: { id: "card2", text: "MyContent" },
    card3: { id: "card3", text: "" },
    card4: { id: "card4", text: "" },
    card5: { id: "card5", text: "" },
    card6: { id: "card6", text: "MyContent" },
  });

  const lockedCards = ref<{ locks: Card["id"][] }>({ locks: [] });

  function dispatchAction(action: AnyAction) {
    console.log(action);
    switch (action.type) {
      // case "delete-card":
      //   throw new Error("Action not implemented: " + action.type);
      //   break;
      case "update-card":
        updateCard(action.payload);
        break;
      case "lock-card":
        lockCard(action.payload);
        break;
      case "unlock-card":
        unlockCard(action.payload);
        break;
    }
    // throw new Error("Action not implemented: " + action.type);
  }

  function lockCard(payload: LockCardAction["payload"]) {
    lockedCards.value.locks.push(payload.id);
  }

  function unlockCard(payload: UnlockCardAction["payload"]) {
    lockedCards.value.locks = lockedCards.value.locks.filter(
      (id) => id !== payload.id
    );
  }

  function updateCard(payload: UpdateCardAction["payload"]) {
    return;
  }

  function selectCard(cardId: Card["id"]): ComputedRef<Card | undefined> {
    return computed(() => cards.value[cardId]);
  }

  function selectColumn(
    columnId: Column["id"]
  ): ComputedRef<Column | undefined> {
    return computed(() => columns.value[columnId]);
  }

  return {
    dispatchAction,
    board: computed(() => board.value),
    columns: computed(() => columns.value),
    cards: computed(() => cards.value),
    lockedCards: computed(() => lockedCards.value),
    selectCard,
    selectColumn,
  };
});

/**
 * Next steps:
 *  - Factory for creating actions easily!
 *  - Effects against our api
 *  - moving cards!
 *  - extend locking mechanism to check against a user (we need a user store that holds our current user)
 */
