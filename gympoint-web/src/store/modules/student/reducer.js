/* eslint-disable consistent-return */
import produce from 'immer';

const INITIAL_STATE = {
  student: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/EDIT_STUDENT': {
        draft.student = action.payload.data;
        break;
      }
      case '@student/DELETE_STUDENT_REQUEST': {
        draft.student = null;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.student = null;
        break;
      }
      default:
        return state;
    }
  });
}
