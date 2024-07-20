'use client';

import { typePaginationProps } from './types';
import classes from './styles.module.scss';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { useStrore } from '../../../app/store';
import { observer } from 'mobx-react-lite';

export const Pagination: React.FC<typePaginationProps> = observer((props) => {
  const { activePage, totalPages } = props;
  const rootStore = useStrore();

  const handleChangeActivePage = (
    evt: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const item = Number(evt.currentTarget.textContent);
    rootStore.pagination.setCurrentPage(item);
    if (item == rootStore.pagination.visiblePages[0] && item != 1) {
      rootStore.pagination.setVisiblePages(
        rootStore.pagination.pagesArray.slice(item - 2, item + 1)
      );
    } else if (
      item ==
        rootStore.pagination.visiblePages[
          rootStore.pagination.visiblePages.length - 1
        ] &&
      item !== totalPages
    ) {
      rootStore.pagination.setVisiblePages(
        rootStore.pagination.pagesArray.slice(item - 2, item + 1)
      );
    }
  };

  const handleClickLastPage = (): void => {
    rootStore.pagination.setCurrentPage(totalPages);
    rootStore.pagination.setVisiblePages(
      rootStore.pagination.pagesArray.slice(totalPages - 3)
    );
  };

  const handleClickFirstPage = (): void => {
    rootStore.pagination.setCurrentPage(1);
    rootStore.pagination.setVisiblePages(
      rootStore.pagination.pagesArray.slice(0, 3)
    );
  };

  useEffect(() => {
    rootStore.pagination.setPagesArray(
      Array(totalPages)
        .fill(1)
        .map((_, i) => i + 1)
    );
    handleClickFirstPage();
    rootStore.pagination.setVisiblePages(
      Array(totalPages)
        .fill(1)
        .map((_, i) => i + 1)
        .slice(0, 3)
    );
  }, [totalPages]);

  useEffect(() => {
    if (activePage === 1) {
      rootStore.pagination.setVisiblePages(
        rootStore.pagination.pagesArray.slice(0, activePage + 2)
      );
    } else if (activePage === totalPages) {
      rootStore.pagination.setVisiblePages(
        rootStore.pagination.pagesArray.slice(totalPages - 3, totalPages + 1)
      );
    } else {
      rootStore.pagination.setVisiblePages(
        rootStore.pagination.pagesArray.slice(activePage - 2, activePage + 1)
      );
    }
  }, [activePage]);

  return (
    <div className={cn(classes['pagination'])}>
      <div className={cn(classes['pagination__wrapper'])}>
        {rootStore.pagination.visiblePages[0] != 1 && (
          <button
            onClick={handleClickFirstPage}
            className={cn(classes['pagination__number-button'])}
          >
            {1}
          </button>
        )}
        {rootStore.pagination.visiblePages[0] != 1 && (
          <span className={cn(classes['pagination__ellipsis'])}>...</span>
        )}
        {rootStore.pagination.visiblePages.map((item, index) => (
          <button
            onClick={handleChangeActivePage}
            key={index}
            className={cn(
              classes['pagination__number-button'],
              item === activePage && classes['pagination__number-button_active']
            )}
          >
            {item}
          </button>
        ))}
        {rootStore.pagination.visiblePages[
          rootStore.pagination.visiblePages.length - 1
        ] != totalPages && (
          <span className={cn(classes['pagination__ellipsis'])}>...</span>
        )}
        {rootStore.pagination.visiblePages[
          rootStore.pagination.visiblePages.length - 1
        ] != totalPages && (
          <button
            onClick={handleClickLastPage}
            className={cn(classes['pagination__number-button'])}
          >
            {totalPages}
          </button>
        )}
      </div>
    </div>
  );
});
