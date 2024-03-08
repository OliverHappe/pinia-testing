import { User } from "@/types/UserStore/User";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref<User>({
    id: `user${Math.random()}`,
    name: `name${Math.random()}`,
  });

  const setName = (name: string) => {
    user.value.name = name;
  };

  return {
    currentUser: computed(() => user.value),
    setName,
  };
});
