import React, { useState } from 'react';
import styles from './StatusColumn.module.scss'
import { TaskStatus } from '../../services/ITask.ts';
import { TaskService } from '../../services/TaskService.ts';
import { useDispatch } from 'react-redux';
import { changeTaskStatus } from '../../reducers/taskSlice.ts';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode,
  title: string,
  targetStatus: TaskStatus,
};

export const StatusColumn: React.FC<Props> = ({children, title, targetStatus}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const dispatch = useDispatch();
  const handleOnDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
    event.preventDefault();
  };
  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(true);
    event.preventDefault();
  };
  const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    const task = JSON.parse(event.dataTransfer.getData('task'));
    const oldStatus = task.status;
    task.status = targetStatus;
    const res = await TaskService.updateTask(task.id, task);
    dispatch(changeTaskStatus({oldStatus, task: res}));
    setIsDragOver(false);
  };

  return (
    <div
      className={classNames(styles.column, {[styles.dragOver]: isDragOver})}
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
      onDragLeave={handleOnDragLeave}
    >
      <div className={styles.statusTitle}>{title}</div>
      {children}
    </div>
  );
};
