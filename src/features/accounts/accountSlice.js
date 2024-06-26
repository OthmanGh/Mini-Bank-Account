// const ACCOUNT_DEPOSITE = 'account/deposite';
// const ACCOUNT_WITHDRAW = 'account/withdraw';
// const ACCOUNT_REQUESTLOAN = 'account/requestLoan';
// const ACCOUNT_PAYLOAN = 'account/payLoan';
// const ACCOUNT_CONVERTINGCURRENCEY = 'account/convertingCurrency';

// const initialeStateAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: '',
//   isLoading: false,
// };

// export default function AccountReducer(state = initialeStateAccount, action) {
//   switch (action.type) {
//     case ACCOUNT_DEPOSITE:
//       return { ...state, balance: state.balance + action.payload, isLoading: false };

//     case ACCOUNT_WITHDRAW:
//       return { ...state, balance: state.balance - action.payload };

//     case ACCOUNT_REQUESTLOAN:
//       if (state.loan > 0) return state;
//       return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };

//     case ACCOUNT_PAYLOAN:
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };

//     case ACCOUNT_CONVERTINGCURRENCEY:
//       return {
//         ...state,
//         isLoading: true,
//       };

//     default:
//       return state;
//   }
// }

// export function deposite(amount, currency) {
//   if (currency === 'USD')
//     return {
//       type: ACCOUNT_DEPOSITE,
//       payload: amount,
//     };

//   return async function (dispatch, getState) {
//     dispatch({
//       type: ACCOUNT_CONVERTINGCURRENCEY,
//     });
//     // API CALL
//     const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

//     const data = await res.json();
//     const converted = data.rates.USD;

//     dispatch({
//       type: ACCOUNT_DEPOSITE,
//       payload: converted,
//     });
//     // return action
//   };
// }

// export function withdraw(amount) {
//   return {
//     type: ACCOUNT_WITHDRAW,
//     payload: amount,
//   };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: ACCOUNT_REQUESTLOAN,
//     payload: {
//       amount,
//       purpose,
//     },
//   };
// }

// export function payLoan() {
//   return {
//     type: ACCOUNT_PAYLOAN,
//   };
// }

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,

  reducers: {
    deposite(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },

    convert(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export function deposite(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposite',
      payload: amount,
    };

  return async function (dispatch) {
    dispatch({
      type: 'account/convert',
    });
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;

    dispatch({
      type: 'account/deposite',
      payload: converted,
    });
  };
}

export default accountSlice.reducer;
