import { Instance, t } from 'mobx-state-tree';
import { MetersModel } from './models/MetersModel';
import { PaginationModel } from './models/PaginationModel';
const RootStore = t
  .model('RootStore', {
    meters: MetersModel,
    pagination: PaginationModel,
  })
  .actions((stroe) => ({
    setMeters(meters: Instance<typeof MetersModel>) {
      stroe.meters = meters;
    },
  }));

let rootStore: Instance<typeof RootStore>;

export const useStrore = () => {
  if (!rootStore) {
    rootStore = RootStore.create({
      meters: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
      pagination: {
        currentPage: 1,
      },
    });
  }
  return rootStore;
};
