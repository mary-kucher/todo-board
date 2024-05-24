import React, { useState } from 'react';
import styles from './Board.module.scss';
import { ModalWindow } from '../ModalWindow/ModalWindow.tsx';
import { AddTaskModal } from '../AddTaskModal/AddTaskModal.tsx';
import { TasksList } from '../TasksList/TasksList.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { Task } from '../Task/Task.tsx';
import { StatusColumn } from '../StatusColumn/StatusColumn.tsx';
import { TaskStatus } from '../../services/ITask.ts';

export const Board: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const {TODO, IN_PROGRESS, DONE} = useAppSelector(state => state.tasks);

  const closeModal = () => {
    setIsHideModal(true);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setIsHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpenModal(!isOpenModal);
  }

  return (
    <div className={styles.container}>
      <StatusColumn title='To Do' targetStatus={TaskStatus.TODO}>
        <TasksList>
          {TODO.map((task) => (
            <Task key={task.id} task={task}/>
          ))}
        </TasksList>
        <button
          className={styles.addTaskBtn}
          onClick={handleOpenModal}
        >
          Add Task
        </button>
      </StatusColumn>
      <StatusColumn title='In Progress' targetStatus={TaskStatus.IN_PROGRESS}>
        <TasksList>
          {IN_PROGRESS.map((task) => (
            <Task key={task.id} task={task}/>
          ))}
        </TasksList>
      </StatusColumn>
      <StatusColumn title="Done" targetStatus={TaskStatus.DONE}>
        <TasksList>
          {DONE.map((task) => (
            <Task key={task.id} task={task}/>
          ))}
        </TasksList>
      </StatusColumn>
      {isOpenModal && (
        <ModalWindow closeModal={closeModal} isHideModal={isHideModal}>
          <AddTaskModal closeModal={closeModal}/>
        </ModalWindow>
      )}
    </div>
  );
};
