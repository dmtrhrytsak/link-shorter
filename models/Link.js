import moongoose from 'mongoose';

const linkSchema = new moongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: { type: moongoose.SchemaTypes.ObjectId, ref: 'User' },
});

export default moongoose.model('Link', linkSchema);
