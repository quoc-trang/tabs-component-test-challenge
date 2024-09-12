import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import vTabs, { injectionKey } from "../src/components/vTabs.vue";
import vTabPanel from "../src/components/vTabPanel.vue";
import { provide, readonly, ref, type InjectionKey, type Ref } from "vue";

const wrapperConfig = [
  {
    components: {
      vTabs,
      vTabPanel,
    },
    template: `<div><vTabs>
        <vTabPanel title="Vue.js">
          <p>
            An approachable, performant and versatile framework for building web
            user interfaces.
          </p>
        </vTabPanel>
        <vTabPanel title="React">
          <p>The library for web and native user interfaces</p>
        </vTabPanel>
        <vTabPanel title="Svelte">
          <p>Cybernetically enhanced web apps</p>
        </vTabPanel>
      </vTabs></div>`,
  },

  {
    attachTo: document.body,
  },
];

describe("the use of vTabsPanel with vTabs", () => {
  it("renders the tab titles", async () => {
    const wrapper = mount(wrapperConfig[0], wrapperConfig[1]);

    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll(`[data-test="tab-title"]`);

    expect(buttons.length).toBe(3);
    expect(buttons.at(0)?.text()).toBe("Vue.js");
  });

  it("renders the tab panel content", async () => {
    const wrapper = mount(wrapperConfig[0], wrapperConfig[1]);

    await wrapper.vm.$nextTick();

    const tabContent = wrapper.findAll('[data-test="tab-content"]');

    expect(tabContent.length).toBe(3);
    expect(tabContent.at(0)?.text()).toContain(
      `An approachable, performant and versatile framework for building web user interfaces.`,
    );
  });

  it("only shows the content for the active panel", async () => {
    const wrapper = mount(wrapperConfig[0], wrapperConfig[1]);

    await wrapper.vm.$nextTick();
    const firstPanel = wrapper.find('[data-test="tab-content"]:nth-child(1)');
    const secondPanel = wrapper.find('[data-test="tab-content"]:nth-child(2)');

    expect(firstPanel.isVisible()).toBe(true);
    expect(secondPanel.isVisible()).toBe(false);
  });

  it("switches the content based on the tab clicked", async () => {
    const wrapper = mount(wrapperConfig[0], wrapperConfig[1]);

    await wrapper.vm.$nextTick();
    const secondButton = wrapper.find('[data-test="tab-title"]:nth-child(2)');
    const firstPanel = wrapper.find('[data-test="tab-content"]:nth-child(1)');
    const secondPanel = wrapper.find('[data-test="tab-content"]:nth-child(2)');

    expect(firstPanel.isVisible()).toBe(true);
    await secondButton.trigger("click");
    expect(firstPanel.isVisible()).toBe(false);
    expect(secondPanel.isVisible()).toBe(true);
  });
});
