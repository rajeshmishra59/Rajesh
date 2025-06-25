// 📁 D:\AppDevelopment\instay-app\frontend\postcss.config.js

module.exports = {
  plugins: {
    // ✨ UPDATED: 'tailwindcss' को '@tailwindcss/postcss' से बदलें ✨
    // यह सुनिश्चित करता है कि PostCSS सही Tailwind प्लगइन का उपयोग करे।
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
}
