export function signInRequest(studentID) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { studentID },
  };
}

export function signInSuccess(student) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { student },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
