import classes from './styles.module.scss';
import cn from 'classnames';
import { isHoveredProps } from './types';

export const DeleteButton: React.FC<isHoveredProps> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={cn(classes['delete-button'])}
    ></button>
  );
};
