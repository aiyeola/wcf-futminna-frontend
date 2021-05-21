import { Action, Dispatch } from 'redux';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
} from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';

export interface DispatchAction extends Action {
  type: string;
  payload: Partial<InitialState['logIn']>;
}

export const loginSuccess = (
  payload: InitialState['logIn'],
): DispatchAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (
  payload: InitialState['logIn'],
): DispatchAction => ({
  type: LOGIN_FAILURE,
  payload,
});

export const localAuth =
  (payload) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginSuccess(payload));
    } catch (error) {
      if (error.response) {
        dispatch(loginFailure(error.response.data));
      }
    }
  };

export const resetLoginState = () => (dispatch: Dispatch) =>
  dispatch({
    type: LOGIN_RESET,
  });
