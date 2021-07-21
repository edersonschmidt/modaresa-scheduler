import { createRequest } from "../api";

const url = 'clients';

const service = {
  
  getClientList: async () =>
    createRequest()
      .get(`/${url}`)
      .then(({ data }) => data),

  getClientById: async (id) =>
    createRequest()
      .get(`/${url}/${id}`)
      .then(({ data }) => data),

  postClient: async (name, email) =>
    createRequest()
      .post(`/${url}/`, { name, email})
      .then(({ data }) => data),

  updateClient: async (id, name, email) =>
    createRequest()
      .patch(`/${url}/${id}`, { name, email})
      .then(({ data }) => data),

  deleteClient: async (id) =>
    createRequest()
      .delete(`/${url}/${id}`)
      .then(({ data }) => data),
}

export default service;
