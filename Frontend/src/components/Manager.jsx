import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from "uuid"

const Manager = () => {

  const passwordRef = useRef()
  const iconRef = useRef()

  const [form, setForm] = useState({
    site: '',
    username: '',
    password: ''
  })

  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem('passwords')

    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const showPassword = () => {

    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text"
      iconRef.current.innerText = "visibility_off"
    }

    else {
      passwordRef.current.type = "password"
      iconRef.current.innerText = "visibility"
    }
  }

  const savePassword = () => {

    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      const newPassword = { ...form, id: uuidv4() }

      const updatedPasswords = [...passwordArray, newPassword]

      setpasswordArray(updatedPasswords)

      localStorage.setItem('passwords', JSON.stringify(updatedPasswords))

      setForm({
        site: '',
        username: '',
        password: ''
      })

      toast.success("Password saved")

    }

    else {
      toast.error("Please fill all fields")
    }
  }

  const deletePassword = (id) => {

    let confirmDelete = confirm("Are you sure you want to delete this password?")

    if (confirmDelete) {

      const updatedPasswords = passwordArray.filter(item => item.id !== id)

      setpasswordArray(updatedPasswords)

      localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
    }
  }

  const editPassword = (id) => {

    setForm(passwordArray.filter(item => item.id === id)[0])

    const updatedPasswords = passwordArray.filter(item => item.id !== id)

    setpasswordArray(updatedPasswords)

    localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="relative pb-24">

        <div className="fixed inset-0 -z-10 min-h-screen w-full bg-blue-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>

        <div className="max-w-4xl mx-auto pt-10 px-4">

          <h1 className='text-4xl font-bold text-center mb-4'>
            <span className='text-blue-500'>&lt;</span>
            Pass
            <span className='text-blue-500'>OP/&gt;</span>
          </h1>

          <p className='text-green-900 text-lg text-center mb-6'>
            Your own password manager
          </p>

          <div className="flex flex-col p-6 text-black gap-6 items-center rounded-2xl">

            <input
              onChange={handleChange}
              value={form.site}
              name='site'
              placeholder='Enter website URL'
              className="rounded-full border border-green-600 w-full p-4 py-2 bg-white"
              type="text"
            />

            <div className="flex flex-col sm:flex-row w-full gap-4">

              <input
                onChange={handleChange}
                value={form.username}
                name='username'
                placeholder='Enter username'
                className="rounded-full border border-green-600 w-full sm:w-1/2 p-4 py-2 bg-white"
                type="text"
              />

              <div className="relative w-full sm:w-1/2">

                <input
                  ref={passwordRef}
                  onChange={handleChange}
                  value={form.password}
                  name='password'
                  placeholder="Enter password"
                  className="rounded-full border border-green-600 w-full p-4 py-2 pr-16 bg-white"
                  type="password"
                />

                <span
                  ref={iconRef}
                  onClick={showPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined cursor-pointer"
                >
                  visibility
                </span>

              </div>
            </div>

            <button
              onClick={savePassword}
              className='flex justify-center items-center gap-2 bg-green-500 rounded-full px-6 border border-green-900 py-2 w-fit hover:bg-green-300 font-semibold'
            >
              <span className="material-symbols-outlined">
                add_card
              </span>

              Save Password
            </button>

          </div>

          <div className="passwords mt-6 mb-4 overflow-x-auto">

            <h2 className="text-xl font-bold mb-3">Your passwords</h2>

            {passwordArray.length === 0 && <div>No passwords saved yet</div>}

            {passwordArray.length !== 0 &&

              <table className="table-auto w-full overflow-hidden rounded-md min-w-[700px]">

                <thead className='bg-green-800 text-white'>

                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>

                </thead>

                <tbody className='bg-green-200'>

                  {passwordArray.map((item) => {

                    return (

                      <tr key={item.id}>

                        <td className='py-2 border border-white text-center'>

                          <div className='flex items-center justify-center mx-1 gap-2'>

                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>

                            <span
                              className="material-symbols-outlined cursor-pointer mx-1 text-sm"
                              onClick={() => copyText(item.site)}
                            >
                              content_copy
                            </span>

                          </div>

                        </td>

                        <td className='py-2 border border-white text-center'>

                          <div className='flex items-center justify-center gap-2 mx-1'>

                            <span>{item.username}</span>

                            <span
                              className="material-symbols-outlined cursor-pointer text-sm mx-1"
                              onClick={() => copyText(item.username)}
                            >
                              content_copy
                            </span>

                          </div>

                        </td>

                        <td className='py-2 border border-white text-center'>

                          <div className='flex items-center justify-center gap-2'>

                            <span>{"*".repeat(item.password.length)}</span>

                            <span
                              className="material-symbols-outlined cursor-pointer mx-1 text-sm"
                              onClick={() => copyText(item.password)}
                            >
                              content_copy
                            </span>

                          </div>

                        </td>

                        <td className='py-2 border border-white text-center'>

                          <div className='flex items-center justify-center gap-2 cursor-pointer'>

                            <span
                              className="material-symbols-outlined mx-1"
                              onClick={() => editPassword(item.id)}
                            >
                              edit
                            </span>

                            <span
                              className="material-symbols-outlined mx-1"
                              onClick={() => deletePassword(item.id)}
                            >
                              delete
                            </span>

                          </div>

                        </td>

                      </tr>
                    )
                  })}

                </tbody>

              </table>
            }

          </div>

        </div>

      </div>
    </>
  )
}

export default Manager