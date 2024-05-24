import React from 'react';
import Icons from '../../../public/sprite.svg';
import styles from './Icon.module.scss';

type Props = {
  id: string,
};

export const Icon: React.FC<Props> = ({id}) => {
  return (
    <svg className={styles.icon}>
      <use href={`${Icons}#icon-${id}`}/>
    </svg>
  );
};
