import { CURRENCY, DELETE, SUBMIT_FORM, EDIT } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: [...state.currencies, ...action.payload] };
  case SUBMIT_FORM:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE:
    return { ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload) };
  case EDIT:
    return { ...state, edit: state.expenses[action.payload] };
  default:
    return state;
  }
};

export default walletReducer;
