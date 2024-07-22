import { t } from 'mobx-state-tree';

export const PaginationModel = t
  .model('Pagination', {
    currentPage: t.number,
    pagesArray: t.array(t.number),
    visiblePages: t.array(t.number),
  })
  .actions((stroe) => ({
    setCurrentPage(currentPage: number) {
      stroe.currentPage = currentPage;
    },
    setPagesArray(pagesArray: number[]) {
      stroe.pagesArray.replace(pagesArray);
    },
    setVisiblePages(visiblePages: number[]) {
      stroe.visiblePages.replace(visiblePages);
    },
  }));
