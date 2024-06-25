const ACCOUNT_DEPOSITE = 'account/deposite';
const ACCOUNT_WITHDRAW = 'account/withdraw';
const ACCOUNT_REQUESTLOAN = 'account/requestLoan';
const ACCOUNT_PAYLOAN = 'account/payLoan';

const initialeStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

export default function AccountReducer(state = initialeStateAccount, action) {
  switch (action.type) {
    case ACCOUNT_DEPOSITE:
      return { ...state, balance: state.balance + action.payload };

    case ACCOUNT_WITHDRAW:
      return { ...state, balance: state.balance - action.payload };

    case ACCOUNT_REQUESTLOAN:
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };

    case ACCOUNT_PAYLOAN:
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

export function deposite(amount) {
  return {
    type: ACCOUNT_DEPOSITE,
    payload: amount,
  };
}

export function withdraw(amount) {
  return {
    type: ACCOUNT_WITHDRAW,
    payload: amount,
  };
}

export function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_REQUESTLOAN,
    payload: {
      amount,
      purpose,
    },
  };
}

export function payLoan() {
  return {
    type: ACCOUNT_PAYLOAN,
  };
}
