import service from "./service";

const CONTEXT = "@STAFF";

export const CREATE_STAFF = `${CONTEXT}/CREATE_STAFF`;
export const CREATE_STAFF_SUCCESS = `${CONTEXT}/CREATE_STAFF_SUCCESS`;
export const CREATE_STAFF_FAILED = `${CONTEXT}/CREATE_STAFF_FAILED`;

export const REMOVE_STAFF = `${CONTEXT}/REMOVE_STAFF`;
export const REMOVE_STAFF_SUCCESS = `${CONTEXT}/REMOVE_STAFF_SUCCESS`;
export const REMOVE_STAFF_FAILED = `${CONTEXT}/REMOVE_STAFF_FAILED`;

export const UPDATE_STAFF = `${CONTEXT}/UPDATE_STAFF`;
export const UPDATE_STAFF_SUCCESS = `${CONTEXT}/UPDATE_STAFF_SUCCESS`;
export const UPDATE_STAFF_FAILED = `${CONTEXT}/UPDATE_STAFF_FAILED`;

export const FETCH_STAFFS = `${CONTEXT}/FETCH_STAFFS`;
export const FETCH_STAFFS_SUCCESS = `${CONTEXT}/FETCH_STAFFS_SUCCESS`;
export const FETCH_STAFFS_FAILED = `${CONTEXT}/FETCH_STAFFS_FAILED`;

export const FETCH_STAFFS_ID = `${CONTEXT}/FETCH_STAFFS_ID`;
export const FETCH_STAFFS_ID_SUCCESS= `${CONTEXT}/FETCH_STAFFS_ID_SUCCESS`;
export const FETCH_STAFFS_ID_FAILED = `${CONTEXT}/FETCH_STAFFS_ID_FAILED`;

export const getStaffs = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STAFFS });

    const res = await service.getStaffList();
    const {data} = res;
    dispatch({
      type: FETCH_STAFFS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_STAFFS_FAILED,
      error: e.message,
    });
  }
};

export const getStaff = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_STAFFS_ID });

    const res = await service.getStaffById(id);
    dispatch({
      type: FETCH_STAFFS_ID_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: FETCH_STAFFS_FAILED });
  }
};

export const createStaff = ({firstname, lastname, email}) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STAFF });

    const res = await service.postStaff(firstname, lastname, email);
    dispatch({
      type: CREATE_STAFF_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: CREATE_STAFF_FAILED,
      error: e.message,
    });
  }
};

export const updateStaff = ({id, firstname, lastname, email}) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STAFF });

    const res = await service.updateStaff(id, firstname, lastname, email);
    dispatch({
      type: UPDATE_STAFF_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_STAFF_FAILED,
      error: e.message,
    });
  }
};

export const removeStaff = ({id}) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_STAFF });

    const res = await service.deleteStaff(id);
    dispatch({
      type: REMOVE_STAFF_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: REMOVE_STAFF_FAILED,
      error: e.message,
    });
  }
};
