/* eslint-disable consistent-return */
import produce from 'immer';

const INITIAL_STATE = {
  student: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/EDIT_STUDENT': {
        draft.student = action.payload.data;
        break;
      }
      default:
        return state;
    }
  });
}
