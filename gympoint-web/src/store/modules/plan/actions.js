export function createPlanRequest(data) {
  return {
    type: '@plan/CREATE_PLAN_REQUEST',
    payload: { data },
  };
}

export function createPlanSuccess() {
  return {
    type: '@plan/CREATE_PLAN_SUCCESS',
  };
}

export function createPlanFailure() {
  return {
    type: '@plan/CREATE_PLAN_FAILURE',
  };
}

export function updatePlanRequest(data) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { data },
  };
}

export function updatePlanSuccess() {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}

export function deletePlanRequest(id, callback) {
  return {
    type: '@plan/DELETE_PLAN_REQUEST',
    payload: { id, callback },
  };
}

export function deletePlanSuccess() {
  return {
    type: '@plan/DELETE_PLAN_SUCCESS',
  };
}

export function deletePlanFailure() {
  return {
    type: '@plan/DELETE_PLAN_FAILURE',
  };
}
