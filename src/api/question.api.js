import api from './public.api';

export default {
  getQuestions() {
    let params = {}
    return api.get('/api/questions', { params })
  },
  getCategories() {
    let params = {}
    return api.get('/api/questionCategories', { params })
  },
}
