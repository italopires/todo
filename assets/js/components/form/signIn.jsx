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
    <div>
      <h1>Sign In</h1>
      <h3>Fill your credentials</h3>

      {messageError ? (
        <p>{messageError}</p>
      ) : null}

      <div>
        <label htmlFor='signInEmail'>Email</label>
        <input
          type='email'
          id='signInEmail'
          onChange={(event) => setEmail(event.target.value)} />
      </div>

      <div>
        <label htmlFor='signInPassword'>Password</label>
        <input
          type='password'
          id='signInPassword'
          onChange={(event) => setPassword(event.target.value)} />
      </div>

      <div>
        <button
          type='button'
          onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  )
}
