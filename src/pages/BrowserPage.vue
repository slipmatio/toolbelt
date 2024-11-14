<script setup lang="ts">
import { ref } from 'vue'
import { copyToClipboard, getCookie, storageAvailable } from '../browser'

// Cookies
try {
  await fetch(`http://localhost:8000/cookie/set/test-cookie/this-is-a-test/`)
  console.log('fetch done, cookie set')
} catch (e) {
  console.error('Failed to query cookie endpoint', e)
}

const cookie1Result = ref<string | null>(null)
const cookie1ResultText = ref('')
const cookie2Result = ref<string | null>(null)
const resultsIn = ref(false)

function cookie1() {
  cookie1Result.value = getCookie('doesntexist')
  if (cookie1Result.value === null) {
    cookie1ResultText.value = 'null'
  } else {
    cookie1ResultText.value = cookie1Result.value
  }
  console.log('cookie1Result: ', cookie1Result.value)
}

function cookie2() {
  cookie2Result.value = getCookie('test-cookie')
  console.log('cookie2Result: ', cookie2Result.value)
}

cookie1()
cookie2()
setTimeout(() => {
  resultsIn.value = true
}, 100)

// Clipboard

const clipboardText = 'clipboard works'
const clipboardResult = ref<undefined | boolean>(undefined)
const storageResult = ref<undefined | boolean>(undefined)

function clip() {
  const success = copyToClipboard(clipboardText)
  if (success) {
    console.log('copied to clipboard')
    clipboardResult.value = true
  } else {
    console.log('failed to copy to clipboard')
    clipboardResult.value = false
  }
}

function testLocalStorage() {
  if (storageAvailable('localStorage')) {
    console.log('localStorage is available')
    storageResult.value = true
  } else {
    console.log('localStorage not available')
    storageResult.value = false
  }
}
</script>
<template>
  <h2>Slipmat Toolbelt</h2>

  <button data-testid="clipboard" @click.prevent="clip"> Copy to clipboard </button>

  <button data-testid="localstorage" @click.prevent="testLocalStorage"> Test localStorage </button>

  <button data-testid="cookie1" @click.prevent="cookie1"> Get nonexistent cookie </button>

  <button data-testid="cookie2" @click.prevent="cookie2"> Get test cookie </button>

  <div data-testid="cookie-results" v-if="resultsIn">
    <p>
      Cookie1 result: <span data-testid="cookie-result1">{{ cookie1ResultText }}</span>
    </p>
    <p>
      Cookie2 result: <span data-testid="cookie-result2">{{ cookie2Result }}</span>
    </p>
  </div>
  <div v-else>
    <p>Waiting for cookies</p>
  </div>

  <div data-testid="clipboard-results">
    <p>
      Clipboard result: <span data-testid="clipboard-result">{{ clipboardResult }}</span>
    </p>
    <p>
      LocalStorage result: <span data-testid="localstorage-result">{{ storageResult }}</span>
    </p>
  </div>

  <div>
    <p>Test <router-link to="/vue/">Vue operations</router-link></p>
  </div>
</template>
