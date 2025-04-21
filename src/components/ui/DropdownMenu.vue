<template>
  <div class="relative inline-block text-left dropdown-container" ref="dropdownRef">
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

    <teleport to="body">
      <div 
        v-if="open"
        class="fixed z-[9999] dropdown-menu-items"
        :style="menuPosition"
        role="menu" 
        aria-orientation="vertical" 
        tabindex="-1"
        :class="[menuClass, {'dropdown-menu-flip': isAtBottom}]"
        ref="menuRef"
      >
        <div class="py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden" role="none">
          <slot></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';

const dropdownRef = ref(null);
const menuRef = ref(null);
const open = ref(false);
const isAtBottom = ref(false);
const menuPosition = ref({});

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
  if (open.value) {
    nextTick(() => {
      updateMenuPosition();
    });
  }
};

// Position the menu relative to the button
const updateMenuPosition = () => {
  if (!dropdownRef.value) return;
  
  const buttonRect = dropdownRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  // Position horizontally at the right edge of the button
  const right = window.innerWidth - buttonRect.right;
  
  // Determine whether to position above or below the button
  const spaceBelow = viewportHeight - buttonRect.bottom;
  isAtBottom.value = spaceBelow < 200; // 200px is an arbitrary threshold
  
  if (isAtBottom.value) {
    // Position above the button
    menuPosition.value = {
      bottom: (viewportHeight - buttonRect.top) + 'px',
      right: right + 'px',
    };
  } else {
    // Position below the button
    menuPosition.value = {
      top: buttonRect.bottom + 'px',
      right: right + 'px',
    };
  }
};

// Close the dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target) && 
      menuRef.value && !menuRef.value.contains(event.target)) {
    open.value = false;
  }
};

// Update position on resize/scroll
const handleResize = () => {
  if (open.value) {
    updateMenuPosition();
  }
};

// Watch for document body changes (pagination, sorting, etc)
watch(() => open.value, (newVal) => {
  if (newVal) {
    // Set a timeout to allow the DOM to update
    setTimeout(() => {
      updateMenuPosition();
    }, 10);
  }
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
  window.addEventListener('scroll', handleResize, true);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
  window.removeEventListener('scroll', handleResize, true);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
}

/* Add a small transition for the menu appearance */
.dropdown-menu-items {
  transition: opacity 0.15s ease-out;
  min-width: 14rem;
  width: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Ensure dropdown items are visible and clickable */
:deep(.dropdown-menu-item) {
  position: relative;
  z-index: 9999;
  display: block;
  width: 100%;
}

.dropdown-menu-flip {
  transform-origin: bottom right;
}
</style> 