<script setup lang="ts">
import { testUrls } from '@/testurls'
import { getNextPath } from '@/vue'
import { ref } from 'vue'

const nextPath = ref(getNextPath())
console.log(`nextPath: ${nextPath.value}`)

function go(url: string) {
  location.href = url
}
</script>
<template>
  <p>
    Next path: <span data-testid="path">{{ nextPath }}</span>
  </p>

  <div>
    <p>
      <button
        v-for="testObj in testUrls"
        :data-testid="testObj.testid"
        @click.prevent="go(testObj.url)"
        :key="testObj.url">
        Test {{ testObj.url }}
      </button>
    </p>
  </div>

  <div>
    <p>Back <router-link to="/">to home</router-link></p>
  </div>
</template>
