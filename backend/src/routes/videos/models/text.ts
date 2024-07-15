import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const textSchema = new Schema({
  title: String,
  text: String,
  date: {
    type: Date,
    default: Date.now
  },
  link: String,
  error: {
    type: Boolean,
    default: false
  },
  source: String
});

const Text =  mongoose.model('Text', textSchema);

export {Text}