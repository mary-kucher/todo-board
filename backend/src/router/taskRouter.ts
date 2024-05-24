import * as express from 'express';
import TaskController from '../controllers/taskController';


const router = express.Router();

router.get('/boards/:id/tasks', TaskController.getTasks);
router.post('/boards/:id/tasks', TaskController.createTask);
router.put('/boards/tasks/:id', TaskController.updateTask);
router.delete('/boards/tasks/:id', TaskController.deleteTask);


export default router;
