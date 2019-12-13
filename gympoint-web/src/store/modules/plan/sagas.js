import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  createPlanSuccess,
  createPlanFailure,
  updatePlanSuccess,
  updatePlanFailure,
  deletePlanSuccess,
  deletePlanFailure,
} from './actions';

export function* createPlan({ payload }) {
  try {
    const { title, duration, price } = payload.data;
    const newPlan = { title, duration, price };

    yield call(api.post, 'plan', newPlan);

    toast.success('Plano cadastrado com sucesso.');

    yield put(createPlanSuccess());
  } catch (err) {
    toast.error('Erro no cadastro, verifique os dados');

    yield put(createPlanFailure());
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload.data;
    const newInfo = { title, duration, price };

    yield call(api.put, `plan/${id}`, newInfo);

    toast.success('Cadastro de plano atualizado com sucesso.');

    yield put(updatePlanSuccess());
  } catch (err) {
    toast.error('Erro na atualização do cadastro, verifique os dados');

    yield put(updatePlanFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plan/${id}`);

    toast.success('Plano excluído com sucesso.');

    yield put(deletePlanSuccess());
  } catch (err) {
    toast.error('Erro na exclusão do cadastro');

    yield put(deletePlanFailure());
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deletePlan),
]);
