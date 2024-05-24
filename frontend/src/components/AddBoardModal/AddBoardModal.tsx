import React, { FormEvent, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './AddBoardModal.module.scss';
import { BoardService } from '../../services/BoardService.ts';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { loadBoard } from '../../reducers/boardSlice.ts';
import { loadTasks } from '../../reducers/taskSlice.ts';

type Props = {
  closeModal: () => void,
  changeName: (name: string) => void
};

export const AddBoardModal: React.FC<Props> = ({closeModal, changeName}) => {
  const [boardName, setBoardName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [created, setCreated] = useState(false);
  const {id, name} = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const handleOnSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const res = await BoardService.createBoard(boardName.trim());
      dispatch(loadBoard(res));
      dispatch(loadTasks([]));
      setCreated(true);
      changeName(res.name);
    } catch (error) {
      setErrorMessage('Field cant be empty.')
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  return (
    <>
      {!created
        ? (<form className={styles.form} onSubmit={handleOnSubmit}>
          <span className={styles.titleOfModal}>Name of board</span>
          <input
            className={styles.inputModalField}
            type="text"
            name="name"
            onChange={handleOnChange}
            value={boardName}
            required
            placeholder="please enter name of the board"
          />
          <span className={styles.error}>{errorMessage}</span>
          <button type='submit'>Create</button>
        </form>)
        : (<div className={styles.information}>
            <span className={styles.titleOfModal}>Well done! Board {name} created.
            <br/>
            Save the board ID for further access.</span>
            <span className={styles.id}>{id}</span>
            <CopyToClipboard text={id}>
              <button onClick={closeModal}>Copy ID</button>
            </CopyToClipboard>
          </div>
        )}
    </>
  );
};
