import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_FAILED,
  FETCH_CLIENTS_ID,
  FETCH_CLIENTS_ID_SUCCESS,
  FETCH_CLIENTS_ID_FAILED,
  CREATE_CLIENT,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAILED,
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILED,
  REMOVE_CLIENT,
  REMOVE_CLIENT_SUCCESS,
  REMOVE_CLIENT_FAILED
} from "./actions";

const initialState = {
  list: [],
  client: null,
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
    case FETCH_CLIENTS:
      return {
        loading: true,
        error: {
          ...state.error,
          message: ''
        },
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
        successCreate: initialState.successCreate,
        successUpdate: initialState.successUpdate,
        successDelete: initialState.successDelete
      };
    case FETCH_CLIENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case FETCH_CLIENTS_ID:
      return {
        loading: true,
        error: {
          ...state.error,
          message: ''
        },
      };
    case FETCH_CLIENTS_ID_SUCCESS:
      return {
        ...state,
        client: payload,
        loading: false,
      };
    case FETCH_CLIENTS_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case CREATE_CLIENT:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successCreate: true
      };
    case CREATE_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successUpdate: true
      };
    case UPDATE_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          message: 'Something wrong happens, try again!',
          server: error
        }
      };
    case REMOVE_CLIENT:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          message: ''
        }
      };
    case REMOVE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        successDelete: true
      };
    case REMOVE_CLIENT_FAILED:
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
