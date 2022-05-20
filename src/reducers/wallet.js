import { CURRENCY, SUBMIT_FORM } from '../actions';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: [...action.payload] };
  case SUBMIT_FORM:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
