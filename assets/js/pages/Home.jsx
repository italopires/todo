'use client'

import React, { useState, useEffect } from 'react'
import FormTask from '../components/form/task'
import ListTasks from '../components/listTasks'
import { useAuth } from '../context/auth'
import { router } from '@inertiajs/react'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [messageError, setMessageError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      fetch('/v1/tasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then(async (res) => {
        const data = (await res.json()).data
        setTasks(data)
      })
    } else {
      router.visit('/sign-in')
    }
  }, [token])

  if (!token) {
    return null;
  }

  return (
    <main >
      <div>
        <div>
          <h1>Tasks</h1>
        </div>
      </div>

      <FormTask
        tasks={tasks}
        setTasks={setTasks}
        id={id}
        setId={setId}
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        messageError={messageError}
        setMessageError={setMessageError}
        token={token} />

      <div>
        <div>
          <h1>List</h1>
        </div>

        <div>
          <ListTasks
            tasks={tasks}
            setTasks={setTasks}
            setId={setId}
            setTitle={setTitle}
            setBody={setBody}
            setMessageError={setMessageError}
            token={token} />
        </div>
      </div>
    </main>
  )
}
