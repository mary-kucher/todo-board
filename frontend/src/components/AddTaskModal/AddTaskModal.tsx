import React, { FormEvent, useState } from 'react';
import styles from './AddTaskModal.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { TaskService } from '../../services/TaskService.ts';
import ITask, { TaskStatus } from '../../services/ITask.ts';
import { createTask } from '../../reducers/taskSlice.ts';

type Props = {
  closeModal: () => void;
};

export const AddTaskModal: React.FC<Props> = ({closeModal}) => {
  const {id} = useAppSelector((state) => state.board);
  const [taskData, setTaskData] = useState<ITask>({
    boardId: id,
    id: '',
    title: '',
    description: '',
    status: TaskStatus.TODO,
  });
  const dispatch = useAppDispatch();
  const handleOnSubmit = async (event: FormEvent) => {
    console.log('this is TASK DATA', taskData)
    event.preventDefault();
    const res = await TaskService.createTask(taskData.boardId, taskData);
    dispatch(createTask(res));
    closeModal();
  }


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof ITask;
    const value = event.target.value;
    if (key.length === 0) return;
    setTaskData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <span className={styles.titleOfModal}>Lets create new task</span>
      <input
        className={styles.inputModalField}
        type="text"
        name="title"
        onChange={handleOnChange}
        value={taskData.title}
        maxLength={35}
        required
        placeholder="please enter title of the task"
      />
      <input
        className={styles.inputModalField}
        type="text"
        name="description"
        onChange={handleOnChange}
        value={taskData.description}
        maxLength={200}
        required
        placeholder="please enter task description"
      />
      <button type='submit'>Add this task</button>
    </form>
  );
};
