import axios from "../axiosConfig";

export const getAll = () => axios.get('Cliente/');

export const getById = (id) => axios.get(`Cliente/${id}`);

export const post = (cliente) => axios.post('Cliente/', cliente);

export const put = (cliente) => axios.put(`Cliente/${cliente?.id}`, cliente);

export const remove = (id) => axios.delete(`Cliente/${id}`);