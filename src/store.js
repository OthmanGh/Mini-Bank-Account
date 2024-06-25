import { combineReducers, createStore } from 'redux';

const ACCOUNT_DEPOSITE = 'account/deposite';
const ACCOUNT_WITHDRAW = 'account/withdraw';
const ACCOUNT_REQUESTLOAN = 'account/requestLoan';
const ACCOUNT_PAYLOAN = 'account/payLoan';
const CUSTOMER_CREATE = 'customer/createCustomer';
const CUSTOMER_UPDATENAME = 'customer/updateName';

const initialeStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function AccountReducer(state = initialeStateAccount, action) {
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

function CustomerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case CUSTOMER_CREATE:
      return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };

    case CUSTOMER_UPDATENAME:
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});

// Creating Store
const store = createStore(rootReducer);

// Action Createers
// * Account
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

// * Customer:
function createCustomer(fullName, nationalID) {
  return {
    type: CUSTOMER_CREATE,
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: CUSTOMER_UPDATENAME,
    payload: fullName,
  };
}

///
store.dispatch(deposite(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(6000, 'Buy Car'));
store.dispatch(payLoan());

store.dispatch(createCustomer('Othman Al Ghandour', 2321321));
store.dispatch(updateName('Ali'));
store.dispatch(deposite(300));

console.log(store.getState());
