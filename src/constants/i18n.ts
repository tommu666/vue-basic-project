import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'Hello world!',
    },
    storeCounter: {
      count: 'The store counter is at {count}',
    },
  },
  it: {
    message: {
      hello: 'Buongiorno mondo!',
    },
    storeCounter: {
      count: 'Il contatore è di store a {count}',
    },
  },
}

const i18n = createI18n({
  locale: 'it',
  fallbackLocale: 'en',
  messages,
  legacy: false,
})

export default i18n
