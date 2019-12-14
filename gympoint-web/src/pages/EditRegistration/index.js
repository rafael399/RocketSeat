import React from 'react';
import PropTypes from 'prop-types';

import RegistrationInfo from '~/components/RegistrationInfo';

export default function EditRegistration({ location }) {
  return (
    <RegistrationInfo
      title="Edição de matrícula"
      from="edit"
      registration={location.state.registration}
    />
  );
}

EditRegistration.propTypes = {
  location: PropTypes.element.isRequired,
};
