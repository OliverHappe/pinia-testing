<template>
  <div>Username: <input name="username" v-model="username" @change="onChange" /></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();

const username = ref("");
const onChange = () => userStore.setName(username.value);
</script>
