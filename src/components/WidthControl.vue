<script setup lang="ts">
defineProps<{ id: string; label: string; modelValue: number; min: number; max: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
function update(event: Event) {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}
</script>

<template>
  <label :for="id" class="control-label"
    >{{ label }} <output>{{ modelValue }}px</output></label
  >
  <input :id="id" :value="modelValue" type="range" :min="min" :max="max" step="1" @input="update" />
</template>
