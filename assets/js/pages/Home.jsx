'use client'

import React, { useState, useEffect } from 'react'
import FormTask from '../components/form/task'
import ListTasks from '../components/listTasks'
import { useAuth } from '../context/auth'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [messageError, setMessageError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    fetch('/v1/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(async (res) => {
      const data = (await res.json()).data
      setTasks(data)
    })
  }, [])

  return (
    <main className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='text-center fw-bold my-4'>Tasks</h1>
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

      <div className='row'>
        <div className='col-12 mb-3'>
          <h1 className='fw-bold my-4'>List</h1>
        </div>

        <div className='col-12'>
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