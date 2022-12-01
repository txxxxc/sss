<template>
  <div>
    <NuxtLink to="/question/list">
      <p class="text-subtitle mb-8">一覧に戻る</p>
    </NuxtLink>
    <p class="text-h5 mb-8">{{ question.title }}</p>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-alert
      v-if="!loading && hasAnswered && result.correct"
      class="mb-4"
      title="正解！"
      variant="flat"
      type="success"
    ></v-alert>
    <v-alert
      v-if="!loading && hasAnswered && !result.correct"
      class="mb-4"
      title="不正解！"
      variant="flat"
      type="error"
    ></v-alert>
    <v-alert :title="question.title" variant="flat">{{
      question.description
    }}</v-alert>
    <v-textarea v-model="answer" class="mt-4" variant="outlined"></v-textarea>
    <v-btn variant="outlined" @click="submit">提出する</v-btn>
  </div>
</template>
<script setup lang="ts">
  const id = useRoute().params.id
  const question = useFindQuestionById(Number(id))
  const loading = ref(false)
  const answer = ref('')
  const hasAnswered = ref(false)
  const result = ref({})

  const { data, execute } = await useAsyncData<{ correct: boolean }>(
    'createPost',
    () =>
      $fetch('/api/eval', {
        method: 'POST',
        body: {
          answerText: answer.value,
          requiredAnswer: question.requiredAnswer,
        },
      }),
    {
      immediate: false,
    }
  )
  watch(data, (newData) => {
    hasAnswered.value = true
    if (newData) {
      result.value = newData
    }
  })
  const submit = async (): Promise<void> => {
    await execute()
  }
</script>
