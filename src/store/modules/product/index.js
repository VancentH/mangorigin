import api from '@/api/product.api'
import { Message } from 'iview';

const state = {
  productItems: []
}

const mutations = {
  UPDATE_PRODUCT_ITEMS(state, payload) {
    state.productItems = payload;
  }
}

const actions = {
  getProductItems({ commit }) {
    api.getProductItems()
      .then((response) => {
        commit('UPDATE_PRODUCT_ITEMS', response.data)
      })
      .catch((error) => {
        Message.error('載入商品清單失敗: ' + error);
      })
  },
  // getProductItemById({ commit }, { productId }) {
  //   axios.get(`/api/products/${productId}`).then((response) => {
  //     commit('UPDATE_PRODUCT_ITEM', response.data)
  //   });
  // }
}

const getters = {
  productItems: state => state.productItems,
  productItemById: (state) => (id) => {
    let result = state.productItems.find(productItem => productItem.id === id)
    return result ? result : null
  }
}

const productModule = {
  state,
  mutations,
  actions,
  getters
}

export default productModule;