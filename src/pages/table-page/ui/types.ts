import { ResultModelType } from '../../../app/store/models/MetersModel';

export interface defaultColumnsTypes {
  header: string;
  cell: (cell: ResultModelType) => JSX.Element | string | number;
}
