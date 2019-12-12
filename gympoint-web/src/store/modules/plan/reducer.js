/* eslint-disable consistent-return */
import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/EDIT_PLAN': {
        draft.plan = action.payload.data;
        break;
      }
      default:
        return state;
    }
  });
}
