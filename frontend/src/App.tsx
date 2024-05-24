import React from 'react';
import { Header } from './components/Header/Header.tsx';
import { Board } from './components/Board/Board.tsx';
import { useAppSelector } from './hooks/useAppSelector.ts';

export const App: React.FC = () => {
  const {id} = useAppSelector((state) => state.board);
  return (
    <div>
      <Header />
      {!!id.length && <Board/>}
    </div>
  );
};

