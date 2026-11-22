<script setup lang="ts">
import LessonLayout from '@/components/LessonLayout.vue'
import UnitsLab from '@/components/labs/UnitsLab.vue'
import { getLesson } from '@/data/lessons'
const lesson = getLesson('unidades')
</script>
<template>
  <LessonLayout :lesson="lesson"><UnitsLab /></LessonLayout>
</template>
