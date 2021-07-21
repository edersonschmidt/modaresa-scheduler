import { createRequest } from "../api";

const url = 'staffs';

const service = {
  
  getStaffList: async () =>
    createRequest()
      .get(`/${url}`)
      .then(({ data }) => data),

  getStaffById: async (id) =>
    createRequest()
      .get(`/${url}/${id}`)
      .then(({ data }) => data),

  postStaff: async (firstname, lastname, email) =>
    createRequest()
      .post(`/${url}/`, { firstname, lastname, email})
      .then(({ data }) => data),

  updateStaff: async (id, firstname, lastname, email) =>
    createRequest()
      .patch(`/${url}/${id}`, { firstname, lastname, email})
      .then(({ data }) => data),

  deleteStaff: async (id) =>
    createRequest()
      .delete(`/${url}/${id}`)
      .then(({ data }) => data),
}

export default service;
