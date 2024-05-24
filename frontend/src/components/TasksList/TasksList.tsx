import React, { ReactNode } from 'react';
import styles from './TasksList.module.scss';

type Props = {
  children: ReactNode,
};

export const TasksList: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.tasksContainer}>
      {children}
    </div>
  );
};
