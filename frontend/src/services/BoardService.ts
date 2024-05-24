import { get, post, put, remove } from '../api/api.ts';
import IBoard from './IBoard.ts';


export class BoardService {
  static async getBoard(id: string) {
    return await get<IBoard>(`/boards/${id}`);
  }

  static async createBoard(name: string) {
    return await post<{ name: string }, IBoard>('/boards', {name});
  }

  static async updateBoard(id: string, name: string) {
    return await put<{ name: string }, IBoard>(`/boards/${id}`, {name});
  }

  static async deleteBoard(id: string) {
    return await remove(`/boards/${id}`);
  }
}
