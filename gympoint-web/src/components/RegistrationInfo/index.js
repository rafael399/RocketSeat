/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { parseISO, endOfDay, startOfDay, addMonths } from 'date-fns';

import { MdSave, MdArrowBack } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, Content, Students } from './styles';

const schema = Yup.object().shape({
  studentName: Yup.string().required('O aluno é obrigatório'),
  plan: Yup.string().required('O plano é obrigatório'),
  startDate: Yup.string().required('A data de início é obrigatória'),
});

export default function RegistrationInfo({ title, from, registration }) {
  // const dispatch = useDispatch();
  const fromEdit = from === 'edit';

  function formatDate(date) {
    return parseISO(date)
      .toISOString()
      .substr(0, 10);
  }

  const [showStudentList, setShowStudentList] = useState(false);

  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(
    fromEdit ? registration.student : null
  );
  const [searchName, setSearchName] = useState(
    fromEdit && student ? student.name : ''
  );

  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(fromEdit ? registration.plan : null);

  const [startDate, setStartDate] = useState(
    fromEdit
      ? formatDate(registration.start_date)
      : new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState(
    fromEdit ? formatDate(registration.end_date) : startDate
  );

  const [totalPrice, setTotalPrice] = useState(
    fromEdit && plan ? plan.duration * plan.price : 0
  );

  async function handleSubmit() {
    const data = {
      id: registration ? registration.id : null,
      student_id: student.id,
      plan_id: plan.id,
      start_date: startOfDay(parseISO(startDate))
        .toISOString()
        .substr(0, 10),
    };

    if (from === 'edit') {
      try {
        try {
          const newInfo = {
            student_id: data.student_id,
            plan_id: data.plan_id,
            start_date: data.start_date,
          };

          await api.put(`registration/${data.id}`, newInfo);

          toast.success('Matrícula atualizada com sucesso.');
        } catch (err) {
          toast.error('Erro na atualização da matrícula, verifique os dados');
        }
      } catch (err) {
        toast.error('Erro na atualização do cadastro, verifique os dados');
      }
    } else if (from === 'newRegistration') {
      try {
        const newRegistration = {
          student_id: data.student_id,
          plan_id: data.plan_id,
          start_date: data.start_date,
        };

        await api.post('registration', newRegistration);

        toast.success('Matrícula efetuada com sucesso.');
      } catch (err) {
        toast.error('Erro no cadastro, verifique os dados');
        toast.error('Verifique se a data de início já passou');
        toast.error(
          'Verifique se o usuário já tem matrícula ativa ou a ser ativada'
        );
      }
    }
  }

  function handleStudentSelect(s) {
    setStudent(s);
    setShowStudentList(false);
  }

  function handleChangePlan(e) {
    setPlan(plans.find(p => p.id === parseInt(e.target.value, 10)));
  }

  async function loadStudents(name) {
    const response =
      name === ''
        ? await api.get('/students')
        : await api.get(`/students/?q=${name}`);

    setStudents(response.data);
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plan');

      setPlans(response.data);
    }

    loadPlans();
    loadStudents();
  }, []);

  useEffect(() => {
    setTotalPrice(plan ? plan.duration * plan.price : 0);
    if (startDate !== null && plan !== null) {
      const formatedStart = endOfDay(parseISO(startDate));
      const formatedEnd = endOfDay(addMonths(formatedStart, plan.duration))
        .toISOString()
        .substr(0, 10);

      setEndDate(formatedEnd);
    }
  }, [plan, startDate]);

  useEffect(() => {
    if (student === null || searchName !== student.name)
      setShowStudentList(true);
    loadStudents(searchName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  useEffect(() => {
    if (student) setSearchName(student.name);
  }, [student]);

  return (
    <Container>
      <header>
        <h1>{title}</h1>

        <span>
          <Link to="/registration">
            <MdArrowBack size={22} color="#fff" />
            <span>VOLTAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          initialData={from === 'edit' ? registration : null}
        >
          <Input
            name="studentName"
            label="ALUNO"
            placeholder="Buscar aluno"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
          <Students visible={showStudentList}>
            {students.map(s => (
              <button
                className="student"
                type="button"
                onClick={() => handleStudentSelect(s)}
                key={s.id}
              >
                {s.name}
              </button>
            ))}
          </Students>
          <div>
            <div>
              <Select
                name="plan"
                label="PLANO"
                options={plans}
                select={plan}
                onChange={e => handleChangePlan(e)}
                placeholder="Selecione o plano"
              />
            </div>
            <div>
              <Input
                name="startDate"
                type="date"
                label="DATA DE INÍCIO"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                placeholder="Escolha a data"
              />
            </div>
            <div>
              <Input
                name="endDate"
                type="date"
                label="DATA DE TÉRMINO"
                value={endDate}
                disabled
              />
            </div>
            <div>
              <Input
                name="totalPrice"
                type="number"
                step="0.01"
                label="VALOR FINAL"
                value={totalPrice}
                disabled
              />
            </div>
          </div>

          <button type="submit">
            <MdSave size={22} color="#fff" />
            <div>SALVAR</div>
          </button>
        </Form>
      </Content>
    </Container>
  );
}

RegistrationInfo.propTypes = {
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  registration: PropTypes.element,
};

RegistrationInfo.defaultProps = {
  registration: null,
};
