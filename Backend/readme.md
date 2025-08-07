# 🚗🚖 UBER Clone - Backend API

This backend API powers the UBER clone application, supporting **User** and **Driver** operations such as registration, login, profile retrieval, and logout with JWT authentication and token blacklisting.

---

## 📍 Endpoints Overview

### **User Endpoints**
not

- **POST** `/users/register` → Register a new user
- **POST** `/users/login` → Login user and return JWT token (also sets a cookie)
- **GET** `/users/profile` → Get authenticated user profile
- **GET** `/users/logout` → Logout user and blacklist JWT

### **Driver Endpoints**

- **POST** `/drivers/register` → Register a new driver
- **POST** `/drivers/login` → Login driver and return JWT token (also sets a cookie)
- **GET** `/drivers/profile` → Get authenticated driver profile
- **GET** `/drivers/logout` → Logout driver and blacklist JWT

---

# 👤 USER API

## 📄 Description

### ✅ `/users/register`

- Validates name, email, password
- Hashes password securely with bcrypt
- Stores user in database
- Returns JWT token

### ✅ `/users/login`

- Validates email and password
- Compares hashed password
- Returns JWT token and sets as HTTP-only cookie

### ✅ `/users/profile`

- Returns user profile data
- Requires JWT in cookie or Authorization header

### ✅ `/users/logout`

- Clears JWT cookie
- Blacklists token

---

## 📥 Request Bodies

### `/users/register`

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
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

| Field              | Type   | Required | Description          |
| ------------------ | ------ | -------- | -------------------- |
| fullname.firstname | String | ✅ Yes    | First name           |
| fullname.lastname  | String | ✅ Yes    | Last name            |
| email              | String | ✅ Yes    | Valid email          |
| password           | String | ✅ Yes    | Minimum 6 characters |

---

## ✅ Success Responses

``** → 201 Created**

```json
{
  "message": "User registered successfully",
  "user": { "id": "64f0...", "email": "john.doe@example.com", "fullname": { "firstname": "John", "lastname": "Doe" } },
  "token": "JWT_TOKEN_HERE"
}
```

``** → 200 OK**

```json
{
  "message": "Login successful",
  "user": { "id": "64f0...", "email": "john.doe@example.com", "fullname": { "firstname": "John", "lastname": "Doe" } },
  "token": "JWT_TOKEN_HERE"
}
```

---

## ❌ Error Responses

- **400 Bad Request**

```json
{
  "errors": [{ "msg": "Email is required", "param": "email", "location": "body" }]
}
```

- **401 Unauthorized**

```json
{ "error": "Invalid credentials" }
```

or

```json
{ "error": "Token is blacklisted" }
```

---

## 📎 Example cURL Requests

```bash
# Register
curl -X POST http://localhost:4000/users/register -H "Content-Type: application/json" -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john.doe@example.com","password":"securePassword123"}'

# Login
curl -X POST http://localhost:4000/users/login -H "Content-Type: application/json" -d '{"email":"john.doe@example.com","password":"securePassword123"}'

# Profile
curl -X GET http://localhost:4000/users/profile -H "Authorization: Bearer JWT_TOKEN_HERE"

# Logout
curl -X GET http://localhost:4000/users/logout -H "Authorization: Bearer JWT_TOKEN_HERE"
```

---

# 🚖 DRIVER API

## 📄 Description

### ✅ `/drivers/register`

- Validates fullname, email, password, and vehicle details
- Hashes password securely with bcrypt
- Stores driver in database

### ✅ `/drivers/login`

- Validates email and password
- Compares hashed password
- Returns JWT token and sets as HTTP-only cookie (`driver_token` recommended)

### ✅ `/drivers/profile`

- Returns driver profile
- Requires JWT in cookie or Authorization header

### ✅ `/drivers/logout`

- Clears driver token cookie
- Blacklists token

---

## 📥 Request Bodies

### `/drivers/register`

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "driver.john@example.com",
  "password": "driverSecure123",
  "vehicle": {
    "color": "red",
    "plate": "WB12AB3456",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### `/drivers/login`

```json
{
  "email": "driver.john@example.com",
  "password": "driverSecure123"
}
```

---

## 🔐 Field Requirements

| Field               | Type   | Required | Description          |
| ------------------- | ------ | -------- | -------------------- |
| fullname.firstname  | String | ✅ Yes    | Driver first name    |
| fullname.lastname   | String | ✅ Yes    | Driver last name     |
| email               | String | ✅ Yes    | Valid email          |
| password            | String | ✅ Yes    | Minimum 6 characters |
| vehicle.color       | String | ✅ Yes    | Vehicle color        |
| vehicle.plate       | String | ✅ Yes    | Unique plate number  |
| vehicle.capacity    | Number | ✅ Yes    | Minimum 1 seat       |
| vehicle.vehicleType | String | ✅ Yes    | car, bike, or auto   |

---

## ✅ Success Responses

``** → 201 Created**

```json
{
  "message": "Driver registered successfully",
  "driver": { "id": "64f0...", "email": "driver.john@example.com", "fullname": { "firstname": "John", "lastname": "Doe" }, "vehicle": { "color": "red", "plate": "WB12AB3456", "capacity": 4, "vehicleType": "car" } },
  "token": "JWT_TOKEN_HERE"
}
```

``** → 200 OK**

```json
{
  "message": "Login successful",
  "driver": { "id": "64f0...", "email": "driver.john@example.com", "fullname": { "firstname": "John", "lastname": "Doe" }, "vehicle": { "color": "red", "plate": "WB12AB3456", "capacity": 4, "vehicleType": "car" } },
  "token": "JWT_TOKEN_HERE"
}
```

---

## ❌ Error Responses

- **400 Bad Request**

```json
{
  "errors": [{ "msg": "Vehicle plate is required", "param": "vehicle.plate", "location": "body" }]
}
```

- **401 Unauthorized**

```json
{ "error": "Invalid credentials" }
```

or

```json
{ "error": "Token is blacklisted" }
```

---

## 📎 Example cURL Requests

```bash
# Register
curl -X POST http://localhost:4000/drivers/register -H "Content-Type: application/json" -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"driver.john@example.com","password":"driverSecure123","vehicle":{"color":"red","plate":"WB12AB3456","capacity":4,"vehicleType":"car"}}'

# Login
curl -X POST http://localhost:4000/drivers/login -H "Content-Type: application/json" -d '{"email":"driver.john@example.com","password":"driverSecure123"}'

# Profile
curl -X GET http://localhost:4000/drivers/profile -H "Authorization: Bearer JWT_TOKEN_HERE"

# Logout
curl -X GET http://localhost:4000/drivers/logout -H "Authorization: Bearer JWT_TOKEN_HERE"
```

---

# 🛠 Developer Notes

- Add `JWT_SECRET` in `.env`
- Passwords hashed using `bcrypt`
- JWT expiry: Users → 1 hour, Drivers → 24 hours
- Blacklisted tokens auto-expire in 24 hours
- Recommended: Use separate cookies for user (`token`) and driver (`driver_token`) to avoid conflicts

