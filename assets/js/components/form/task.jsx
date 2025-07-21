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
        <p className='fs-5 text-center text-danger'>{messageError}</p>
      ) : null}

      <div className='row'>
        <div className='col-12'>
          <div className='mb-3'>
            <label htmlFor='taskTitle' className='form-label fw-bold'>Title</label>
            <input
              type='text'
              className='form-control'
              id='taskTitle'
              onChange={(event) => setTitle(event.target.value)}
              value={title} />
          </div>
        </div>

        <div className='col-12'>
          <div className='mb-3'>
            <label htmlFor='taskBody' className='form-label fw-bold'>Body</label>
            <textarea
              className='form-control'
              id='taskBody'
              onChange={(event) => setBody(event.target.value)}
              value={body}></textarea>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <button
            type='button'
            className='btn btn-primary fw-bold mb-3 me-3'
            onClick={handleSaveTask}>Save</button>
          <button
            type='button'
            className='btn btn-primary fw-bold mb-3 me-3'
            disabled={title === '' && body === ''}
            onClick={handleClearForm}>Clear</button>
        </div>
      </div>
    </>
  )
}