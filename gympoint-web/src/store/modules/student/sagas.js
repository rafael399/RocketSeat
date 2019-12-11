import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { createStudentSuccess, createStudentFailure } from './actions';

export function* createUser({ payload }) {
  try {
    const { name, email, age, weight, height } = payload.data;

    const newStudent = { name, email, age, weight, height };

    yield call(api.post, 'students', newStudent);

    toast.success('Aluno cadastrado com sucesso.');

    yield put(createStudentSuccess());
  } catch (err) {
    toast.error('Erro no cadastro, verifique os dados');

    yield put(createStudentFailure());
  }
}

export default all([takeLatest('@student/CREATE_STUDENT_REQUEST', createUser)]);
