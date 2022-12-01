<template>
  <div>
    <NuxtLink to="/question/list">
      <p class="text-subtitle mb-8">一覧に戻る</p>
    </NuxtLink>
    <p class="text-h5 mb-1 font-weight-black mb-8">ルームを作成する</p>
    <v-text-field
      v-model="title"
      label="タイトル"
      variant="outlined"
      required
    ></v-text-field>
    <v-textarea
      v-model="description"
      label="説明"
      variant="outlined"
      required
    ></v-textarea>
    <v-textarea
      v-model="requiredAnswer"
      label="想定する答え"
      variant="outlined"
      required
    ></v-textarea>
    <v-row class="ma-0 justify-end">
      <v-btn @click="create" class="justify-end" color="blue-darken-3"
        >問題を作成する</v-btn
      >
    </v-row>
  </div>
</template>

<script setup lang="ts">
  const title = ref('')
  const description = ref('')
  const requiredAnswer = ref('')
  const create = () => {
    useAddQuestion({
      id: Math.floor(Math.random() * 100),
      title: title.value,
      description: description.value,
      requiredAnswer: requiredAnswer.value,
    })
    useRouter().push('/question/list')
  }
</script>

<style scoped>
  .create {
    max-width: 1200px;
  }
</style>
