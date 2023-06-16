import Api from ".";
import { DEFAULT_PAGE_SIZE } from "../helpers/constants";

const create = async (data) => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('teamId', data.teamId);

  if (data.photo && data.photo.file) {
    formData.append('photo', data.photo.file);
  }
  return Api.post('/api/players', formData, {
    'Content-Type': 'multipart/form-data',
  })
}

const list = async (filter = {}) => {
  filter.page = filter.page ? filter.page : 1;
  filter.perPage = filter.perPage ? filter.perPage : DEFAULT_PAGE_SIZE;
  filter.sortBy = filter.sortBy ?? 'id';
  filter.dir = filter.dir ?? 'DESC';

  return Api.get('/api/players', filter);
}

const retrieve = async (id) => {
  return Api.get(`/api/players/${id}`);
}

export const PlayerApi = {
  create,
  list,
  retrieve
}
