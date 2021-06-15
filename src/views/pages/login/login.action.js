import * as t from './login.types';
import { authService } from "../../../services/auth.service";
import {authHelpers} from "../../../utils/auth-helper";

export const authActions = {
  login
};

function login(data) {
  return dispatch => {
    dispatch(request(data));
    return authService.login(data).then(response => {
      authHelpers.setAccessToken(response.data && response.data.token ? response.data.token : '');
      authHelpers.setFreshToken(response.data && response.data.refreshToken ? response.data.refreshToken : '');
      dispatch(success());
    }).catch(error => {
      authHelpers.clearToken();
      dispatch(failure(error));
    });
  };

  function request() { return { type: t.LOGIN_REQUEST } }
  function success() { return { type: t.LOGIN_SUCCESS } }
  function failure(error) { return { type: t.LOGIN_FAILURE, error } }
}