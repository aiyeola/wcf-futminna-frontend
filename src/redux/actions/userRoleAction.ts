import { Action, Dispatch } from 'redux';
import axios from 'axios';

import { USER_ROLE } from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';
import { configOptions } from '@config/index';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface DispatchAction extends Action {
  type: string;
  payload: Partial<InitialState['userRole']>;
}

const userRole = (payload: InitialState['userRole']): DispatchAction => ({
  type: USER_ROLE,
  payload,
});

const getUserRole =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${API_URL}/check-user`,
        configOptions(),
      );
      const role = data.data.userRole;
      localStorage.setItem('username', data.data.username);
      dispatch(userRole({ role }));
    } catch (error) {
      if (error.response) {
        //
      }
    }
  };

export default getUserRole;
