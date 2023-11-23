import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Hello world!'
    }
  },
  it: {
    message: {
      hello: 'Buongiorno mondo!'
    }
  }
}

const i18n = createI18n({
  locale: 'it',
  fallbackLocale: 'en',
  messages,
})

export default i18n