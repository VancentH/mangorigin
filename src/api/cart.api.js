import api from './private.api';

export default {
  get() {
    let headers = { 'authorization': localStorage.getItem("token") }
    let tid = localStorage.getItem("tid")
    return api.get(`/api/carts/${tid}`, { headers })
  },
  add({ cart }) {
    let headers = { 'authorization': localStorage.getItem("token") }
    let tid = localStorage.getItem("tid")
    let data = JSON.stringify(cart)
    return api.post(`/api/carts/${tid}`, { data }, { headers });
  },
  deleteAll() {
    let headers = { 'authorization': localStorage.getItem("token") }
    let tid = localStorage.getItem("tid")
    let params = {}
    return api.delete(`/api/carts/${tid}`, { headers }, { params })
  },
  delete({ productId }) {
    //tid, product
    let headers = { 'authorization': localStorage.getItem("token") }
    let tid = localStorage.getItem("tid")
    let params = {}
    return api.delete(`/api/carts/${tid}/${productId}`, { headers }, { params })
  }
}
