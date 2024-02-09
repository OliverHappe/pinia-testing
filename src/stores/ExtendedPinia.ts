import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

interface ExtendedState {
  counter: number;
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

  return {
    counter,
    increment,
    $state,
    $reset,
  };
});
