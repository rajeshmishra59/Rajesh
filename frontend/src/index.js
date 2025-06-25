// 📁 D:\AppDevelopment\instay-app\frontend\src\index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
// ✨ सुनिश्चित करें कि './index.css' यहाँ सही ढंग से इम्पोर्ट किया गया है ✨
// और index.css फ़ाइल में केवल CSS कोड ही हो, कोई JavaScript नहीं।
import './index.css'; 
import App from './App';
// अन्य इम्पोर्ट्स (जैसे आपके AuthContext, आदि) यदि App.js में नहीं हैं तो यहाँ हो सकते हैं।

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
