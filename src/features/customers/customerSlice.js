// const CUSTOMER_CREATE = 'customer/createCustomer';
// const CUSTOMER_UPDATENAME = 'customer/updateName';

// const initialStateCustomer = {
//   fullName: '',
//   nationalID: '',
//   createdAt: '',
// };

// export default function CustomerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case CUSTOMER_CREATE:
//       return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };

//     case CUSTOMER_UPDATENAME:
//       return {
//         ...state,
//         fullName: action.payload,
//       };

//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: CUSTOMER_CREATE,
//     payload: {
//       fullName,
//       nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return {
//     type: CUSTOMER_UPDATENAME,
//     payload: fullName,
//   };
// }

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const customerSlice = createSlice({
  name: 'customer',

  initialState,

  reducers: {
    updateName(state, action) {
      state.fullName = action.payload;
    },

    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.createdAt = action.payload.createdAt;
        state.nationalID = action.payload.nationalID;
      },
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
