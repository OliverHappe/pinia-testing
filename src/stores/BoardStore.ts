import { PayloadOf } from "@/types/ActionFactory";
import { AnyBoardAction, LockCardAction, UnlockCardAction, UpdateCardAction } from "@/types/BoardStore/Actions";
import { User } from "@/types/UserStore/User";
import { defineStore } from "pinia";
import { ComputedRef, computed, ref } from "vue";
import { io } from "socket.io-client";

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
  const socket = io("http://localhost:3000");
  // listen for new messages
  socket.on("connect", function () {
    console.log("connected");
  });
  socket.onAny((event, ...args) => {
    if (["update-card", "lock-card", "unlock-card"].includes(event)) {
      console.log(event, args);
      dispatchAction({ type: event, payload: args[0] }, false);
    }
  });

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

  const lockedCards = ref<Record<Card["id"], User["id"]>>({ card2: "user23" });

  function dispatchAction(action: AnyBoardAction, emit = true) {
    console.log("dispatchAction", action, emit);

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

    if (emit === true) {
      socket.emit(action.type, action.payload);
    }
    // throw new Error("Action not implemented: " + action.type);
  }

  function lockCard(payload: PayloadOf<typeof LockCardAction>) {
    // frontend only action
    lockedCards.value[payload.id] = payload["userId"];
  }

  function unlockCard(payload: PayloadOf<typeof UnlockCardAction>) {
    // @/server/v3/api9
    // coming from the api-client
    delete lockedCards.value[payload.id];
  }

  function updateCard(payload: PayloadOf<typeof UpdateCardAction>) {
    console.log("updating the card");
    cards.value[payload.id] = payload;
  }

  function selectCardLock(cardId: Card["id"]): ComputedRef<User["id"] | undefined> {
    return computed(() => lockedCards.value[cardId]);
  }

  function selectCard(cardId: Card["id"]): ComputedRef<Card | undefined> {
    return computed(() => cards.value[cardId]);
  }

  function selectColumn(columnId: Column["id"]): ComputedRef<Column | undefined> {
    return computed(() => columns.value[columnId]);
  }

  return {
    dispatchAction,
    board: computed(() => board.value),
    columns: computed(() => columns.value),
    cards: computed(() => cards.value),
    lockedCards: computed(() => lockedCards.value),
    selectCardLock,
    selectCard,
    selectColumn,
  };
});

/**
 * Next steps:
 *  - [x] implement updateCard
 *  - [x] extend locking mechanism to check against a user (we need a user store that holds our current user)
 *    - [x] implement isCardLocked selector
 *    - [x] implement faked UserStore
 *    - [x] refactor lockedCards to know the user that has the lock
 *    - [x] visualize card being locked for somebody else
 *    - [x] ensure to be able to edit a card that is locked for the current user
 *  - Factory for creating actions easily!
 *  - Effects against our api
 *  - moving cards!
 *
 * - maybe the whole store should not interact with the server-(REST)-api at all ?!
 *   - the backend just takes and broadcasts any action that was processed on a client
 *   - and effects could be implemented in the backend
 * - the majority of actions could be untyped... only the ones that need an effect-implementation need to have a defined type
 * -
 */
