export function createStudentRequest(data) {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { data },
  };
}

export function createStudentSuccess() {
  return {
    type: '@student/CREATE_STUDENT_SUCCESS',
  };
}

export function createStudentFailure() {
  return {
    type: '@student/CREATE_STUDENT_FAILURE',
  };
}

export function editStudentRequest(data) {
  return {
    type: '@student/EDIT_STUDENT',
    payload: { data },
  };
}

export function updateStudentRequest(data) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { data },
  };
}

export function updateStudentSuccess() {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}

export function deleteStudentRequest(id, callback) {
  return {
    type: '@student/DELETE_STUDENT_REQUEST',
    payload: { id, callback },
  };
}

export function deleteStudentSuccess() {
  return {
    type: '@student/DELETE_STUDENT_SUCCESS',
  };
}

export function deleteStudentFailure() {
  return {
    type: '@student/DELETE_STUDENT_FAILURE',
  };
}
