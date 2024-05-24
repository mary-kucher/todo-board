import React, { useState } from 'react';
import styles from './Task.module.scss';
import ITask from '../../services/ITask.ts';
import { EditButton } from '../buttons/EditButton/EditButton.tsx';
import { DeleteButton } from '../buttons/DeleteButton/DeleteButton.tsx';
import { SaveButton } from '../buttons/SaveButton/SaveButton.tsx';
import { TaskService } from '../../services/TaskService.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { editTask, removeTask } from '../../reducers/taskSlice.ts';

type Props = {
  task: ITask,
};

export const Task: React.FC<Props> = ({task}) => {
  const {title, description} = task;
  const [taskData, setTaskData] = useState({
    title: title,
    description: description,
  });
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();

  const handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('task', JSON.stringify(task))
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof ITask;
    const value = event.target.value;
    if (key.length === 0) return;
    setTaskData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const updated = await TaskService.updateTask(task.id, {...task, ...taskData});
    dispatch(editTask(updated));
    setIsEdit(!isEdit);
  }

  const handleRemove = async () => {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      const res = await TaskService.deleteTask(task.id);
      if (res) {
        dispatch(removeTask(task));
      }
    }
  }

  return (
    <div
      className={styles.container}
      draggable
      onDragStart={handleOnDragStart}
    >
      {isEdit
        ? <input
          className={styles.title}
          type="text"
          name="title"
          value={taskData.title}
          maxLength={35}
          onChange={handleOnChange}
        />
        : (<div className={styles.title}>{title}</div>)}
      {isEdit
        ? <input
          className={styles.description}
          name="description"
          value={taskData.description}
          maxLength={200}
          onChange={handleOnChange}
        />
        : (<div className={styles.description}>{description}</div>)}
      {isEdit ?
        <SaveButton onClick={handleSave}/>
        : (<div className={styles.buttonsWrapper}>
          <EditButton onClick={() => {
            setIsEdit(!isEdit);
          }}/>
          <DeleteButton onClick={handleRemove}/>
        </div>)}
    </div>
  );
};
