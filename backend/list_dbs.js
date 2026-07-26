const mongoose = require('mongoose');

const uri = 'mongodb+srv://harish4puhaniya_db_user:HnZvkwhbCbZ2GzGi@cluster0.e47enue.mongodb.net/?retryWrites=true&w=majority';

async function checkDatabases() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    // Get the admin database
    const adminDb = mongoose.connection.db.admin();
    
    // List all databases
    const result = await adminDb.listDatabases();
    
    console.log('Databases:');
    for (let dbInfo of result.databases) {
      console.log(`- ${dbInfo.name}`);
      // Connect to this db and list collections
      const db = mongoose.connection.client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      for (let c of collections) {
        console.log(`  - Collection: ${c.name}`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

checkDatabases();
