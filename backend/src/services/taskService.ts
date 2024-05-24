import TaskModel, { TaskDocument } from '../models/taskModel';
import TaskDto from '../dtos/taskDto';

class TaskService {
  async createTask(req: TaskDto, boardId: string) {
    const {title, description, status} = req;
    const task = new TaskModel({boardId, title, description, status});
    await task.save();

    return new TaskDto(task);
  }

  async getTasks(boardId: string) {
    return await TaskModel.find({boardId})
      .then(tasks => tasks.map(task => new TaskDto(task)));
  }

  async updateTask(id: string, data: Partial<TaskDocument>) {
    const task = await TaskModel.findOneAndUpdate({_id: id}, data, { new: true });
    if (!task) {
      throw new Error('Task not found');
    }
    return new TaskDto(task);
  }

  async deleteTask(id: string) {
    const task = await TaskModel.findOneAndDelete({_id: id});
    if (!task) {
      throw new Error('Task not found');
    }
  }
  async deleteTasks(boardId: string) {
    await TaskModel.deleteMany({boardId});
  }
}

export default new TaskService();
