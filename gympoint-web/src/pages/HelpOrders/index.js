/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { AnswerBox, Container, Content } from './styles';

export default function HelpOrders() {
  const [visible, setVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [helpQuestion, setHelpQuestion] = useState({});
  const [answer, setAnswer] = useState('');

  async function loadHelpOrders() {
    const response = await api.get('/help-orders');

    setQuestions(response.data);
  }

  function handleAnswerClick(question) {
    setHelpQuestion(question);
    setAnswer('');
    setVisible(true);
  }

  async function handleAnswer(id) {
    try {
      const answerInfo = { answer };

      await api.post(`/help-orders/${id}/answer`, answerInfo);

      toast.success('Pergunta respondida.');

      setVisible(false);

      loadHelpOrders();
    } catch (err) {
      toast.error('Erro ao responder pergunta, verifique os dados');
    }
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  return (
    <>
      <AnswerBox className="aswerBox" visible={visible}>
        <div>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{helpQuestion.question}</p>
          <div>
            <Input
              multiline
              type="text"
              name="answer"
              label="SUA RESPOSTA"
              placeholder="Digite aqui sua resposta"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </div>
          <button type="button" onClick={() => handleAnswer(helpQuestion.id)}>
            Responder aluno
          </button>
        </div>
      </AnswerBox>

      <Container visible={visible}>
        <span onClick={() => setVisible(false)} className="dimmer" />
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>

        <Content>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <tr>
                  <td>
                    {question.student ? (
                      question.student.name
                    ) : (
                      <span className="deleted">Aluno deletado</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleAnswerClick(question)}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Container>
    </>
  );
}
