import { MeterLogoProps } from './types';
import classes from './styles.module.scss';
import cn from 'classnames';

export const MeterLogo: React.FC<MeterLogoProps> = ({ value }) => {
  return (
    <>
      {value === 'ColdWaterAreaMeter' ? (
        <p className={cn(classes['meter-logo_cold'])}>ХВС</p>
      ) : value === 'HotWaterAreaMeter' ? (
        <p className={cn(classes['meter-logo_hot'])}>ГВС</p>
      ) : (
        ''
      )}
    </>
  );
};
