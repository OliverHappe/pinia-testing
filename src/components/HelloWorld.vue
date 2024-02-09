<template>
  <div class="hello">
    Store to Ref: {{ counterToRef }} <br />
    Assignment Binding: {{ counterBinding }} <br />
    <!--Best!-->
    Direct store in template: {{ MyStore.counter }} <br />

    <button @click="onStoreIncrement">Increment call</button> <br />
    <button @click="onValueAssignment">Outside value assignment</button> <br />
  </div>
</template>

<script lang="ts" setup>
import { useExtendedStore } from "@/stores/ExtendedPinia";
import { storeToRefs } from "pinia";

const MyStore = useExtendedStore();
const { counter: counterToRef, $state } = storeToRefs(MyStore);

const counterBinding = MyStore.counter; // ⚡ does not work :/

// BasicStore.counter = 0;

const onStoreIncrement = () => MyStore.increment();
const onValueAssignment = () => $state.value.counter++;
</script>
