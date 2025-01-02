# 🚀 **False Exchange**

Welcome to the **False Exchange** project! This is a full-stack web application designed to manage user authentication and real-time order processing efficiently. With a secure backend and an intuitive frontend, this project ensures smooth operations for users and administrators.

---

## 🌟 **Features**

### 🔑 **Authentication**
- Secure login and signup using JWT.
- Password hashing for enhanced security.

### 📋 **Order Management**
- Place, amend, and cancel orders in real time.
- View detailed order history with status updates.

### 🖥️ **Responsive Design**
- Fully optimized for desktop, tablet, and mobile devices.

---

## 🛠️ **Tech Stack**

### Frontend:
- ⚛️ **React** for dynamic UI components.
- 🎨 **CSS** for responsive and modern designs.

### Backend:
- 🌐 **Node.js** with **Express** for API handling.
- 🛡️ **JWT** for secure user authentication.

### Database:
- 🗄️ **MongoDB** for scalable and flexible data storage.

---

## 🚧 **Installation**

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/false-exchange.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd false-exchange
   ```

3. **Install dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

4. **Run the application**:
   - Backend:
     ```bash
     nodemon server
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

---

## 🔧 **API Endpoints**

### **Authentication**

| Method | Endpoint       | Description                 |
|--------|----------------|-----------------------------|
| POST   | `/api/auth/login`  | Login a user              |
| POST   | `/api/auth/signup` | Register a new user       |
| GET    | `/api/auth/me`     | Get logged-in user details |

### **Order Management**

| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/order/place`  | Place a new order      |
| PUT    | `/api/order/amend/:id` | Amend an existing order |
| DELETE | `/api/order/cancel/:id` | Cancel an order        |
| GET    | `/api/order/all`    | View all orders        |

---

## 📸 **Screenshots**

### Login Page:
![image](https://github.com/user-attachments/assets/88a32192-352c-4de5-a322-fd485774ad13)


### Signup Page:
![image](https://github.com/user-attachments/assets/fda1eee8-a381-4aa4-a053-08e9c47f6477)


### Dashboard:

![image](https://github.com/user-attachments/assets/12c66adc-96e7-4e55-a509-59615f503d3b)

### Order Form:
![image](https://github.com/user-attachments/assets/7d9f139d-14a1-4904-adaf-8ce803cfa905)


### Order List:
![image](https://github.com/user-attachments/assets/f10008b0-6814-4365-94b5-307851977067)


---

## 🧩 **Folder Structure**

```
false-exchange/
├── backend/
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   └── app.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   └── App.js      # Main React app
├── README.md
```

---

## 🤝 **Contributing**

We welcome contributions from the community! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push the changes to your fork:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## 🌐 **Deployment**

The application is deployed at:
[https://mock-exchange.netlify.app/](https://mock-exchange.netlify.app/)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ❤️ **Acknowledgements**

- Thanks to **MongoDB**, **Express**, **React**, and **Node.js** for providing an amazing tech stack.
- Special thanks to all contributors for their efforts.

---

### **Let's Build Something Great Together!** ✨

