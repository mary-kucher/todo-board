export default class TaskDto {
  boardId;
  id;
  title;
  description;
  status;

  constructor(model: any) {
    this.boardId = model.boardId;
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.status = model.status;
  }
}
