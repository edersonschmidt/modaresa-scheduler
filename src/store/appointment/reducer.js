import {
  FETCH_APPOINTMENTS,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILED,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILED,
  UPDATE_APPOINTMENT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILED,
  REMOVE_APPOINTMENT,
  REMOVE_APPOINTMENT_SUCCESS,
  REMOVE_APPOINTMENT_FAILED
} from "./actions";

const initialState = {
  list: [],
  loading: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
  error: {
    server: '',
    message: ''
  }
};

const reducer = (state = initialState, action) => {
  const { payload, type, error } = action;

  switch (type) {
    case FETCH_APPOINTMENTS:
      return {
        loading: true,
        error: {
          ...state.error,
          message: ''
        },
      };
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
        successCreate: initialState.successCreate,
        successUpdate: initialState.successUpdate,
        successDelete: initialState.successDelete
      };
    case FETCH_APPOINTMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case CREATE_APPOINTMENT:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successCreate: true
      };
    case CREATE_APPOINTMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successUpdate: true
      };
    case UPDATE_APPOINTMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case REMOVE_APPOINTMENT:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case REMOVE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successDelete: true
      };
    case REMOVE_APPOINTMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    default:
      return state;
  }
};

export default reducer;
