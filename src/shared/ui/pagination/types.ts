import { InputHTMLAttributes, DetailedHTMLProps } from 'react';

export interface typePaginationProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  activePage: number;
  totalPages: number;
}
