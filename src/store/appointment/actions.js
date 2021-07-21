import service from "./service";

const CONTEXT = "@APPOINTMENT";

export const CREATE_APPOINTMENT = `${CONTEXT}/CREATE_APPOINTMENT`;
export const CREATE_APPOINTMENT_SUCCESS = `${CONTEXT}/CREATE_APPOINTMENT_SUCCESS`;
export const CREATE_APPOINTMENT_FAILED = `${CONTEXT}/CREATE_APPOINTMENT_FAILED`;

export const REMOVE_APPOINTMENT = `${CONTEXT}/REMOVE_APPOINTMENT`;
export const REMOVE_APPOINTMENT_SUCCESS = `${CONTEXT}/REMOVE_APPOINTMENT_SUCCESS`;
export const REMOVE_APPOINTMENT_FAILED = `${CONTEXT}/REMOVE_APPOINTMENT_FAILED`;

export const UPDATE_APPOINTMENT = `${CONTEXT}/UPDATE_APPOINTMENT`;
export const UPDATE_APPOINTMENT_SUCCESS = `${CONTEXT}/UPDATE_APPOINTMENT_SUCCESS`;
export const UPDATE_APPOINTMENT_FAILED = `${CONTEXT}/UPDATE_APPOINTMENT_FAILED`;

export const FETCH_APPOINTMENTS = `${CONTEXT}/FETCH_APPOINTMENTS`;
export const FETCH_APPOINTMENTS_SUCCESS = `${CONTEXT}/FETCH_APPOINTMENTS_SUCCESS`;
export const FETCH_APPOINTMENTS_FAILED = `${CONTEXT}/FETCH_APPOINTMENTS_FAILED`;

export const FETCH_APPOINTMENTS_ID = `${CONTEXT}/FETCH_APPOINTMENTS_ID`;
export const FETCH_APPOINTMENTS_ID_SUCCESS= `${CONTEXT}/FETCH_APPOINTMENTS_ID_SUCCESS`;
export const FETCH_APPOINTMENTS_ID_FAILED = `${CONTEXT}/FETCH_APPOINTMENTS_ID_FAILED`;

export const getAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_APPOINTMENTS });

    const res = await service.getAppointmentList();
    const {data} = res;
    dispatch({
      type: FETCH_APPOINTMENTS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_APPOINTMENTS_FAILED,
      error: e.message,
    });
  }
};

export const createAppointment = ({clientId, staffId, startTime, endTime, subject, description}) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_APPOINTMENT });

    // split it in another module or helper
    // TODO: CLEAN CODE
    const {isLuxonDateTime: isStartIsLuxon} = startTime;
    const startTimeMilli = (isStartIsLuxon && isStartIsLuxon === true) ? startTime.ts : startTime.getTime();

    const {isLuxonDateTime: isEndIsLuxon} = endTime;
    const endTimeMilli = (isEndIsLuxon && isEndIsLuxon === true) ? endTime.ts : endTime.getTime();

    const res = await service.postAppointment(clientId, staffId, startTimeMilli, endTimeMilli, subject, description);
    dispatch({
      type: CREATE_APPOINTMENT_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: CREATE_APPOINTMENT_FAILED,
      error: e.message,
    });
  }
};

export const updateAppointment = ({id, clientId, staffId, startTime, endTime, subject, description}) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_APPOINTMENT });

    // split it in another module or helper
    // TODO: CLEAN CODE
    const {isLuxonDateTime: isStartIsLuxon} = startTime;
    const startTimeMilli = (isStartIsLuxon && isStartIsLuxon === true) ? startTime.ts : startTime.getTime();

    const {isLuxonDateTime: isEndIsLuxon} = endTime;
    const endTimeMilli = (isEndIsLuxon && isEndIsLuxon === true) ? endTime.ts : endTime.getTime();

    const res = await service.updateAppointment(id, clientId, staffId, startTimeMilli, endTimeMilli, subject, description);
    dispatch({
      type: UPDATE_APPOINTMENT_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_APPOINTMENT_FAILED,
      error: e.message,
    });
  }
};

export const removeAppointment = ({id}) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_APPOINTMENT });

    const res = await service.deleteAppointment(id);
    dispatch({
      type: REMOVE_APPOINTMENT_SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: REMOVE_APPOINTMENT_FAILED,
      error: e.message,
    });
  }
};
