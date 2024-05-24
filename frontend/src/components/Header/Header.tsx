import React, { useState } from 'react';
import styles from './Header.module.scss';
import { ModalWindow } from '../ModalWindow/ModalWindow.tsx';
import { AddBoardModal } from '../AddBoardModal/AddBoardModal.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { BoardService } from '../../services/BoardService.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { loadBoard, removeBoard, updateBoardName } from '../../reducers/boardSlice.ts';
import { EditButton } from '../buttons/EditButton/EditButton.tsx';
import { DeleteButton } from '../buttons/DeleteButton/DeleteButton.tsx';
import { loadTasks } from '../../reducers/taskSlice.ts';
import { SaveButton } from '../buttons/SaveButton/SaveButton.tsx';

export const Header: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const {id, name} = useAppSelector((state) => state.board);
  const [edit, setEdit] = useState({isEdit: false, name: ''});
  const [boardId, setBoardId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const isActiveBoard = !!name.length;
  const closeModal = () => {
    setIsHideModal(true);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setIsHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  };
  const handleLoadBoard = async () => {
    try {
      const res = await BoardService.getBoard(boardId);
      dispatch(loadBoard(res));
      dispatch(loadTasks(res.tasks));
      setBoardId('');
      setEdit((prevState) => ({...prevState, name: res.name}));
    } catch (e) {
      setErrorMessage('Please try again, the entered ID might be incorrect.')
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setBoardId(e.target.value);
  }

  const handleSave = async () => {
    const res = await BoardService.updateBoard(id, edit.name);
    dispatch(updateBoardName(res.name));
    setEdit((prevState) => ({...prevState, isEdit: false}));
  };
  const handleRemove = async () => {
    const confirmation = confirm(`Are you sure you want to delete board ${name}?`);
    if (confirmation) {
      const res = await BoardService.deleteBoard(id);
      if (res) {
        dispatch(removeBoard(res));
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpenModal(!isOpenModal);
          }}>
          Create new board
        </button>
        <div className={styles.rightSide}>
          {isActiveBoard &&
            <div className={styles.nameWrapper}>
              {edit.isEdit
                ? (
                  <>
                    <input
                      className={styles.boardName}
                      type="text"
                      name="name"
                      onChange={(e) => {
                        setEdit((prevState) => ({...prevState, name: e.target.value}));
                      }}
                      value={edit.name}
                      required
                    />
                    <SaveButton onClick={handleSave}/>
                  </>
                )
                : (
                  <>
                    <div className={styles.boardName}>{name}</div>
                    <EditButton
                      onClick={() => setEdit((prevState) => ({...prevState, isEdit: true}))}
                    />
                    <DeleteButton onClick={handleRemove}/>
                  </>
                )
              }
            </div>}
          {isActiveBoard && <span style={{fontSize: '13px'}}>ID: {id}</span>}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputField}
            type="text"
            name="name"
            onChange={handleChange}
            value={boardId || ''}
            required
            placeholder="Enter a board ID here..."
          />
          <button onClick={handleLoadBoard}> Load</button>
        </div>
        <span className={styles.error}>{errorMessage}</span>
      </div>
      {
        isOpenModal && (
          <ModalWindow closeModal={closeModal} isHideModal={isHideModal}>
            <AddBoardModal closeModal={closeModal} changeName={(name) => {
              setEdit((prevState) => ({...prevState, name}));
            }}/>
          </ModalWindow>
        )
      }
    </div>
  );
};
