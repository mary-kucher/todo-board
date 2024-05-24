import ITask from './ITask.ts';

export default interface IBoard {
  id: string,
  name: string,
  tasks: ITask[],
}
