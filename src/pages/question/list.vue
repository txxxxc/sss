<template>
  <div>
    <h3 class="text-title mb-8">問題一覧</h3>
    <NuxtLink
      v-for="question in questions"
      :key="question.title"
      :to="`/question/${question.id}`"
      style="text-decoration: none"
    >
      <v-card :link="true" class="mx-auto mb-4">
        <template #title>{{ question.title }}</template>
        <v-card-text>{{ question.description }}</v-card-text>
      </v-card>
    </NuxtLink>
    <NuxtLink to="/question/create">
      <p class="text-subtitle mb-8">新しい問題を作る</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const questions = useDataSource()
</script>
