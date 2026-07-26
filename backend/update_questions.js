const mongoose = require('mongoose');

const uri = 'mongodb+srv://harish4puhaniya_db_user:HnZvkwhbCbZ2GzGi@cluster0.e47enue.mongodb.net/mallitibba?retryWrites=true&w=majority';

const newQuestions = [
  {
    question: "Name of Maharaj used to stay on sobha sagar talab / शोभा सागर तालाब पर रहने वाले महाराज का नाम क्या है?",
    options: [
      "Sitaram Maharaj / सीताराम महाराज",
      "Sant RamPal Maharaj / संत रामपाल महाराज",
      "Mahrsi Chawanprash Rishi / महर्षि च्यवनप्राश ऋषि",
      "Rameshwar Maharaj / रामेश्वर महाराज"
    ],
    correctAnswer: "Sitaram Maharaj / सीताराम महाराज"
  },
  {
    question: "Local Name of Temple Located just in front of Shanidev Mandir / शनिदेव मंदिर के ठीक सामने स्थित मंदिर का स्थानीय नाम क्या है?",
    options: [
      "Kadiawala Balaji Mandir / कड़ियावाला बालाजी मंदिर",
      "Bheru Baba / भेरू बाबा",
      "Baba Batha Wala / बाबा बाठा वाला",
      "Mata Ka Mandir / माता का मंदिर"
    ],
    correctAnswer: "Kadiawala Balaji Mandir / कड़ियावाला बालाजी मंदिर"
  },
  {
    question: "Owner of the shop just in front of water supply / वाटर सप्लाई के ठीक सामने वाली दुकान के मालिक का नाम क्या है?",
    options: [
      "FoolSingh Saini / फूलसिंह सैनी",
      "Hariram Khati / हरिराम खाती",
      "Madanlal Saini / मदनलाल सैनी",
      "Manish Yadav / मनीष यादव"
    ],
    correctAnswer: "FoolSingh Saini / फूलसिंह सैनी"
  },
  {
    question: "Where Is AnganBadi Kender Located / आंगनबाड़ी केंद्र कहाँ स्थित है?",
    options: [
      "Near Water Supply / वाटर सप्लाई के पास",
      "Near Water Well / कुएं के पास",
      "Near Talab and Park / तालाब और पार्क के पास",
      "Near DharamShala / धर्मशाला के पास"
    ],
    correctAnswer: "Near Water Supply / वाटर सप्लाई के पास"
  },
  {
    question: "Name of the School Present Near KadiaWala Hanumanji Mandir / कड़ियावाला हनुमानजी मंदिर के पास स्थित स्कूल का नाम क्या है?",
    options: [
      "Saint jhon Public School / सेंट जॉन पब्लिक स्कूल",
      "Yaduvanshi Siksha Niketan / यदुवंशी शिक्षा निकेतन",
      "Navgyan Jyoti Public School / नवज्ञान ज्योति पब्लिक स्कूल",
      "Eureka Public School / यूरेका पब्लिक स्कूल"
    ],
    correctAnswer: "Saint jhon Public School / सेंट जॉन पब्लिक स्कूल"
  },
  {
    question: "RailWay Track Act as a Boundary Between Mohalla Mali Tibba and Which Mohalla / रेलवे ट्रैक मोहल्ला माली टिब्बा और किस मोहल्ले के बीच सीमा का काम करता है?",
    options: [
      "Mohalla Kharkhi / मोहल्ला खड़की",
      "Purani Mandi / पुरानी मंडी",
      "Kojinda / कोजिंदा",
      "dayalNagar / दयालनगर"
    ],
    correctAnswer: "Mohalla Kharkhi / मोहल्ला खड़की"
  },
  {
    question: "Festival Dusherra is Celebrated At which Location / दशहरा पर्व किस स्थान पर मनाया जाता है?",
    options: [
      "Ground of lal pahri / लाल पहाड़ी का मैदान",
      "Pande ka Baagh / पांडे का बाग",
      "Sobha Sagar Talab and park / शोभा सागर तालाब और पार्क",
      "Public Dharamshala / सार्वजनिक धर्मशाला"
    ],
    correctAnswer: "Sobha Sagar Talab and park / शोभा सागर तालाब और पार्क"
  },
  {
    question: "Popular Tent House Located In mali tibba / माली टिब्बा में स्थित लोकप्रिय टेंट हाउस कौन सा है?",
    options: [
      "Saini tent house / सैनी टेंट हाउस",
      "Dayal Tent House / दयाल टेंट हाउस",
      "Punjabi Tent House / पंजाबी टेंट हाउस",
      "Purshotm Tent House / पुरुषोत्तम टेंट हाउस"
    ],
    correctAnswer: "Saini tent house / सैनी टेंट हाउस"
  },
  {
    question: "Which Of the Following is Not Persent in Mali Tibba / निम्नलिखित में से क्या माली टिब्बा में मौजूद नहीं है?",
    options: [
      "Water Supply Tank / पानी की टंकी",
      "Electricity Supply Centre / विद्युत आपूर्ति केंद्र",
      "Sewage Treatment Plant / सीवेज ट्रीटमेंट प्लांट",
      "Kendriye Vidyalay / केंद्रीय विद्यालय"
    ],
    correctAnswer: "Kendriye Vidyalay / केंद्रीय विद्यालय"
  },
  {
    question: "Which of the following Temple is not Located in Sobha Sagar talab / निम्नलिखित में से कौन सा मंदिर शोभा सागर तालाब में स्थित नहीं है?",
    options: [
      "shri Ganesh Mandir / श्री गणेश मंदिर",
      "Shivalay / शिवालय",
      "Bheru Baba Mandir / भेरू बाबा मंदिर",
      "Balaji Mandir / बालाजी मंदिर"
    ],
    correctAnswer: "Balaji Mandir / बालाजी मंदिर"
  }
];

async function updateQuestions() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.client.db('mallitibba');
    const collection = db.collection('quizquestions');
    
    await collection.deleteMany({});
    console.log('Old questions deleted.');
    
    await collection.insertMany(newQuestions);
    console.log('New questions inserted successfully.');
    
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

updateQuestions();
