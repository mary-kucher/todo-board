import { Request, Response } from 'express';
import TaskService from '../services/taskService';

class TaskController {
  async createTask(req: Request, res: Response) {
    const boardId = req.params.id;
    try {
      const task = await TaskService.createTask(req.body, boardId);
      return res.json(task)
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }

  async getTasks(req: Request, res: Response) {
    const boardId = req.params.id;
    try {
      const tasks = await TaskService.getTasks(boardId);
      return res.json(tasks)
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }

  async updateTask(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const task = await TaskService.updateTask(id, req.body);
      return res.json(task)
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }

  async deleteTask(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await TaskService.deleteTask(id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }
}
export default new TaskController();
