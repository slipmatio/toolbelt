<script setup lang="ts">
import { testUrls, testPaths } from '@/testurls'
import { getNextPath, getNext } from '@/vue'
import { ref } from 'vue'

const allowedDomains = ['slipmat.io']

const nextPath = ref(getNextPath())
const nextUrl = ref(getNext(allowedDomains))
console.log(`nextPath: ${nextPath.value}`)
console.log(`nextUrl: ${nextUrl.value}`)

function go(url: string) {
  location.href = url
}
</script>
<template>
  <p>
    Next path: <span data-testid="path">{{ nextPath }}</span>
  </p>
  <p>
    Next URL: <span data-testid="url">{{ nextUrl }}</span>
  </p>

  <div>
    <p>
      <button
        v-for="testObj in testPaths"
        :data-testid="testObj.testid"
        @click.prevent="go(testObj.url)"
        :key="testObj.url">
        Test {{ testObj.url }}
      </button>
    </p>
  </div>
  <hr />
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
