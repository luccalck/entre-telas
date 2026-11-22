<script setup lang="ts">
import LessonLayout from '@/components/LessonLayout.vue'
import ImagesLab from '@/components/labs/ImagesLab.vue'
import { getLesson } from '@/data/lessons'
const lesson = getLesson('imagens')
</script>
<template>
  <LessonLayout :lesson="lesson"><ImagesLab /></LessonLayout>
</template>
