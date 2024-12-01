<template>
  <div
    :class="isSideNavigationToggled ? 'my-6 mx-2' : 'sm:auto my-6 mx-2 sm:m-6'"
    class="poke-transition fixed"
  >
    <div
      class="w-[180px] mr-4 cursor-pointer mb-2 poke-transition"
      :class="isSideNavigationToggled ? 'hidden' : 'hidden sm:block'"
    >
      <div class="flex text-primary-700 gap-2 items-center">
        <router-link to="/pokemon">
          <Header headingLevel="h2" text="Pokedex" />
        </router-link>

        <div class="ml-auto" @click="toggleSideNavigation">
          <Icon iconName="TogglerMenu" />
        </div>
      </div>
    </div>
    <div
      v-if="isSideNavigationToggled"
      @click="openSideNavigation"
      class="sm:block hidden rotate-180 px-4 mb-4 cursor-pointer items-center justify-center"
    >
      <Icon iconName="TogglerMenu" />
    </div>
    <div>
      <div
        class="text-primary-500 font-normal text-sm py-4 w-auto poke-transition"
        :class="isSideNavigationToggled ? 'hidden' : 'hidden sm:block'"
      >
        MAIN MENU
      </div>
      <ul class="mt-1">
        <li
          v-for="menuItem in menuItems"
          :key="menuItem.id"
          :class="[
            isSideNavigationToggled
              ? 'flex items-center justify-center'
              : 'sm:justify-start flex items-center justify-center',
            route.path === menuItem.route ? 'bg-primary-100 text-primary-500' : 'text-gray-4',
          ]"
          class="relative group hover:bg-primary-100 cursor-pointer px-4 h-12 active rounded-md mb-1 poke-transition"
          @mouseover="setHoveredItem(menuItem, true)"
          @mouseout="setHoveredItem(menuItem, false)"
        >
          <router-link
            :to="menuItem.route"
            :class="
              isSideNavigationToggled
                ? 'flex items-center justify-center'
                : 'sm:justify-start flex items-center justify-center'
            "
            class="poke-transition"
          >
            <Icon
              :iconName="menuItem.icon"
              :svgFill="
                route.path === menuItem.route || svgFillIcon(menuItem)
                  ? 'stroke-primary-700'
                  : 'stroke-primary-500'
              "
            />
            <span
              :class="[
                isSideNavigationToggled ? 'hidden' : 'hidden sm:block',
                route.path === menuItem.route || svgFillIcon(menuItem)
                  ? 'text-primary-700'
                  : 'text-primary-500',
              ]"
              class="ml-3 font-semibold tracking-wide text-base poke-transition"
            >
              {{ menuItem.label }}
            </span>
          </router-link>
          <div
            v-if="isSideNavigationToggled"
            class="absolute bottom-0 top-4 left-12 items-center hidden mb-5 group-hover:flex"
          >
            <span
              class="relative rounded-md z-10 p-4 text-sm leading-none text-white whitespace-no-wrap bg-primary-700 shadow-lg"
              >{{ menuItem.label }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from './SharedComponents/Icon.vue'
import Header from './SharedComponents/Header.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSideNavigationToggled = ref(false)
const menuItems = ref([
  { id: 1, label: 'Pokemon', icon: 'SmartHome', route: '/pokemon' },
  {
    id: 2,
    label: 'About',
    icon: 'StarBrand',
    route: '/about',
  },
])

const emits = defineEmits<{
  (e: 'toggle-side-navigation', isSideNavigationToggled: boolean): void
}>()

const toggleSideNavigation = () => {
  isSideNavigationToggled.value = !isSideNavigationToggled.value
  emits('toggle-side-navigation', isSideNavigationToggled.value)
}
const openSideNavigation = () => {
  isSideNavigationToggled.value = false
  emits('toggle-side-navigation', isSideNavigationToggled.value)
}

interface MenuItem {
  id: number
  label: string
  icon: string
  route: string
}

const hoveredItem = ref<Set<MenuItem>>(new Set())

const setHoveredItem = (item: MenuItem, value: boolean) => {
  if (value) {
    hoveredItem.value.add(item)
  } else {
    hoveredItem.value.delete(item)
  }
}

const isItemHovered = (item: MenuItem) => hoveredItem.value.has(item)

const svgFillIcon = (item: MenuItem) => {
  return isItemHovered(item)
}
</script>
