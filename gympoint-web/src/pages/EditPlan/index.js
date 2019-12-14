import React from 'react';
import PropTypes from 'prop-types';

import PlanInfo from '~/components/PlanInfo';

export default function EditPlan({ location }) {
  return (
    <PlanInfo title="Edição de plano" from="edit" plan={location.state.plan} />
  );
}

EditPlan.propTypes = {
  location: PropTypes.element.isRequired,
};
