<template>
  <v-container>
    <h1>index page</h1>
    <p>current value: {{ value }}</p>
    <p>result: {{ result }}</p>
    <v-textarea
      v-model="value"
      bg-color="light-blue"
      label="Label"
    ></v-textarea>
    <button @click="submit">submit</button>
  </v-container>
</template>
<script setup lang="ts">
  const value = ref('')
  const result = ref('')
  const submit = async () => {
    const { data } = await useFetch('/api/eval', {
      body: {
        answerText: value.value,
      },
      method: 'POST',
    })
    watch(data, (newData) => {
      result.value = JSON.stringify(newData)
    })
  }
</script>
