import { User } from "@/types/UserStore/User";
import { defineStore } from "pinia";
import { ComputedRef, computed, ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref<User>({
    id: `user${Math.random()}`,
  });

  function selectCurrentUser(): ComputedRef<User> {
    return computed(() => user.value);
  }

  return {
    selectCurrentUser,
  };
});
