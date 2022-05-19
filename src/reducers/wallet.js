import { CURRENCY } from '../actions';

const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case CURRENCY:
    return { ...state, ...state.wallet, currencies: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
