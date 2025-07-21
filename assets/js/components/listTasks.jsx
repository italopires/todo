'use client'

import React from "react";
export default function ListTasks({
  tasks,
  setTasks,
  setId,
  setTitle,
  setBody,
  setMessageError,
  token
}) {
  const loadTask = (task) => {
    setId(task.id)
    setTitle(task.title)
    setBody(task.body)
  }

  const handleDeleteTask = (taskId) => {
    fetch(`/v1/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(async (response) => {
      if (response.status !== 204) {
        const result = await response.json()
        setMessageError(result.error)
      } else {
        setTasks(tasks.filter((t) => t.id !== taskId))
      }
    })
  }

  return tasks.length === 0 ? (
    <p className='fs-4 text-center'>No data</p>
  ) : tasks.map((task) => (
    <div key={task.id} className='card mb-3'>
      <div className='card-body'>
        <h5 className='card-title fw-bold'>{task.title}</h5>
        <p className='card-text'>{task.body}</p>
      </div>
      <div className='card-footer'>
        <button
          type='button'
          className='btn btn-outline-info btn-sm fw-bold me-3'
          onClick={() => loadTask(task)}>Edit</button>
        <button
          type='button'
          className='btn btn-outline-danger btn-sm fw-bold'
          onClick={() => handleDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  ))
}