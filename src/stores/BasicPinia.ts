import { defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

export const useBasicStore = defineStore("basic", () => {
  const counter = ref<number>(0);

  // const increment = () => {
  //   counter.value++;
  // };

  function increment() {
    counter.value++;
  }

  const $reset = () => {
    counter.value = 0;
  };

  return {
    counter: computed(() => counter.value),
    // counter,
    increment,
    $reset,
  };
});
