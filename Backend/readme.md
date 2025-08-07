
# 🚗 UBER Clone - User API

This API handles user registration, login, profile access, and logout for the UBER clone backend. Users can register, authenticate using JWT, access their profile, and log out (with token blacklisting).

---

## 📍 Endpoints

### 🔹 POST `/users/register`
Registers a new user and returns a JWT token.

### 🔹 POST `/users/login`
Authenticates an existing user and returns a JWT token (also sets a cookie).

### 🔹 GET `/users/profile`
Returns authenticated user’s profile info (requires token or cookie).

### 🔹 GET `/users/logout`
Clears authentication cookie and blacklists the token (requires token or cookie).

---

## 📄 Description

### ✅ `/users/register`
Creates a new user account:
- Validates name, email, password
- Hashes password securely with bcrypt
- Stores user in database
- Returns a JWT token

### ✅ `/users/login`
Logs in an existing user:
- Validates email and password
- Compares hashed password
- Returns a JWT token and sets it as an HTTP-only cookie

### ✅ `/users/profile`
Returns the profile data of the authenticated user:
- Requires valid JWT in cookie or `Authorization` header

### ✅ `/users/logout`
Logs the user out:
- Clears JWT cookie
- Blacklists the token to prevent reuse

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

### `/users/profile` → `200 OK`

```json
{
  "_id": "64f0c4b3e5d13a7b37e33a09",
  "email": "john.doe@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### `/users/logout` → `200 OK`

```json
{
  "message": "User logged out successfully"
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

Invalid login credentials, no token, blacklisted token, or user not found:

```json
{ "error": "Invalid credentials" }
```
or
```json
{ "error": "User not found, Please Register first" }
```
or
```json
{ "error": "Unauthorized access" }
```
or
```json
{ "error": "Token is blacklisted" }
```

### `500 Internal Server Error`

Server or database error:

```json
{ "error": "User already exists" }
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

### Profile (Requires Token in Cookie or Header)

```bash
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

### Logout

```bash
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

---

## 🛠 Developer Notes

- Ensure `.env` contains a valid `JWT_SECRET`
- Passwords are hashed using `bcrypt` before being stored
- JWTs expire after 1 hour by default
- Blacklisted tokens are stored in `blacklistToken` collection
