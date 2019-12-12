import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  createStudentSuccess,
  createStudentFailure,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './actions';

export function* createStudent({ payload }) {
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

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload.data;

    const newInfo = { name, email, age, weight, height };

    yield call(api.put, `students/${id}`, newInfo);

    toast.success('Cadastro de aluno atualizado com sucesso.');

    yield put(updateStudentSuccess());
  } catch (err) {
    toast.error('Erro na atualização do cadastro, verifique os dados');

    yield put(updateStudentFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload.data;

    yield call(api.delete, `students/${id}`);

    toast.success('Cadastro de aluno excluído com sucesso.');

    yield put(deleteStudentSuccess());
  } catch (err) {
    toast.error('Erro na exclusão do cadastro');

    yield put(deleteStudentFailure());
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);
