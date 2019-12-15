export function answerQuestionRequest(id, answer, setVisible, callback) {
  return {
    type: '@helpOrder/ANSWER_QUESTION_REQUEST',
    payload: { id, answer, setVisible, callback },
  };
}

export function answerQuestionSuccess() {
  return {
    type: '@helpOrder/ANSWER_QUESTION_SUCCESS',
  };
}

export function answerQuestionFailed() {
  return {
    type: '@helpOrder/ANSWER_QUESTION_FAILED',
  };
}
