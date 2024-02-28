
```ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface ExtendedState {
  counter: number;
}

declare type AnyAction = MoveCardAction | DeleteCardAction;
interface BaseAction {
  type: string;
}

interface MoveCardAction extends BaseAction {
  type: "move-card";
  payload: { cardId: string; to: string };
}

interface DeleteCardAction extends BaseAction {
  type: "delete-card";
  payload: { cardId: string };
}

export const useExtendedStore = defineStore("extended", () => {
  const initialState: ExtendedState = { counter: 0 };

  const $state = ref(initialState);

  const counter = computed(() => $state.value.counter);

  function increment() {
    $state.value.counter++;
  }

  const $reset = () => {
    $state.value.counter = 0;
  };

  function dispatchAction(action: AnyAction) {
    switch (action.type) {
      case "move-card":
        action.payload.to;
       return moveCard(state, payload)
        
      case "delete-card":
        action.payload.cardId;
        break;
    }
  }

  moveCard()

  [
    {
      type: "move-card",
      payload: { cardId: "card1", to: "string" },
    },
    {
      type: "move-card",
      payload: { cardId: "card2", to: "string" },
    },
  ];


  BoardStore.dispatchAction({type: 'move-card', payload: {}})



  BoardStore.dispatchAction(createAction('move-card', {cardId: 'card3', to: 'saf'}))

  Response.forEach(a => dispatchAction(a))

  return {
    counter,
    increment,
    $state,
    $reset,
  };
});
```