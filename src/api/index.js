import question from './question.api'
import product from './product.api'
import login from './login.api'

const api = {
  question, login, product
}

/* eslint-disable */
export default {
  install(Vue, options) {
    Vue.prototype.$api = api
  }
};
/* eslint-disable */
