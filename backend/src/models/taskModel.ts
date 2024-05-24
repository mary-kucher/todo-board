import {Schema, Document, model} from 'mongoose';
import { TaskStatus } from './taskStatus';

export interface TaskDocument extends Document {
  boardId: string;
  title: string;
  description: string;
  status: TaskStatus;
}

const TaskSchema = new Schema<TaskDocument>({
  boardId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
})

export default model('Task', TaskSchema);
