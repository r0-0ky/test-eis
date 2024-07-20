import { TableProps } from './types';
import cn from 'classnames';
import classes from './styles.module.scss';
import { Pagination } from '../../../shared/ui/pagination';
import { DeleteButton } from '../../../shared/ui/delete-button';
import { observer } from 'mobx-react-lite';
import { useStrore } from '../../../app/store';

export const Table: React.FC<TableProps> = observer(
  ({ defaultColumns, title, handleDelete }) => {
    const rootStore = useStrore();

    return (
      <section className={cn(classes.wrapper)}>
        <h1 className={cn(classes.table__title)}>{title}</h1>
        <div className={cn(classes.table__wrapper)}>
          <table className={cn(classes.table)}>
            <thead>
              <tr>
                <th className={cn(classes['table__text-head'])}>№</th>
                {defaultColumns.map((column, index) => (
                  <th className={cn(classes['table__text-head'])} key={index}>
                    {column.header}
                  </th>
                ))}
                <th className={cn(classes['table__text-head'])}></th>
              </tr>
            </thead>
            <tbody>
              {rootStore.meters.results.map((row, index) => (
                <tr className={cn(classes['table__row'])} key={row.id}>
                  <td
                    className={cn(
                      classes.table__text,
                      classes['table__text-num']
                    )}
                  >
                    {index + 1 + 20 * (rootStore.pagination.currentPage - 1)}
                  </td>
                  {defaultColumns.map(
                    ({ cell }, index) =>
                      cell && (
                        <td className={cn(classes.table__text)} key={index}>
                          {cell(row)}
                        </td>
                      )
                  )}
                  <td className={cn(classes.table__text)}>
                    <DeleteButton handleClick={() => handleDelete(row.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cn(classes['table__pagination'])}>
          <Pagination
            activePage={rootStore.pagination.currentPage}
            totalPages={Math.ceil(rootStore.meters.count / 20)}
          />
        </div>
      </section>
    );
  }
);
