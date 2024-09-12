<script setup lang="ts">
import { inject, ref, readonly, computed } from "vue";
import { injectionKey } from "./vTabs.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const tabsProvider = inject(injectionKey, {
  withinTabs: false,
  registerTab: (title: string) => {},
  activeTab: readonly(ref()),
  activateTab: (title: string) => {},
});

if (!tabsProvider.withinTabs) {
  throw new Error("vTab must be used within a vTabs component");
}

tabsProvider.registerTab(props.title);

if (!tabsProvider.activeTab.value) {
  tabsProvider.activateTab(props.title);
}

const isActive = computed(() => tabsProvider.activeTab.value === props.title);
</script>
<template>
  <div class="tab-content" v-show="isActive" data-test="tab-content">
    <slot></slot>
  </div>
</template>
