'use client'

import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { useAuth } from '../../context/auth'

export default function FormSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageError, setMessageError] = useState('')
  const { setToken } = useAuth()

  const handleSignIn = () => {
    if (!email ||!password) {
      setMessageError('Please, fill the fields');
      return;
    } else {
      setMessageError('');
      fetch('/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(async (response) => {
        const result = await response.json()
        if (!response.ok) {
          setMessageError(result.error);
        } else {
          setToken(result.token)
          router.visit('/');
        }
      })
    }
  }

  return (
    <div className='card w-50'>
      <div className='card-body'>
        <h1 className='text-center fw-bold'>Sign In</h1>
        <h3 className='text-center text-secondary mb-3'>Fill your credentials</h3>

        {messageError ? (
          <p className='fs-5 text-center text-danger'>{messageError}</p>
        ) : null}

        <div className='mb-3'>
          <label htmlFor='signInEmail' className='form-label fw-bold'>Email</label>
          <input
            type='email'
            className='form-control'
            id='signInEmail'
            onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor='signInPassword' className='form-label fw-bold'>Password</label>
          <input
            type='password'
            className='form-control'
            id='signInPassword'
            onChange={(event) => setPassword(event.target.value)} />
        </div>

        <div className='mb-3 d-flex justify-content-center'>
          <button
            type='button'
            className='btn btn-primary fw-bold w-50'
            onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  )
}
