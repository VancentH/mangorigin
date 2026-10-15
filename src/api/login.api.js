import api from './public.api';

export default {
  login() {
    const tid = localStorage.getItem("tid");
    let data = tid;
    return api.post('/api/autologin', { data })
  },
}
