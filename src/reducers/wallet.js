import { CURRENCY, DELETE, SUBMIT_FORM, EDIT, NEW_EXPENSE, EXIBE_FORM } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  exibeForm: true,
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
  case NEW_EXPENSE:
    return { ...state,
      expenses: state.expenses
        .map((exp) => (exp.id === action.payload.id ? action.payload : exp)) };
  case EXIBE_FORM:
    return { ...state, exibeForm: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
