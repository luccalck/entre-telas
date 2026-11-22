<script setup lang="ts">
import LessonLayout from '@/components/LessonLayout.vue'
import ApiLab from '@/components/labs/ApiLab.vue'
import { getLesson } from '@/data/lessons'
const lesson = getLesson('estado-api')
</script>
<template>
  <LessonLayout :lesson="lesson"><ApiLab /></LessonLayout>
</template>
