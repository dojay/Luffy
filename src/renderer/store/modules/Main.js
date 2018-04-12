const state = {
  movingComp: '',
  menuWidth: 200,
};

const mutations = {
  UPDATE_MENU_WIDTH(state, width) {
    state.menuWidth = width;
  },

  MOVING_COMPONENT(state, compId) {
    state.movingComp = compId;
  },
};

export default {
  state,
  mutations,
};
