
````markdown
# 🚕 UBER Clone - API Documentation

This document provides a complete reference for the UBER Clone backend API, covering endpoints for both **Users** and **Drivers**. The API handles registration, authentication via JSON Web Tokens (JWT), profile management, and secure logout with token blacklisting.

---

## **Table of Contents**
1.  [User API](#-user-api)
    -   [User Endpoints](#-user-endpoints)
    -   [User Request & Response Details](#-user-request--response-details)
    -   [User Example cURL Requests](#-user-example-curl-requests)
2.  [Driver API](#-driver-api)
    -   [Driver Endpoints](#-driver-endpoints)
    -   [Driver Request & Response Details](#-driver-request--response-details)
    -   [Driver Example cURL Requests](#-driver-example-curl-requests)
3.  [Global Developer Notes](#-global-developer-notes)

---

## **👤 User API**
Handles user registration, login, and profile management.

### ➤ User Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/users/register` | Registers a new user. |
| **POST** | `/users/login` | Authenticates a user and returns a JWT. |
| **GET** | `/users/profile`| Retrieves the authenticated user's profile. |
| **GET** | `/users/logout` | Logs out the user and blacklists their token. |

<br>

### ➤ User Request & Response Details

<details>
<summary><strong>Click to expand User API Details</strong></summary>

#### **📥 Request Bodies**

**`/users/register`**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
````

**`/users/login`**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

-----

#### **🔐 Field Requirements**

**For `/users/register`**
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullname.firstname` | String | ✅ Yes | User's first name |
| `fullname.lastname` | String | ✅ Yes | User's last name |
| `email` | String | ✅ Yes | Must be a valid email address |
| `password` | String | ✅ Yes | Minimum 6 characters |

**For `/users/login`**
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | ✅ Yes | Must be a valid email address |
| `password` | String | ✅ Yes | User's password |

-----

#### **✅ Success Responses**

**`/users/register` → 201 Created**

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

**`/users/login` → 200 OK**

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

**`/users/profile` → 200 OK**

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

**`/users/logout` → 200 OK**

```json
{
  "message": "User logged out successfully"
}
```

-----

#### **❌ Error Responses**

| Status Code | Reason | Example Body |
| :--- | :--- | :--- |
| `400 Bad Request` | Input validation failed | `{"errors": [{"msg": "Email is required"}]}` |
| `401 Unauthorized` | Invalid credentials, token issues, or user not found | `{"error": "Invalid credentials"}` or `{"error": "Unauthorized access"}` |
| `500 Internal Server Error` | Duplicate email or database failure | `{"error": "User already exists"}` |

\</details\>

\<br\>

### ➤ User Example cURL Requests

**Register**

```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}'
```

**Login**

```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}'
```

**Get Profile**

```bash
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

**Logout**

```bash
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

-----

## **🚖 Driver API**

Handles driver registration, login, vehicle data, and profile management.

### ➤ Driver Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/drivers/register` | Registers a new driver and their vehicle. |
| **POST** | `/drivers/login` | Authenticates a driver and returns a JWT. |
| **GET** | `/drivers/profile`| Retrieves the authenticated driver's profile. |
| **GET** | `/drivers/logout` | Logs out the driver and blacklists their token. |

\<br\>

### ➤ Driver Request & Response Details

\<details\>
\<summary\>\<strong\>Click to expand Driver API Details\</strong\>\</summary\>

#### **📥 Request Bodies**

**`/drivers/register`**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
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

**`/drivers/login`**

```json
{
  "email": "driver.john@example.com",
  "password": "driverSecure123"
}
```

-----

#### **🔐 Field Requirements**

**For `/drivers/register`**
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullname.firstname` | String | ✅ Yes | Driver’s first name |
| `fullname.lastname`| String | ✅ Yes | Driver’s last name |
| `email` | String | ✅ Yes | Must be a valid email address |
| `password` | String | ✅ Yes | Minimum 6 characters recommended |
| `vehicle.color` | String | ✅ Yes | Vehicle color |
| `vehicle.plate` | String | ✅ Yes | Unique vehicle plate number |
| `vehicle.capacity` | Number | ✅ Yes | Seating capacity (min 1) |
| `vehicle.vehicleType` | String | ✅ Yes | One of: `car`, `bike`, `auto` |

**For `/drivers/login`**
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | ✅ Yes | Must be a valid email address |
| `password` | String | ✅ Yes | Driver’s password |

-----

#### **✅ Success Responses**

**`/drivers/register` → 201 Created**

```json
{
  "message": "Driver registered successfully",
  "driver": {
    "id": "64f0c4b3e5d13a7b37e33a09",
    "email": "driver.john@example.com",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "vehicle": { "color": "red", "plate": "WB12AB3456", "capacity": 4, "vehicleType": "car" }
  },
  "token": "JWT_TOKEN_HERE"
}
```

**`/drivers/login` → 200 OK**

```json
{
  "message": "Login successful",
  "driver": {
    "id": "64f0c4b3e5d13a7b37e33a09",
    "email": "driver.john@example.com",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "vehicle": { "color": "red", "plate": "WB12AB3456", "capacity": 4, "vehicleType": "car" }
  },
  "token": "JWT_TOKEN_HERE"
}
```

**`/drivers/profile` → 200 OK**

```json
{
  "_id": "64f0c4b3e5d13a7b37e33a09",
  "email": "driver.john@example.com",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "vehicle": { "color": "red", "plate": "WB12AB3456", "capacity": 4, "vehicleType": "car" }
}
```

**`/drivers/logout` → 200 OK**

```json
{
  "message": "Logout successful"
}
```

-----

#### **❌ Error Responses**

| Status Code | Reason | Example Body |
| :--- | :--- | :--- |
| `400 Bad Request` | Input validation failed | `{"errors": [{"msg": "Vehicle plate is required"}]}` |
| `401 Unauthorized` | Invalid credentials or token issues | `{"error": "Invalid credentials"}` or `{"error": "Token is blacklisted"}` |
| `500 Internal Server Error` | Duplicate email/plate or DB failure | `{"error": "Driver already exists with this email"}` |

\</details\>

\<br\>

### ➤ Driver Example cURL Requests

**Register**

```bash
curl -X POST http://localhost:4000/drivers/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "driver.john@example.com",
  "password": "driverSecure123",
  "vehicle": { "color": "red", "plate": "WB12AB3456", "capacity": 4, "vehicleType": "car" }
}'
```

**Login**

```bash
curl -X POST http://localhost:4000/drivers/login \
-H "Content-Type: application/json" \
-d '{
  "email": "driver.john@example.com",
  "password": "driverSecure123"
}'
```

**Get Profile**

```bash
curl -X GET http://localhost:4000/drivers/profile \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

**Logout**

```bash
curl -X GET http://localhost:4000/drivers/logout \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

-----

## **🛠️ Global Developer Notes**

  * **Environment**: Ensure your `.env` file contains a valid `JWT_SECRET`.
  * **Security**: All passwords are automatically hashed using `bcrypt` before database storage.
  * **Authentication**: Both User and Driver login endpoints return a JWT and can set a corresponding HTTP-only cookie (`user_token` or `driver_token`). Profile endpoints require this token in either the cookie or an `Authorization: Bearer <token>` header.
  * **Token Expiration**:
      * User JWTs expire after **1 hour**.
      * Driver JWTs expire after **24 hours**.
  * **Token Blacklisting**: The `logout` endpoints invalidate the current token by adding it to a `blacklistToken` collection in the database. These blacklisted tokens are automatically removed after their original expiration time.

<!-- end list -->

```
```
