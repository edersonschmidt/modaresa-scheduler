import { createRequest } from "../api";

const url = 'appointments';

const service = {
  
  getAppointmentList: async () =>
    createRequest()
      .get(`/${url}`)
      .then(({ data }) => data),

  postAppointment: async (clientId, staffId, startTime, endTime, subject, description) =>
    createRequest()
      .post(`/${url}/`, { clientId, staffId, startTime, endTime, subject, description})
      .then(({ data }) => data),

  updateAppointment: async (id, clientId, staffId, startTime, endTime, subject, description) =>
    createRequest()
      .patch(`/${url}/${id}`, { clientId, staffId, startTime, endTime, subject, description})
      .then(({ data }) => data),

  deleteAppointment: async (id) =>
    createRequest()
      .delete(`/${url}/${id}`)
      .then(({ data }) => data),
}

export default service;
