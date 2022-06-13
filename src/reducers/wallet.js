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
      expenses: [...state.expenses.slice(0, action.payload.id),
        action.payload,
        ...state.expenses.slice(action.payload.id + 1)],
    //   forEach((s) => {
    //   if (s.id === action.payload.id) {
    //     return action.payload;
    //   }
    //   return s;
    // })
    };
    // [action.payload.id]: action.payload };
    // ...state.slice(0, action.payload.id)
    // ...action.payload,
    // ...state.slice(action.payload.id + 1) };
  case EXIBE_FORM:
    return { ...state, exibeForm: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
