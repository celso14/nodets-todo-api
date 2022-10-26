import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller';


export const router = Router();

//Endpoints
router.get('/todo', TodoController.all);
router.post('/todo', TodoController.add);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);


export default router;