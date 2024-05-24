export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export default interface ITask {
  boardId: string,
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
}
