import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  createRegistrationSuccess,
  createRegistrationFailure,
  updateRegistrationSuccess,
  updateRegistrationFailure,
  cancelRegistrationSuccess,
  cancelRegistrationFailure,
} from './actions';

export function* createRegistration({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload.data;
    const newRegistration = { student_id, plan_id, start_date };

    yield call(api.post, 'registration', newRegistration);

    toast.success('Matrícula efetuada com sucesso.');

    yield put(createRegistrationSuccess());
  } catch (err) {
    toast.error('Erro no cadastro, verifique os dados');
    toast.error('Verifique se a data de início já passou');
    toast.error(
      'Verifique se o usuário já tem matrícula ativa ou a ser ativada'
    );

    yield put(createRegistrationFailure());
  }
}

export function* updateRegistration({ payload }) {
  try {
    const { id, student_id, plan_id, start_date } = payload.data;
    const newInfo = { student_id, plan_id, start_date };

    yield call(api.put, `registration/${id}`, newInfo);

    toast.success('Matrícula atualizada com sucesso.');

    yield put(updateRegistrationSuccess());
  } catch (err) {
    toast.error('Erro na atualização da matrícula, verifique os dados');

    yield put(updateRegistrationFailure());
  }
}

export function* cancelRegistration({ payload }) {
  try {
    const { id, callback } = payload;

    yield call(api.delete, `registration/${id}`);

    toast.success('Matrícula cancelada com sucesso.');

    callback();

    yield put(cancelRegistrationSuccess());
  } catch (err) {
    toast.error('Erro no cancelamento da matrícula');

    yield put(cancelRegistrationFailure());
  }
}

export default all([
  takeLatest('@registration/CREATE_REGISTRATION_REQUEST', createRegistration),
  takeLatest('@registration/UPDATE_REGISTRATION_REQUEST', updateRegistration),
  takeLatest('@registration/CANCEL_REGISTRATION_REQUEST', cancelRegistration),
]);
