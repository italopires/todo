'use client'
import React from "react";

export default function FormTask({
  tasks,
  setTasks,
  id,
  setId,
  title,
  setTitle,
  body,
  setBody,
  messageError,
  setMessageError,
  token
}) {

  const handleSaveTask = () => {
    if (!title ||!body) {
      setMessageError('Please fill the fields.')
      return
    } else {
      setMessageError('')
      fetch(id ? `/v1/tasks/${id}` : '/v1/tasks', {
        method: id ? 'PUT' :'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({task:{ title, body }}),
      }).then(async (response) => {
        if (id) {
          if (response.status !== 200) {
            const result = await response.json()
            setMessageError(result.error)
          } else {
            const updatedTask = (await response.json()).data
            const taskIndex = tasks.findIndex((t) => t.id === updatedTask.id)

            tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask }
            setTasks(tasks)
            setId(null)
            setTitle('')
            setBody('')
          }
        } else {
          if (response.status !== 201) {
            const result = await response.json()
            setMessageError(result.error)
          } else {
            const newTask = (await response.json()).data
            setTasks([...tasks, newTask])
            setTitle('')
            setBody('')
          }
        }
      })
    }
  }

  const handleClearForm = () => {
    setId(null)
    setTitle('')
    setBody('')
  }

  return (
    <>
      {messageError ? (
        <p>{messageError}</p>
      ) : null}

      <div>
        <div>
          <div>
            <label htmlFor='taskTitle'>Title</label>
            <input
              type='text'
              id='taskTitle'
              onChange={(event) => setTitle(event.target.value)}
              value={title} />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor='taskBody'>Body</label>
            <textarea
              id='taskBody'
              onChange={(event) => setBody(event.target.value)}
              value={body}></textarea>
          </div>
        </div>
      </div>

      <div>
        <button
          type='button'
          onClick={handleSaveTask}>Save</button>
        <button
          type='button'
          disabled={title === '' && body === ''}
          onClick={handleClearForm}>Clear</button>
      </div>
    </>
  )
}