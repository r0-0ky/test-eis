import { instance } from '../../../shared/api/instance';

export const fetchMeters = (offset = 0) =>
  instance.get('/meters', {
    params: {
      limit: 20,
      offset,
    },
  });

export const fetchAreas = (id: string) =>
  instance.get('/areas', {
    params: {
      id__in: id,
    },
  });

export const deleteMeter = (id: string) => instance.delete(`/meters/${id}`);
