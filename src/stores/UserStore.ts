import { User } from "@/types/UserStore/User";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref<User>({
    id: `user${Math.random()}`,
  });

  return {
    currentUser: computed(() => user.value),
  };
});
