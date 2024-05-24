import React from 'react';
import { Icon } from '../../Icon/Icon.tsx';
import styles from './SaveButton.module.scss';

type Props = {
  onClick?: (event: React.MouseEvent) => void,
};

export const SaveButton: React.FC<Props> = ({onClick}) => {
  return (
    <button className={styles.iconBtn} onClick={onClick}>
      <Icon id="done"/>
    </button>
  );
};
