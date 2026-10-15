import api from './public.api';

export default {
  getProductItems() {
    let params = {}
    return api.get('/api/products', { params })
  },
  getProductItemById({ productId }) {
    let params = {}
    return api.get(`/api/products/${productId}`, { params })
  }
}
