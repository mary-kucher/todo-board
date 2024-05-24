import BoardModel from '../models/boardModel';
import BoardDto from '../dtos/boardDto';
import crypto from 'crypto';
import taskService from './taskService';

class BoardService {
  async createBoard(name: string) {
    const currentDate = new Date().toISOString();
    const id = crypto.createHash('md5').update(currentDate).digest('hex');
    const board = new BoardModel({id, name});
    await board.save();

    return new BoardDto(board);
  }

  async getBoard(id: string) {
    const board = await BoardModel.findOne({id: id})
      .then( async (board) => {
        if (!board) {
          return null;
        }
        const tasks = await taskService.getTasks(id);
        return new BoardDto(board, tasks);
    });
    if (!board) {
      throw new Error('Board not found');
    }
    return board;
  }

  async updateBoard(id: string, data: Partial<BoardDto>) {
    const board = await BoardModel.findOneAndUpdate({id}, data, { new: true });
    return new BoardDto(board);
  }

  async deleteBoard(id: string) {
    await BoardModel.findOneAndDelete({id});
    await taskService.deleteTasks(id);
  }
}

export default new BoardService();
