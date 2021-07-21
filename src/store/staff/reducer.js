import {
  FETCH_STAFFS,
  FETCH_STAFFS_SUCCESS,
  FETCH_STAFFS_FAILED,
  FETCH_STAFFS_ID,
  FETCH_STAFFS_ID_SUCCESS,
  FETCH_STAFFS_ID_FAILED,
  CREATE_STAFF,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILED,
  UPDATE_STAFF,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAILED,
  REMOVE_STAFF,
  REMOVE_STAFF_SUCCESS,
  REMOVE_STAFF_FAILED
} from "./actions";

const initialState = {
  list: [],
  staff: null,
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
    case FETCH_STAFFS:
      return {
        loading: true,
        error: {
          ...state.error,
          message: ''
        },
      };
    case FETCH_STAFFS_SUCCESS:
      return {
        ...state,
        list: payload, //[...state.list, payload],
        loading: false,
        successCreate: initialState.successCreate,
        successUpdate: initialState.successUpdate,
        successDelete: initialState.successDelete
      };
    case FETCH_STAFFS_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case FETCH_STAFFS_ID:
      return {
        loading: true,
        error: {
          ...state.error,
          message: ''
        },
      };
    case FETCH_STAFFS_ID_SUCCESS:
      return {
        ...state,
        staff: payload,
        loading: false,
      };
    case FETCH_STAFFS_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case CREATE_STAFF:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case CREATE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        successCreate: true
      };
    case CREATE_STAFF_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case UPDATE_STAFF:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        successUpdate: true
      };
    case UPDATE_STAFF_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case REMOVE_STAFF:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case REMOVE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        successDelete: true
      };
    case REMOVE_STAFF_FAILED:
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
