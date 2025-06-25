// 📁 D:\AppDevelopment\instay-app\backend\utils\errorHandler.js

// यह एक कस्टम एरर क्लास है जो JavaScript के Error क्लास को एक्सटेंड करती है।
// इसका उपयोग हमारे एप्लिकेशन में विशिष्ट HTTP एरर्स को हैंडल करने के लिए किया जाता है।
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // पैरेंट Error क्लास के कंस्ट्रक्टर को कॉल करता है
        this.statusCode = statusCode; // HTTP स्टेटस कोड (जैसे 400, 401, 403, 404, 500)

        // यह सुनिश्चित करता है कि स्टैक ट्रेस में इस कंस्ट्रक्टर कॉल को शामिल न किया जाए
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;