import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { answerQuestionSuccess, answerQuestionFailed } from './actions';

export function* answerQuestion({ payload }) {
  try {
    const { id, answer, setVisible, callback } = payload;
    const answerInfo = { answer };

    yield call(api.post, `/help-orders/${id}/answer`, answerInfo);

    toast.success('Pergunta respondida.');

    setVisible(false);

    callback();

    yield put(answerQuestionSuccess());
  } catch (err) {
    toast.error('Erro ao responder pergunta, verifique os dados');

    yield put(answerQuestionFailed());
  }
}

export default all([
  takeLatest('@helpOrder/ANSWER_QUESTION_REQUEST', answerQuestion),
]);
