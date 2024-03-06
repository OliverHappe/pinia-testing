import { useBoardApi } from "@/stores/BoardApi";
import { PermittedStoreActions, handle, on } from "@/types/ActionFactory";
import * as BoardActions from "@/types/BoardStore/Actions";

import { User } from "@/types/UserStore/User";
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
  const { emitOnSocket } = useBoardApi(dispatch);

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
  //
  function dispatch(action: PermittedStoreActions<typeof BoardActions>) {
    console.log("dispatchAction", action);

    handle(
      action,
      on(BoardActions.lockCardRequestAction, (a) => console.log(a)),
      on(BoardActions.lockCardSuccessAction, (a) => console.log(a)),
      on(BoardActions.lockCardFailureAction, (a) => console.log(a))
    );

    switch (action.type) {
      case "lock-card-request":
      case "unlock-card-request":
      case "update-card-request":
      case "delete-card-request":
      case "create-card-request":
      case "move-card-request":
        emitOnSocket(action);
        break;

      case "update-card-success":
        updateCard(action);
        break;
      case "lock-card-success":
        lockCard(action);
        break;
      case "unlock-card-success":
        unlockCard(action);
        break;
      case "delete-card-success":
        deleteCard(action);
        break;
      case "move-card-success":
        moveCard(action);
        break;
      case "create-card-success":
        createCard(action);
        break;

      case "lock-card-failure":
      case "unlock-card-failure":
      case "update-card-failure":
      case "delete-card-failure":
      case "create-card-failure":
        throw new Error(action.type + " " + JSON.stringify(action.payload));
    }
  }

  function lockCard(action: ReturnType<typeof BoardActions.lockCardSuccessAction>) {
    // frontend only action
    lockedCards.value[action.payload.id] = action.payload.userId;
  }

  function unlockCard(action: ReturnType<typeof BoardActions.unlockCardSuccessAction>) {
    // @/server/v3/api9
    // coming from the api-client
    delete lockedCards.value[action.payload.id];
  }

  function updateCard(action: ReturnType<typeof BoardActions.updateCardSuccessAction>) {
    console.log("updating the card");
    cards.value[action.payload.id] = action.payload;
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

  function deleteCard(action: ReturnType<typeof BoardActions.deleteCardSuccessAction>): void {
    const { cardId, columnId } = action.payload;
    console.log(`deleting the card: ${cardId} from column: ${columnId}`);

    const cardIndex = columns.value[columnId].cards.findIndex((id) => id === cardId);

    columns.value[columnId].cards.splice(cardIndex, 1);
    delete cards.value[cardId];
  }

  function createCard(action: ReturnType<typeof BoardActions.createCardSuccessAction>): void {
    const { cardId, columnId, text } = action.payload;
    console.log(`creating the card: ${cardId} in column: ${columnId}`);

    columns.value[columnId].cards.push(cardId);
    cards.value[cardId] = { id: cardId, text };
  }

  function moveCard(action: ReturnType<typeof BoardActions.moveCardSuccessAction>): void {
    const { newIndex, oldIndex, from, to } = action.payload;
    const newColumns = JSON.parse(JSON.stringify(columns.value));
    const cardId = newColumns[from].cards.splice(oldIndex, 1)[0];
    newColumns[to].cards.splice(newIndex, 0, cardId);
    columns.value = newColumns;
  }

  return {
    dispatch,
    board,
    columns,
    cards,
    lockedCards,
    moveCard,
    selectCardLock,
    selectCard,
    selectColumn,
  };
});
