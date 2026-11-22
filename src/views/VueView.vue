<script setup lang="ts">
import LessonLayout from '@/components/LessonLayout.vue'
import KeyLab from '@/components/labs/KeyLab.vue'
import { getLesson } from '@/data/lessons'
const lesson = getLesson('vue')
</script>
<template>
  <LessonLayout :lesson="lesson"><KeyLab /></LessonLayout>
</template>
