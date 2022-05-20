import { EMAIL_LOGIN } from '../actions';

const initialState = {
  user: {
    email: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return { ...state, user: { ...state.user, email: action.payload } };
  default:
    return state;
  }
};

export default userReducer;
