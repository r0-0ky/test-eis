import { useEffect } from 'react';
import { fetchAreas, fetchMeters } from '../api/api';
import { useStrore } from '../../../app/store';
import { ResultModelType } from '../../../app/store/models/MetersModel';

export const useMeters = () => {
  const { setMeters } = useStrore();

  const getMeters = (offset = 0) => {
    fetchMeters(offset)
      .then((meters) => {
        Promise.all(
          meters.data.results.map((item: ResultModelType) => {
            const areas = localStorage.getItem('savedAreas');
            if (areas !== null) {
              const req = JSON.parse(areas);
              if (item.area.id in req) {
                return Promise.resolve(req[item.area.id]);
              } else {
                fetchAreas(item.area.id).then((res) => {
                  req[item.area.id] = res;
                  localStorage.setItem('savedAreas', JSON.stringify(req));
                });
                return fetchAreas(item.area.id);
              }
            }
          })
        ).then((res) => {
          meters.data.results = meters.data.results.map(
            (item: ResultModelType, index: number) =>
              Object.assign(item, { area: res[index].data.results[0] })
          );
          setMeters(meters.data);
        });
      })
      .catch(() => console.log('Error fetching users'));
  };

  useEffect(() => {
    if (!localStorage.getItem('savedAreas')) {
      localStorage.setItem('savedAreas', JSON.stringify({}));
    }
  }, []);

  return { getMeters };
};
