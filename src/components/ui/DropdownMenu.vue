<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <div>
      <button 
        @click="toggle"
        type="button" 
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        :class="buttonClass"
        :aria-expanded="open"
        aria-haspopup="true"
      >
        <slot name="trigger"></slot>
      </button>
    </div>

    <div 
      v-if="open" 
      class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu" 
      aria-orientation="vertical" 
      tabindex="-1"
      :class="menuClass"
    >
      <div class="py-1" role="none">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const dropdownRef = ref(null);
const open = ref(false);

defineProps({
  buttonClass: {
    type: String,
    default: ''
  },
  menuClass: {
    type: String,
    default: ''
  }
});

const toggle = () => {
  open.value = !open.value;
};

// Close the dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.origin-top-right {
  transform-origin: top right;
}
</style> 