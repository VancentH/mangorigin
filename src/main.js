// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'


// iView
import iView from 'iview'
// uuid
import UUID from 'vue-uuid'
import utility from '@/libs/utility'
import 'iview/dist/styles/iview.css'
import '@/assets/less/site.less'

Vue.config.productionTip = false
Vue.prototype.$utility = utility

Vue.use(api)
Vue.use(iView, {
  size: 'large'
})
Vue.use(UUID)

// Automatically assign the user's browser a temporary identifier
const tid = localStorage.getItem('tid') // uuid

// global message setting
Vue.prototype.$Message.config({
  top: 100,
  duration: 2
})

// loading bar
router.beforeEach((to, from, next) => {

  //TODO: simplify
  //Filter reflected XSS
  //https://juejin.cn/post/6936183982048411685
  const query = Object.keys(to.query)
  for (let key of query) {
    const param = to.query[key]
    const illegal = [
      /<(no)?script[^>]*>.*?<\/(no)?script>/gim,
      /eval\((.*?)\)/gim,
      /expression\((.*?)\)/gim,
      /(javascript:|vbscript:|view-source:)+/gim,
      /<("[^"]*"|'[^']*'|[^'">])*>/gim,
      /(window\.location|window\.|\.location|document\.cookie|document\.|alert\(.*?\)|window\.open\()+/gim,
      /<+\s*\w*\s*(oncontrolselect|oncopy|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondblclick|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|οnerrοr=|onerroupdate|onfilterchange|onfinish|onfocus|onfocusin|onfocusout|onhelp|onkeydown|onkeypress|onkeyup|onlayoutcomplete|onload|onlosecapture|onmousedown|onmouseenter|onmouseleave|onmousemove|onmousout|onmouseover|onmouseup|onmousewheel|onmove|onmoveend|onmovestart|onabort|onactivate|onafterprint|onafterupdate|onbefore|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onblur|onbounce|oncellchange|onchange|onclick|oncontextmenu|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|onstop|onsubmit|onunload)+\s*=+/gim
    ]
    for (let reg of illegal) {
      if (reg.test(param.toLowerCase())) {
        alert('請求參數不合法!')
        next({ path: to.path, query: {} })
        return
      }
    }
  }

  iView.LoadingBar.start();
  window.document.title = to.meta.title; // set up page title
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
