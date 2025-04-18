import { Window } from 'happy-dom' // or jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { isBot } from '@/browser'

const botUAs = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'DoCoMo/2.0 N905i(c100;TB;W24H16) (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)',
  'Googlebot-Video/1.0',
  'Mozilla/5.0 (iPhone; U; CPU iPhone OS 10_0 like Mac OS X; en-us) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A5297c Safari/602.1 (compatible; Mediapartners-Google/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'Mozilla/5.0 (compatible; YandexRenderResourcesBot/1.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0',
  'LightspeedSystemsCrawler Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US',
  'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; TikTokSpider; ttspider-feedback@tiktok.com)',
]

const browserUAas = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:137.0) Gecko/20100101 Firefox/137.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15',
]

describe('Tests with global window mock', () => {
  beforeEach(() => {
    // Create a more complete window mock
    const window = new Window()
    vi.stubGlobal('window', window)
    vi.stubGlobal('document', window.document)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should identify bots', () => {
    for (const ua of botUAs) {
      vi.stubGlobal('navigator', {
        userAgent: ua,
      })
      expect(isBot()).toBe(true)
    }
  })

  it('should identify normal browsers', () => {
    for (const ua of browserUAas) {
      vi.stubGlobal('navigator', {
        userAgent: ua,
      })
      expect(isBot()).toBe(false)
    }
  })
})
