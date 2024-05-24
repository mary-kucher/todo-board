import BoardService from '../services/boardService';
import { Request, Response } from 'express';

class BoardController {
  async getBoard(req: Request, res: Response) {
    const id = req.params.id;
      try {
        const board = await BoardService.getBoard(id);
        return res.json(board)
      } catch (error: any) {
        console.error(error);
        res.status(500).json({message: error.message});
      }
    }

  async createBoard(req: Request, res: Response) {
    const name = req.body.name;
    try {
      const board = await BoardService.createBoard(name);
      return res.json(board)
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }

  async updateBoard(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const board = await BoardService.updateBoard(id, req.body);
      return res.json(board)
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }

  async deleteBoard(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await BoardService.deleteBoard(id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
    }
  }
}

export default new BoardController();
