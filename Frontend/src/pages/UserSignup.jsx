import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
   const [userData, setuserData] = useState({})
  const submitHandler = (e) => {
    e.preventDefault()
    setuserData({
      fullname:{
        firstname, 
        lastname
      },
       email, 
       password,
      })
       console.log('userData', userData);
       
    setemail('')
    setpassword('')
    setfirstname('')
    setlastname('')
  }
  return (
    <div
      className="p-6  h-screen flex flex-col justify-between bg-cover bg-center pt-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1461723198950-3f65e13bb031?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      {/* Glassmorphism container */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-md w-full mx-auto">
        {/* Logo / Heading */}
        <Link to="/" className="flex items-center mb-2">
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-900 mb-4">
            TripMate ✪
          </h1>
        </Link>

        {/* Form */}
        <form onSubmit={submitHandler}>
          <label className="block mb-1 font-medium text-gray-800">
            Please Enter Your Name
          </label>
          <div className="flex flex-col gap-3 mb-4">
            <input
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
              required
              className="bg-white/70 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition rounded-lg px-4 py-3 text-lg placeholder:text-gray-500"
              type="text"
              placeholder="Your First Name Here"
            />
            <input
              required
              value={lastname}  
              onChange={(e) => setlastname(e.target.value)}
              className="bg-white/70 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition rounded-lg px-4 py-3 text-lg placeholder:text-gray-500"
              type="text"
              placeholder="Your Surname Here"
            />
          </div>

          <label className="block mb-1 font-medium text-gray-800">
            Please Enter Your Email
          </label>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-white/70 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition mb-4 rounded-lg px-4 py-3 w-full text-lg placeholder:text-gray-500"
            type="email"
            placeholder="Your Email Here"
          />

          <label className="block mb-1 font-medium text-gray-800">
            Please Enter Your Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="bg-white/70 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition mb-10 rounded-lg px-4 py-3 w-full text-lg placeholder:text-gray-500"
            type="password"
            placeholder="Your Password Here"
          />

          <button className="bg-black/80 hover:bg-black transition text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg shadow-md">
            Register
          </button>

          <p className="text-center text-gray-900 mb-4">
            Already Registered?{' '}
            <Link to="/login" className="text-blue-800 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserSignup


