const mongoose = require('mongoose');

const uri = 'mongodb+srv://harish4puhaniya_db_user:HnZvkwhbCbZ2GzGi@cluster0.e47enue.mongodb.net/mallitibba?retryWrites=true&w=majority';

async function fetchQuestions() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.client.db('mallitibba');
    const collection = db.collection('quizquestions');
    
    const questions = await collection.find({}).toArray();
    console.log(JSON.stringify(questions, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

fetchQuestions();
