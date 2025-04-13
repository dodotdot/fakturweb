<template>
  <label
    :class="[
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </label>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    default: ''
  }
});
</script> 