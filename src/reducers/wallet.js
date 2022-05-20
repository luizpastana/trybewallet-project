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
    return { ...state, wallet: { ...state.wallet, currencies: action.payload } };
  case SUBMIT_FORM:
    // const id = state.wallet.expenses.length;
    // const expense = [action.payload, id]
    return { ...state, wallet: { ...state.wallet, expenses: action.payload } };
  default:
    return state;
  }
};

export default walletReducer;
