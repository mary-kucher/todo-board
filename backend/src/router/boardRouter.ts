import * as express from 'express';
import BoardController from '../controllers/boardController';

const router = express.Router();

router.post('/boards', BoardController.createBoard);
router.get('/boards/:id', BoardController.getBoard);
router.put('/boards/:id', BoardController.updateBoard);
router.delete('/boards/:id', BoardController.deleteBoard);

export default router;
