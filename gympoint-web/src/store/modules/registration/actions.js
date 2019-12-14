export function createRegistrationRequest(data) {
  return {
    type: '@registration/CREATE_REGISTRATION_REQUEST',
    payload: { data },
  };
}

export function createRegistrationSuccess() {
  return {
    type: '@registration/CREATE_REGISTRATION_SUCCESS',
  };
}

export function createRegistrationFailure() {
  return {
    type: '@registration/CREATE_REGISTRATION_FAILURE',
  };
}

export function updateRegistrationRequest(data) {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: { data },
  };
}

export function updateRegistrationSuccess() {
  return {
    type: '@registration/UPDATE_REGISTRATION_SUCCESS',
  };
}

export function updateRegistrationFailure() {
  return {
    type: '@registration/UPDATE_REGISTRATION_FAILURE',
  };
}

export function cancelRegistrationRequest(id, callback) {
  return {
    type: '@registration/CANCEL_REGISTRATION_REQUEST',
    payload: { id, callback },
  };
}

export function cancelRegistrationSuccess() {
  return {
    type: '@registration/CANCEL_REGISTRATION_SUCCESS',
  };
}

export function cancelRegistrationFailure() {
  return {
    type: '@registration/CANCEL_REGISTRATION_FAILURE',
  };
}
