import { EMAIL_LOGIN } from '../actions';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReducer;
