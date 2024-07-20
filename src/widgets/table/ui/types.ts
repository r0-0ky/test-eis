import { defaultColumnsTypes } from '../../../pages/table-page/ui/types';

export interface TableProps {
  defaultColumns: defaultColumnsTypes[];
  title: string;
  handleDelete: (id: string) => void;
}
