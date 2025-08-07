
# 🚗 UBER Clone - User Registration API

This API endpoint handles new user registration for the UBER clone backend. It accepts a user's name, email, and password, securely stores the information, and returns a JWT token upon successful registration.

---

## 📍 Endpoint

**POST** `/users/register`

---

## 📄 Description

This endpoint is used to create a new user account. It performs the following tasks:

- Validates the provided input (name, email, password).
- Hashes the password securely using bcrypt.
- Stores the user information in the database.
- Returns a JWT token for authentication.

---

## 📥 Request Body

The request must be in **JSON** format with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## 🔐 Field Requirements

| Field                | Type   | Required | Description                   |
|----------------------|--------|----------|-------------------------------|
| fullname.firstname   | String | ✅ Yes   | User's first name             |
| fullname.lastname    | String | ✅ Yes   | User's last name              |
| email                | String | ✅ Yes   | Must be a valid email address |
| password             | String | ✅ Yes   | Must be at least 6 characters |

---

## ✅ Success Response

### Status: `201 Created`

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64f0c4b3e5d13a7b37e33a09",
    "email": "john.doe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  },
  "token": "JWT_TOKEN_HERE"
}
```

---

## ❌ Error Responses

### 🔴 400 Bad Request

Occurs when validation fails (e.g. missing fields or invalid email format).

```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### 🔴 500 Internal Server Error

Occurs when the server encounters unexpected issues, such as:

- Duplicate email
- Database errors
- Internal logic errors

```json
{
  "error": "User already exists"
}
```

---

## 🔐 Authentication

No authentication is required to access this endpoint.

---

## 📎 Example cURL Request

```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}'
```

---

## 🛠 Developer Notes

- Ensure `.env` contains a valid `JWT_SECRET`.
- The password is hashed using `bcrypt` before being stored.
- The password is excluded from the response for security.
