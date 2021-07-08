import { Reducer } from 'redux';

import { USER_ROLE } from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';
import { DispatchAction } from '@redux/actions/userRoleAction';

const initialState: InitialState['userRole'] = {
  role: '',
};

const userRoleReducer: Reducer<InitialState['userRole'], DispatchAction> = (
  state = initialState,
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ROLE:
      return {
        ...state,
        role: payload.role,
      };
    default:
      return state;
  }
};

export default userRoleReducer;
