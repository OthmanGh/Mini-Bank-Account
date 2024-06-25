import { createStore } from 'redux';

const initialeState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialeState, action) {
  switch (action.type) {
    case 'account/deposite':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

const ACCOUNT_DEPOSITE = 'account/deposite';
const ACCOUNT_WITHDRAW = 'account/withdraw';
const ACCOUNT_REQUESTLOAN = 'account/requestLoan';
const ACCOUNT_PAYLOAN = 'account/payLoan';

// store.dispatch({ type: ACCOUNT_DEPOSITE, payload: 500 });
// store.dispatch({ type: ACCOUNT_WITHDRAW, payload: 200 });
// store.dispatch({
//   type: ACCOUNT_REQUESTLOAN,
//   payload: {
//     amount: 1000,
//     purpose: 'Buy new Laptop',
//   },
// });

// store.dispatch({
//   type: ACCOUNT_PAYLOAN,
// });

// Action Createers
function deposite(amount) {
  return {
    type: ACCOUNT_DEPOSITE,
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: ACCOUNT_WITHDRAW,
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_REQUESTLOAN,
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan() {
  return {
    type: ACCOUNT_PAYLOAN,
  };
}

store.dispatch(deposite(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(6000, 'Buy Car'));
store.dispatch(payLoan());

console.log(store.getState());
