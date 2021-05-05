import { employerService } from 'src/services/employer.service';
import { employerConstants } from '../../constants/index';

// import { history } from '../../helpers/history';
import { showLoading, hideLoading } from 'react-redux-loading-bar'


const creatEmployer = (employer) => {
  return (dispatch) => {
    dispatch(showLoading('sectionBar'))
    dispatch(request(employer));
    
    employerService.createEmployer(employer).then(
      response => {
        dispatch(success(response.data));
        dispatch(hideLoading('sectionBar'))
        // history.push('/employer/' + employer.id);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(hideLoading('sectionBar'));
      }
    );
  };
};

const failure = (errorMessage) => {
  return {
    type: employerConstants.CREATE_EMPLOYER_FAILURE,
    payload: errorMessage,
  };
};

const success = (employer) => {
  return { 
    type: employerConstants.CREATE_EMPLOYER_SUCCESS,
    payload: employer
   };
};

const request = (employer) => {
  return {
     type: employerConstants.CREATE_EMPLOYER_REQUEST,
      payload: employer 
    };
};

export const employerActions = {
  creatEmployer,
};
