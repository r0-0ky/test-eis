import { Instance, t } from 'mobx-state-tree';

const HouseModel = t.model('House', {
  address: t.string,
});

const AreasModel = t.model('Area', {
  id: t.string,
  str_number_full: t.string,
  house: HouseModel,
});

const ResultsModel = t.model('Results', {
  id: t.string,
  _type: t.array(t.string),
  is_automatic: t.maybeNull(t.boolean),
  description: t.maybeNull(t.string),
  installation_date: t.string,
  initial_values: t.array(t.number),
  area: AreasModel,
});

export const MetersModel = t.model('Meter', {
  count: t.number,
  next: t.maybeNull(t.string),
  previous: t.maybeNull(t.string),
  results: t.array(ResultsModel),
});

export type ResultModelType = Instance<typeof ResultsModel>;
