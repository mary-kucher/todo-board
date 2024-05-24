import React from 'react';
import Icons from '/sprite.svg';
import styles from './Icon.module.scss';

type Props = {
  id: string,
};

export const Icon: React.FC<Props> = ({id}) => {
  return (
    <svg className={styles.icon}>
      <use xlinkHref={`${Icons}#icon-${id}`}/>
    </svg>
  );
};
