<script setup lang="ts">
import { provide, ref, readonly } from "vue";

const tabs = ref<string[]>([]);
const activeTab = ref<string>();

function activateTab(title: string) {
  activeTab.value = title;
}

function registerTab(title: string) {
  if (tabs.value.includes(title)) return;
  tabs.value.push(title);
}

provide(injectionKey, {
  withinTabs: true,
  registerTab,
  activateTab,
  activeTab: readonly(activeTab),
});
</script>
<script lang="ts">
import type { InjectionKey, Ref } from "vue";
export const injectionKey = Symbol("vTabs") as InjectionKey<{
  withinTabs: boolean;
  registerTab: (title: string) => void;
  activeTab: Readonly<Ref<string | undefined>>;
  activateTab: (title: string) => void;
}>;
</script>
<template>
  <div class="tabs">
    <div class="tab-trigger-wrapper">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab-trigger"
        :class="{
          active: activeTab === tab,
        }"
        @click="activateTab(tab)"
        data-test="tab-title"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
