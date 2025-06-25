// 📁 D:\AppDevelopment\instay-app\backend\config\database.js

const mongoose = require('mongoose');

// यह फ़ंक्शन MongoDB डेटाबेस से कनेक्शन स्थापित करता है।
const connectDatabase = () => {
    // MongoDB कनेक्शन स्ट्रिंग environment variables से ली जाती है।
    // सुनिश्चित करें कि आपके .env फ़ाइल में MONGO_URI सही ढंग से सेट है।
    // MONGO_URI=mongodb+srv://rajeshmishra59:Rajesh%4022042016@rajeshdev.p5oxirw.mongodb.net/instaydb?retryWrites=true&w=majority&appName=rajeshdev
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Mongoose 6.x+ में ये विकल्प अब आवश्यक या समर्थित नहीं हैं:
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then((con) => {
        // सफल कनेक्शन पर लॉग करें
        console.log(`✅ MongoDB से कनेक्ट हो गया: ${con.connection.host}`);
    }).catch((err) => {
        // कनेक्शन एरर को हैंडल करें
        console.error(`❌ MongoDB कनेक्शन एरर: ${err.message}`);
        // यदि कनेक्शन विफल रहता है, तो एप्लिकेशन को बंद कर दें (यह बहुत ज़रूरी है)
        process.exit(1); 
    });
};

module.exports = connectDatabase;
