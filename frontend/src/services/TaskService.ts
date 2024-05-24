import { post, put, remove } from '../api/api.ts';
import ITask from './ITask.ts';

export class TaskService {
  static async createTask(boardId: string, data: ITask) {
    return await post<ITask, ITask>(`/boards/${boardId}/tasks`, data);
  }

  static async updateTask(id: string, data: ITask) {
    return await put<ITask, ITask>(`/boards/tasks/${id}`, data);
  }

  static deleteTask(id: string) {
    return remove(`/boards/tasks/${id}`);
  }
}
