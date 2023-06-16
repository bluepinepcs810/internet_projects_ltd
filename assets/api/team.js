import Api from ".";
import { DEFAULT_PAGE_SIZE } from "../helpers/constants";

const create = async (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('country', data.country);
  formData.append('money', data.money);

  if (data.logo && data.logo.file) {
    formData.append('logo', data.logo.file);
  }
  return Api.post('/api/teams', formData, {
    'Content-Type': 'multipart/form-data',
  })
}

const update = async (id, data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('country', data.country);
  formData.append('money', data.money);

  if (data.logo && data.logo.file) {
    formData.append('logo', data.logo.file);
  }
  return Api.post(`/api/teams/${id}`, data, {
    'Content-Type': 'multipart/form-data',
  });
}

const list = async (filter = {}) => {
  filter.page = filter.page ? filter.page : 1;
  filter.perPage = filter.perPage ? filter.perPage : DEFAULT_PAGE_SIZE;
  filter.sortBy = filter.sortBy ?? 'id';
  filter.dir = filter.dir ?? 'DESC';

  return Api.get('/api/teams', filter);
}

const retrieve = async (id) => {
  return Api.get(`/api/teams/${id}`);
}


const buy = async (teamId, playerId, amount) => {
  const formData = new FormData();
  formData.append('amount', amount)
  return Api.post(`/api/teams/${teamId}/buy/players/${playerId}`, formData, {
    'Content-Type': 'multipart/form-data',
  });
}
export const TeamApi = {
  create,
  list,
  update,
  retrieve,
  buy
}
