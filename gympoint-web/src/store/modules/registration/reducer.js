/* eslint-disable consistent-return */
import produce from 'immer';

const INITIAL_STATE = {
  registration: null,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/EDIT_REGISTRATION': {
        draft.registration = action.payload.data;
        break;
      }
      case '@registration/DELETE_REGISTRATION_REQUEST': {
        draft.registration = null;
        break;
      }
      default:
        return state;
    }
  });
}
