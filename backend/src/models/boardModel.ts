import {Schema, Document, model} from 'mongoose';

export interface BoardDocument extends Document {
  id: string;
  name: string;
}

const BoardSchema = new Schema<BoardDocument>({
  id: {type: String, required: true},
  name: {type: String, required: true},
})

export default model('Board', BoardSchema);
