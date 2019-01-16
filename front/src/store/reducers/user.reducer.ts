import {createReducer} from '../utils';
import {LoginUserSuccess, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from '../actions/user.actions';

export const USER_TOKEN = 'userToken';

export interface IUserState {
  userName: string;
  auth: boolean;
  mail: string;
  token: string;
  error: string;
}

const token = sessionStorage.getItem(USER_TOKEN) || null;

const initialState = {
  userName: null,
  auth: !!token,
  mail: null,
  token,
  error: null,
};

const setError = (state: IUserState, {payload: {error}}: any): IUserState => ({...state, error});

const setUserData = (state: IUserState, {payload:  {userName = null, mail = null, token = null, auth = false}}: LoginUserSuccess): IUserState => ({
  userName,
  auth,
  mail,
  token,
  error: ''
});

export const userReducer = createReducer({
  [USER_LOGIN_SUCCESS]: setUserData,
  [USER_LOGIN_FAIL]: setError,
}, initialState);

