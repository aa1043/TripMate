
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [userData, setuserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setuserData({ email, password })
    setemail('')
    setpassword('')
  }

  return (
    <div
      className="p-7 h-screen flex flex-col justify-between bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1461723198950-3f65e13bb031?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      {/* Glassmorphism container */}
      <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto">
        {/* Logo / Heading */}
        <Link to="/" className="flex items-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-900">
            TripMate ✪
          </h1>
        </Link>

        {/* Form */}
        <form onSubmit={submitHandler}>
          <label className="block mb-2 font-medium text-gray-800">
            Please Enter Your Email
          </label>
          <input
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-white/70 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition mb-6 rounded-lg px-4 py-3 w-full text-lg placeholder:text-gray-500"
            type="email"
            placeholder="Your Email Here"
          />

          <label className="block mb-2 font-medium text-gray-800">
            Please Enter Your Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="bg-white/70 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black transition mb-6 rounded-lg px-4 py-3 w-full text-lg placeholder:text-gray-500"
            type="password"
            placeholder="Your Password Here"
          />

          <button className="bg-black/80 hover:bg-black transition text-white font-semibold mb-5 rounded-lg px-4 py-3 w-full text-lg shadow-md">
            Login
          </button>

          <p className="text-center text-gray-700">
            New User?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Secondary button */}
      <div className="max-w-md w-full mx-auto">
        <Link
          to="/driver-login"
          className="bg-white/20 hover:bg-white/30 transition flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-3 text-lg backdrop-blur-md shadow-md border border-white/30"
        >
          Sign In As Driver
        </Link>
      </div>
    </div>
  )
}

export default UserLogin




