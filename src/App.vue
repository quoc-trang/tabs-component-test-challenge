<script setup lang="ts">
import VTabs from "./components/vTabs.vue";
import VTabPanel from "./components/vTabPanel.vue";
</script>

<template>
  <div class="page">
    <div class="h-56">
      <VTabs>
        <VTabPanel title="Vue.js">
          <p>
            An approachable, performant and versatile framework for building web
            user interfaces.
          </p>
        </VTabPanel>
        <VTabPanel title="React">
          <p>The library for web and native user interfaces</p>
        </VTabPanel>
        <VTabPanel title="Svelte">
          <p>Cybernetically enhanced web apps</p>
        </VTabPanel>
      </VTabs>
    </div>
  </div>
</template>
