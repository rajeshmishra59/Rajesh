// 📁 D:\AppDevelopment\instay-app\backend\utils\catchAsyncError.js

// यह एक उच्च-क्रम का फ़ंक्शन (Higher-Order Function) है जो एक्सप्रेस.js के
// एसिंक्रोनस राउट हैंडलर्स में एरर्स को कैच करने के लिए उपयोग किया जाता है।
// यह try-catch ब्लॉक के दोहराव से बचाता है।
const catchAsyncError = (func) => (req, res, next) => {
    // प्रॉमिस को resuelve करता है और यदि कोई एरर होता है,
    // तो उसे नेक्स्ट मिडिलवेयर (एरर हैंडलर) में भेजता है।
    Promise.resolve(func(req, res, next)).catch(next);
};

module.exports = catchAsyncError;