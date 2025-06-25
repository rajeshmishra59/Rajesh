    // 📁 D:\AppDevelopment\instay-app\frontend\tailwind.config.js

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        // ये पाथ Tailwind को आपके कंपोनेंट्स में क्लासेस खोजने में मदद करते हैं
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
      ],
      theme: {
        extend: {
          // यहाँ आप अपनी कस्टम थीम कॉन्फ़िगर कर सकते हैं (जैसे रंग, फोंट)
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      },
      plugins: [],
    }
    