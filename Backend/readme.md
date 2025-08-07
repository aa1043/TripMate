
# 🚗 UBER Clone - User API

This API handles user registration and login for the UBER clone backend. Users can register by providing their full name, email, and password. They can log in with valid credentials to receive a JWT token.

---

## 📍 Endpoints

### 🔹 POST `/users/register`
Registers a new user and returns a JWT token.

### 🔹 POST `/users/login`
Authenticates an existing user and returns a JWT token.

---

## 📄 Description

### ✅ `/users/register`

Creates a new user account by:
- Validating inputs
- Hashing the password with bcrypt
- Storing the user in MongoDB
- Returning a JWT token

### ✅ `/users/login`

Authenticates a user by:
- Validating inputs
- Verifying email and password
- Returning a JWT token if credentials are correct

---

## 📥 Request Bodies

### `/users/register`

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

### `/users/login`

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## 🔐 Field Requirements

### For `/users/register`

| Field                | Type   | Required | Description                   |
|----------------------|--------|----------|-------------------------------|
| fullname.firstname   | String | ✅ Yes   | User's first name             |
| fullname.lastname    | String | ✅ Yes   | User's last name              |
| email                | String | ✅ Yes   | Must be a valid email address |
| password             | String | ✅ Yes   | Minimum 6 characters          |

### For `/users/login`

| Field    | Type   | Required | Description                   |
|----------|--------|----------|-------------------------------|
| email    | String | ✅ Yes   | Must be a valid email address |
| password | String | ✅ Yes   | User's password               |

---

## ✅ Success Responses

### `/users/register` → `201 Created`

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

### `/users/login` → `200 OK`

```json
{
  "message": "Login successful",
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

### `400 Bad Request`

Input validation failed:

```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### `401 Unauthorized`

Invalid login credentials or user not found:

```json
{
  "error": "Invalid credentials"
}
```
or
```json
{
  "error": "User not found, Please Register first"
}
```

### `500 Internal Server Error`

Server or database error:

```json
{
  "error": "User already exists"
}
```

---

## 📎 Example cURL Requests

### Register

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

### Login

```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}'
```

---

## 🛠 Developer Notes

- Ensure `.env` contains a valid `JWT_SECRET`.
- Passwords are hashed using `bcrypt` before being stored.
- JWT tokens expire after 1 hour by default.
