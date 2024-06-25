const initialeState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialeState, action) {
  switch (action.type) {
    case 'account/deposite':
      return { ...state, balance: state.balance + action.payload };

    case 'account/widthdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };

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
