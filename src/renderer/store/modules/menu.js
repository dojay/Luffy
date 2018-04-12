import { SET_MENU_WIDTH, SET_MENU_VISIBLE, SET_MENU_TYPE } from '../mutations';

const state = {
  width: 200,
  visible: true,
  type: 'files',
};

const mutations = {
  [SET_MENU_WIDTH](state, width) {
    state.width = width;
  },

  [SET_MENU_VISIBLE](state, visible) {
    state.visible = visible;
  },

  [SET_MENU_TYPE](state, type) {
    if (state.type === type) {
      state.visible = !state.visible;
    } else {
      state.visible = true;
    }
    state.type = type;
  },
};

export default {
  state,
  mutations,
};
