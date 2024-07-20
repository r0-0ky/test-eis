import { useEffect } from 'react';
import { Table } from '../../../widgets/table';
import { useMeters } from '../../../widgets/table/lib/use-meters';
import { deleteMeter } from '../../../widgets/table/api/api';
import { MeterLogo } from '../../../shared/ui/meter-logo';
import { defaultColumnsTypes } from './types';
import { observer } from 'mobx-react-lite';
import { useStrore } from '../../../app/store';

export const TablePage = observer(() => {
  const { getMeters } = useMeters();
  const rootStore = useStrore();
  const defaultColumns: defaultColumnsTypes[] = [
    {
      header: 'Тип',
      cell: (cell) => <MeterLogo value={cell['_type'][0]} />,
    },
    {
      header: 'Дата установки',
      cell: (cell) =>
        new Date(Date.parse(cell['installation_date'])).toLocaleDateString(
          'ru-RU'
        ),
    },
    {
      header: 'Автоматический',
      cell: (cell) => (cell['is_automatic'] ? 'Да' : 'Нет'),
    },
    {
      header: 'Текущие показания',
      cell: (cell) => cell['initial_values'][0],
    },
    {
      header: 'Адрес',
      cell: (cell) =>
        `${cell.area.house.address}, ${cell.area.str_number_full}`,
    },
    {
      header: 'Примечание',
      cell: (cell) => (
        <span style={{ color: '#5E6674' }}>{cell['description']}</span>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    deleteMeter(id)
      .then(() => getMeters((rootStore.pagination.currentPage - 1) * 20))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getMeters((rootStore.pagination.currentPage - 1) * 20);
  }, [rootStore.pagination.currentPage]);

  return (
    <div>
      <Table
        handleDelete={handleDelete}
        defaultColumns={defaultColumns}
        title="Список счётчиков"
      />
    </div>
  );
});
