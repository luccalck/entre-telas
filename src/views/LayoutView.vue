<script setup lang="ts">
import LessonLayout from '@/components/LessonLayout.vue'
import GridLab from '@/components/labs/GridLab.vue'
import { getLesson } from '@/data/lessons'
const lesson = getLesson('layout')
</script>
<template>
  <LessonLayout :lesson="lesson"><GridLab /></LessonLayout>
</template>
