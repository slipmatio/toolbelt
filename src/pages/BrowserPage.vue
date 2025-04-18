<script setup lang="ts">
import { copyToClipboard, deleteCookie, getCookie, storageAvailable, isBot } from '@/browser'
import { ref } from 'vue'

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
const cookie3Result = ref<string | null>(null)
const cookie3ResultText = ref('')
const botResult = ref(isBot())
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

function cookie3() {
  deleteCookie('test-cookie')
  setTimeout(() => {
    cookie3Result.value = getCookie('test-cookie')
    if (cookie3Result.value === null) {
      cookie3ResultText.value = 'null'
    } else {
      cookie3ResultText.value = cookie3Result.value
    }
    console.log('cookie3Result: ', cookie3Result.value)
  }, 50)
}

cookie1()
cookie2()
cookie3()

setTimeout(() => {
  resultsIn.value = true
}, 200)

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

  <button data-testid="cookie3" @click.prevent="cookie3"> Delete test cookie </button>

  <div data-testid="cookie-results" v-if="resultsIn">
    <p>
      Cookie1 result: <span data-testid="cookie-result1">{{ cookie1ResultText }}</span>
    </p>
    <p>
      Cookie2 result: <span data-testid="cookie-result2">{{ cookie2Result }}</span>
    </p>
    <p>
      Cookie3 result: <span data-testid="cookie-result3">{{ cookie3ResultText }}</span>
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

  <div data-testid="other-results">
    <p>
      Bot result: <span data-testid="bot-result">{{ botResult }}</span>
    </p>
  </div>

  <div>
    <p>Test <router-link to="/vue/">Vue operations</router-link></p>
  </div>
</template>
