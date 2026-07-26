const mongoose = require('mongoose');

const uri = 'mongodb+srv://harish4puhaniya_db_user:HnZvkwhbCbZ2GzGi@cluster0.e47enue.mongodb.net/persnol?retryWrites=true&w=majority';

async function checkDb() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:');
    for (let c of collections) {
      console.log(`- ${c.name}`);
      const docs = await mongoose.connection.db.collection(c.name).find({}).limit(1).toArray();
      if (docs.length > 0) {
        console.log(`  Sample from ${c.name}:`, JSON.stringify(docs[0]).substring(0, 200));
      } else {
        console.log(`  Collection ${c.name} is empty.`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

checkDb();
