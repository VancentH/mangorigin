const state = {
  requestCount: 0
}

const mutations = {
  load(state) {
    state.requestCount++;
    this._vm.$Spin.show(); // trigger loading
  },
  complete(state) {
    state.requestCount--;
    if (state.requestCount === 0) {
      this._vm.$Spin.hide(); // complete loading
    }
  }
}

const actions = {
  load({ commit }) {
    commit("load")
  },
  complete({ commit }) {
    commit("complete")
  }
}

const getters = {}

const spinModule = {
  state,
  mutations,
  actions,
  getters
}

export default spinModule;