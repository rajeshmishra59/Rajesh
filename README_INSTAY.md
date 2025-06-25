
# 🏠 Instay – Coliving Space Monitoring System

**Instay** एक फुल-स्टैक एप्लिकेशन है जिसे Ahmedabad में PG (Paying Guest) हाउसिंग ऑपरेशन को मॉनिटर करने और मैनेज करने के लिए बनाया गया है। इसमें रियल-टाइम स्टूडेंट ऑक्यूपेंसी, रेवेन्यू ट्रैकिंग, खर्चों का विश्लेषण और प्रॉफिटेबिलिटी रिपोर्ट्स शामिल हैं।

---

## 🚀 लाइव डेमो (अगर हो तो)
[Live Link](#) — (बाद में जोड़ें)

---

## 📌 Key Features

- ✅ JWT-based Authentication & Role-wise Authorization (Admin, Manager, Warden)
- ✅ Dashboard with Real-time KPIs
- ✅ Occupancy Tracker – Room-wise Student Status
- ✅ Revenue & Expense Tracker – Excel-style tables
- ✅ Tailwind CSS के साथ Modern UI
- ✅ Profitability Analytics & Formulas

---

## 🧱 Tech Stack

| Layer      | Tech Used                      |
|------------|--------------------------------|
| Frontend   | React.js, Tailwind CSS         |
| Backend    | Node.js, Express.js            |
| Database   | MongoDB                        |
| Auth       | JWT, Cookie-Parser             |

---

## ⚙️ Setup Guide

### 🖥️ Clone the Repository
```bash
git clone https://github.com/rajeshmishra59/Rajesh.git
cd Rajesh
```

### 🔧 Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 🎨 Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 📁 Folder Structure

```
Rajesh/
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── assets/
├── .env
├── README.md
```

---

## 🔐 Environment Variables (`.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/instay
JWT_SECRET=your_secret_key
COOKIE_EXPIRE=5
```

---

## 👤 Roles & Access

| Role     | Access Area                      |
|----------|----------------------------------|
| Admin    | Full access, Dashboards, Users   |
| Manager  | Booking & Occupancy              |
| Warden   | Only room-level monitoring       |

---

## 📸 Screenshots (Add later)

> 📷 Add screenshots here to showcase your dashboard UI and forms

---

## 🙌 Contribution Guide

1. Fork this repo
2. Create a new branch (`feature/xyz`)
3. Commit your changes
4. Open a pull request

---

## 📬 Contact

**Author:** Rajesh Kumar  
📧 Email: yourname@example.com  
🔗 GitHub: [https://github.com/rajeshmishra59](https://github.com/rajeshmishra59)

---

> Made with ❤️ for better Coliving Space Management
