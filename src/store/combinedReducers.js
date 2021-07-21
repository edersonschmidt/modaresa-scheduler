import staffReducer from "./staff/reducer";
import clientReducer from "./client/reducer";
import appointmentReducer from "./appointment/reducer";

import { combineReducers } from "redux";

export default combineReducers({
  staff: staffReducer,
  client: clientReducer,
  appointment: appointmentReducer
});
