import { SET_DRAGGING_ELEMENT } from '../mutations';

const state = {
  draggingElement: '',
};

const mutations = {
  [SET_DRAGGING_ELEMENT](state, compId) {
    state.draggingElement = compId;
  },
};

export default {
  state,
  mutations,
};
