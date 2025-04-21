<template>
  <component 
    :is="asComponent" 
    :to="to" 
    class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm w-full text-left cursor-pointer dropdown-menu-item"
    :class="[className, { 'text-red-600 hover:bg-red-50 hover:text-red-700': destructive }]"
    role="menuitem" 
    tabindex="-1"
    @click="onClick"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  as: {
    type: String,
    default: 'button'
  },
  to: {
    type: String,
    default: undefined
  },
  destructive: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const asComponent = computed(() => {
  if (props.to) {
    return 'router-link';
  }
  return props.as;
});

const onClick = (event) => {
  emit('click', event);
};
</script>

<style scoped>
.dropdown-menu-item {
  position: relative;
  z-index: 9999;
  user-select: none;
}
</style> 