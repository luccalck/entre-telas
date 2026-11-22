<script setup lang="ts">
import LessonLayout from '@/components/LessonLayout.vue'
import WidthLab from '@/components/labs/WidthLab.vue'
import { getLesson } from '@/data/lessons'
const lesson = getLesson('fundamentos')
</script>
<template>
  <LessonLayout :lesson="lesson"><WidthLab /></LessonLayout>
</template>
