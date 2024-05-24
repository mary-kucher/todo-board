import TaskDto from './taskDto';

export default class BoardDto {
  id;
  name;
  tasks;

  constructor(model: any, tasks: TaskDto[] = []) {
    this.id = model.id;
    this.name = model.name;
    this.tasks = tasks;
  }
}
