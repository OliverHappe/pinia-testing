import { useBoardApi } from "@/stores/BoardApi";
import { PermittedStoreActions, handle, on, Action } from "@/types/ActionFactory";
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
  cards: Card[];
}

interface Board {
  id: string;
  columns: Column[];
}

export const useBoardStore = defineStore("BoardStore", () => {
  const { emitOnSocket } = useBoardApi(dispatch);

  const columns = ref<Record<Column["id"], Column>>({
    column1: {
      id: "column1",
      cards: [
        { id: "card1", text: "" },
        { id: "card2", text: "MyContent" },
        { id: "card3", text: "" },
      ],
    },
    column2: {
      id: "column2",
      cards: [
        { id: "card4", text: "" },
        { id: "card5", text: "" },
        { id: "card6", text: "MyContent" },
      ],
    },
  });

  const board = ref<Board>({
    id: "board1",
    columns: [
      {
        id: "column1",
        cards: [
          { id: "card1", text: "" },
          { id: "card2", text: "MyContent" },
          { id: "card3", text: "" },
        ],
      },
      {
        id: "column2",
        cards: [
          { id: "card4", text: "" },
          { id: "card5", text: "" },
          { id: "card6", text: "MyContent" },
        ],
      },
    ],
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
      on(BoardActions.createCardFailureAction, handleFailure),
      on(BoardActions.createCardRequestAction, emitOnSocket),
      on(BoardActions.createCardSuccessAction, createCard),
      on(BoardActions.deleteCardFailureAction, handleFailure),
      on(BoardActions.deleteCardRequestAction, emitOnSocket),
      on(BoardActions.deleteCardSuccessAction, deleteCard),
      on(BoardActions.lockCardFailureAction, handleFailure),
      on(BoardActions.lockCardRequestAction, emitOnSocket),
      on(BoardActions.lockCardSuccessAction, lockCard),
      on(BoardActions.moveCardFailureAction, handleFailure),
      on(BoardActions.moveCardRequestAction, emitOnSocket),
      on(BoardActions.moveCardSuccessAction, moveCard),
      on(BoardActions.unlockCardFailureAction, handleFailure),
      on(BoardActions.unlockCardRequestAction, emitOnSocket),
      on(BoardActions.unlockCardSuccessAction, unlockCard),
      on(BoardActions.updateCardFailureAction, handleFailure),
      on(BoardActions.updateCardRequestAction, emitOnSocket),
      on(BoardActions.updateCardSuccessAction, updateCard),
      on(BoardActions.updateCardFailureAction, handleFailure),
      on(BoardActions.moveColumnRequestAction, emitOnSocket),
      on(BoardActions.moveColumnSuccessAction, moveColumn),
      on(BoardActions.moveCardFailureAction, handleFailure)
    );
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

    const cardIndex = board.value.columns[getColumnIndex(columnId)].cards.findIndex((card) => card.id === cardId);

    columns.value[columnId].cards.splice(cardIndex, 1);
    delete cards.value[cardId];
  }

  function createCard(action: ReturnType<typeof BoardActions.createCardSuccessAction>): void {
    const { cardId, columnId, text } = action.payload;
    console.log(`creating the card: ${cardId} in column: ${columnId}`);

    board.value.columns[getColumnIndex(columnId)].cards.push({ id: cardId, text });
    cards.value[cardId] = { id: cardId, text };
  }

  function moveCard(action: ReturnType<typeof BoardActions.moveCardSuccessAction>): void {
    const { newIndex, oldIndex, from, to, cardId } = action.payload;
    const card = getCard(getColumnIndex(from), cardId);
    if (!card) return;

    board.value.columns[getColumnIndex(from)].cards.splice(oldIndex, 1);
    board.value.columns[getColumnIndex(to)].cards.splice(newIndex, 0, card);

    console.log(`${cardId} is moved from column: ${from} to column: ${to}`);
  }

  function moveColumn(action: ReturnType<typeof BoardActions.moveColumnSuccessAction>): void {
    const { newIndex, oldIndex, columnId } = action.payload;
    const column = board.value.columns.find((column) => column.id === columnId);
    if (!column) return;

    board.value.columns.splice(oldIndex, 1);
    board.value.columns.splice(newIndex, 0, ...[column]);
  }

  const getColumnIndex = (columnId: Column["id"]) => {
    return board.value.columns.findIndex((column) => column.id === columnId);
  };

  const getCard = (columnIndex: number, cardId: Card["id"]) => {
    return board.value.columns[columnIndex].cards.find((card) => card.id === cardId);
  };

  function handleFailure(action: Action) {
    throw new Error(action.type + " " + JSON.stringify(action.payload));
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
