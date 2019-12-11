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
