import React from 'react';
import PropTypes from 'prop-types';

import StudentInfo from '~/components/StudentInfo';

export default function EditStudent({ location }) {
  console.tron.log(location);
  return (
    <StudentInfo
      title="Edição de aluno"
      from="edit"
      student={location.state.student}
    />
  );
}

EditStudent.propTypes = {
  location: PropTypes.element.isRequired,
};
