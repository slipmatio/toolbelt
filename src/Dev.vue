<script setup lang="ts">
import { copyToClipboard, getCookie, storageAvailable } from './browser'

const clipboardText = 'clipboard works'

function clip() {
  const success = copyToClipboard(clipboardText)
  if (success) {
    console.log('copied to clipboard')
  } else {
    console.log('failed to copy to clipboard')
  }
}

function cookie() {
  const cookie = getCookie('doesntexist')
  console.log(cookie)
}

function testLocalStorage() {
  if (storageAvailable('localStorage')) {
    console.log('localStorage is available')
  } else {
    console.log('localStorage not available')
  }
}
</script>
<template>
  <h2>Slipmat Toolbelt</h2>

  <button data-testid="clipboard" @click.prevent="clip"> Copy to clipboard </button>

  <button data-testid="cookie" @click.prevent="cookie"> Get cookie </button>

  <button data-testid="localstorage" @click.prevent="testLocalStorage"> Test localStorage </button>
</template>
