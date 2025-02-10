# 🧪 Bitespeed Identity Reconciliation API

This is an API built for **Bitespeed Backend Task: Identity Reconciliation**.  
It consolidates multiple contact records (emails & phone numbers) into a **single primary contact**, returning all linked secondary contacts.

---

## 🚀 Live API Endpoint

The API is **hosted on Render** and can be accessed at:

🔗 **Endpoint**: [https://bitespeed-backend-identityreconciliation.onrender.com/identify](https://bitespeed-backend-identityreconciliation.onrender.com/identify)

---

## 📌 How to Test the API in Postman

1. Open **Postman**.
2. Select **GET** method.
3. Paste the hosted API URL:  
   ```
   https://bitespeed-backend-identityreconciliation.onrender.com/identify
   ```
4. Go to the **Body** section, select **raw**, and choose **JSON** format.
5. Enter the following JSON request body:
   ```json
   {
       "email": "mcfly@hillvalley.edu",
       "phoneNumber": "123456"
   }
   ```
6. Click **Send**.
7. You will get the following response:
   ```json
   {
       "contact": {
           "primaryContactId": 1,
           "emails": [
               "lorraine@hillvalley.edu",
               "mcfly@hillvalley.edu"
           ],
           "phoneNumbers": [
               "123456"
           ],
           "secondaryContactIds": [
               23
           ]
       }
   }
   ```

---

## 📂 **Database Setup (MySQL on AWS RDS)**

To set up the database, run the following SQL commands:

```sql
CREATE DATABASE bitespeed_db;
USE bitespeed_db;

CREATE TABLE Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phoneNumber VARCHAR(20),
    email VARCHAR(255),
    linkedId INT DEFAULT NULL,  
    linkPrecedence ENUM('primary', 'secondary') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO Contact (id, phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt)
VALUES
(1, '123456', 'lorraine@hillvalley.edu', NULL, 'primary', '2023-04-01 00:00:00.374', '2023-04-01 00:00:00.374', NULL),
(23, '123456', 'mcfly@hillvalley.edu', 1, 'secondary', '2023-04-20 05:30:00.11', '2023-04-20 05:30:00.11', NULL);

INSERT INTO Contact (id, phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt)
VALUES
(11, '919191', 'george@hillvalley.edu', NULL, 'primary', '2023-04-11 00:00:00.374', '2023-04-11 00:00:00.374', NULL),
(27, '717171', 'biffsucks@hillvalley.edu', 11, 'secondary', '2023-04-21 05:30:00.11', '2023-04-28 06:40:00.23', NULL);
```

## 🌟 **Features**
✅ **REST API with Express.js**  
✅ **MySQL Database for Contact Storage**  
✅ **Hosted on Render**  

---

## 📝 **Task Requirements Completed**
✔️ **Published on GitHub**  
✔️ **Small commits with insightful messages**  
✔️ **`/identify` endpoint exposed**  
✔️ **API hosted online**  
✔️ **Uses JSON Body for requests**

---

## 🏆 **Author**
**Aditya Babu Prajapati**  
📧 Email: [adityababuprajapati@gmail.com](adityababuprajapati@gmail.com)  
🔗 GitHub: [adityaprajapati10](https://github.com/adityaprajapati10)  

---