<template>
  <button
    type="button"
    role="switch"
    :aria-checked="checked"
    :data-state="checked ? 'checked' : 'unchecked'"
    :disabled="disabled"
    :class="switchClasses"
    @click="checked = !checked"
  >
    <span
      :data-state="checked ? 'checked' : 'unchecked'"
      class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Compute classes based on props
const switchClasses = computed(() => {
  return [
    'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
    props.class
  ]
})
</script>

<style scoped>
/* Base styles for the switch */
button[role="switch"] {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.2s ease;
}

button[role="switch"] span {
  position: absolute;
  left: 2px;
  transition: transform 0.2s ease;
}

/* Ensure the thumb moves correctly */
[data-state="checked"] span {
  transform: translateX(20px);
}

[data-state="unchecked"] span {
  transform: translateX(0);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  button[role="switch"] {
    width: 40px;
    height: 22px;
    border-radius: 11px;
  }
  
  button[role="switch"] span {
    width: 18px;
    height: 18px;
    left: 2px;
  }
  
  [data-state="checked"] span {
    transform: translateX(18px);
  }
}

@media (max-width: 375px) {
  button[role="switch"] {
    width: 36px;
    height: 20px;
    border-radius: 10px;
  }
  
  button[role="switch"] span {
    width: 16px;
    height: 16px;
    left: 2px;
  }
  
  [data-state="checked"] span {
    transform: translateX(16px);
  }
}
</style> 