const CUSTOMER_CREATE = 'customer/createCustomer';
const CUSTOMER_UPDATENAME = 'customer/updateName';

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

export default function CustomerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationalID) {
  return {
    type: CUSTOMER_CREATE,
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: CUSTOMER_UPDATENAME,
    payload: fullName,
  };
}
