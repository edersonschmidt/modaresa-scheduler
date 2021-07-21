import service from "./service";

const CONTEXT = "@CLIENT";

export const CREATE_CLIENT = `${CONTEXT}/CREATE_CLIENT`;
export const CREATE_CLIENT_SUCCESS = `${CONTEXT}/CREATE_CLIENT_SUCCESS`;
export const CREATE_CLIENT_FAILED = `${CONTEXT}/CREATE_CLIENT_FAILED`;

export const REMOVE_CLIENT = `${CONTEXT}/REMOVE_CLIENT`;
export const REMOVE_CLIENT_SUCCESS = `${CONTEXT}/REMOVE_CLIENT_SUCCESS`;
export const REMOVE_CLIENT_FAILED = `${CONTEXT}/REMOVE_CLIENT_FAILED`;

export const UPDATE_CLIENT = `${CONTEXT}/UPDATE_CLIENT`;
export const UPDATE_CLIENT_SUCCESS = `${CONTEXT}/UPDATE_CLIENT_SUCCESS`;
export const UPDATE_CLIENT_FAILED = `${CONTEXT}/UPDATE_CLIENT_FAILED`;

export const FETCH_CLIENTS = `${CONTEXT}/FETCH_CLIENTS`;
export const FETCH_CLIENTS_SUCCESS = `${CONTEXT}/FETCH_CLIENTS_SUCCESS`;
export const FETCH_CLIENTS_FAILED = `${CONTEXT}/FETCH_CLIENTS_FAILED`;

export const FETCH_CLIENTS_ID = `${CONTEXT}/FETCH_CLIENTS_ID`;
export const FETCH_CLIENTS_ID_SUCCESS= `${CONTEXT}/FETCH_CLIENTS_ID_SUCCESS`;
export const FETCH_CLIENTS_ID_FAILED = `${CONTEXT}/FETCH_CLIENTS_ID_FAILED`;

export const getClients = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLIENTS });

    const res = await service.getClientList();
    const {data} = res;
    dispatch({
      type: FETCH_CLIENTS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_CLIENTS_FAILED,
      error: e.message,
    });
  }
};

export const getClient = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CLIENTS_ID });

    const res = await service.getClientById(id);
    dispatch({
      type: FETCH_CLIENTS_ID_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: FETCH_CLIENTS_FAILED });
  }
};

export const createClient = ({name, email}) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CLIENT });

    const res = await service.postClient(name, email);
    dispatch({
      type: CREATE_CLIENT_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: CREATE_CLIENT_FAILED,
      error: e.message,
    });
  }
};

export const updateClient = ({id, name, email}) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CLIENT });

    const res = await service.updateClient(id, name, email);
    dispatch({
      type: UPDATE_CLIENT_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_CLIENT_FAILED,
      error: e.message,
    });
  }
};

export const removeClient = ({id}) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CLIENT });

    const res = await service.deleteClient(id);
    dispatch({
      type: REMOVE_CLIENT_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: REMOVE_CLIENT_FAILED,
      error: e.message,
    });
  }
};
