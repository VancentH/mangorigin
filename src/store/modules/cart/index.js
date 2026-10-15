import axios from 'axios';
import api from '@/api/cart.api'
import { Message } from 'iview';

const state = {
  cartItems: [],
  isAutoLogin: false
}

const mutations = {
  UPDATE_CART_ITEMS(state, payload) {
    state.cartItems = payload
  },
  UPDATE_AUTO_LOGIN(state, payload) {
    state.isAutoLogin = payload
  }
}

const actions = {
  setIsAutoLogin({ commit }) {
    commit('UPDATE_AUTO_LOGIN', true)
  },
  getCartItems({ commit, state }) {
    // check if auto login
    if (!state.isAutoLogin) return;
    let headers = { 'authorization': localStorage.getItem("token") }
    let tid = localStorage.getItem("tid")
    axios.get(`/api/carts/${tid}`, { headers })
      .then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
      }).catch((error) => {
        Message.error('商品資料載入失敗: ' + error);
      })
  },
  addCartItem({ commit }, { cart }) {
    api.add({ cart })
      .then((response) => {
        commit('UPDATE_CART_ITEMS', response.data)
        Message.success('加入成功!已將商品加入購物車。');
      })
      .catch((error) => {
        Message.error('商品加入購物車失敗: ' + error);
      })
  },
  removeCartItem({ commit }, productId) {
    api.delete({ productId })
      .then((response) => {
        commit('UPDATE_CART_ITEMS', response.data);
        Message.success('刪除成功!已將商品從購物車移除。');
      })
      .catch((error) => {
        Message.success('商品從購物車刪除失敗: ' + error);
      })
  },
  removeAllCartItems({ commit }) {
    api.deleteAll()
      .then((response) => {
        commit('UPDATE_CART_ITEMS', response.data);
        Message.success('刪除成功!已將購物車中所有商品刪除。');
      })
      .catch((error) => {
        Message.success('刪除所有購物車商品失敗: ' + error);
      })
  },
  // Adjust order quantity
  updateCartItemsQty({ commit }, { cartItemId, cartItemQty }) {
    const updatedItems = state.cartItems.map(item => {
      let temp = Object.assign({}, item);
      if (temp.id === cartItemId)
        temp.quantity = cartItemQty;
      return temp;
    });
    commit('UPDATE_CART_ITEMS', updatedItems)
  }
}

const getters = {
  cartItems: state => state.cartItems,
  cartFreight: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return (cartItem.quantity * cartItem.freight) + acc;
    }, 0).toFixed(2);
  },
  cartTotal: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return (cartItem.quantity * cartItem.price) + acc;
    }, 0).toFixed(2);
  },
  cartOrderTotal: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return (cartItem.quantity * cartItem.price) + (cartItem.quantity * cartItem.freight) + acc;
    }, 0).toFixed(2);
  },
  cartEntry: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity > '0' ? acc += 1 : acc;
    }, 0);
  },
  cartQuantity: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity + acc;
    }, 0);
  }
}


const cartModule = {
  state,
  mutations,
  actions,
  getters
}
export default cartModule;