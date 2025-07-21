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
    <p>No data</p>
  ) : tasks.map((task) => (
    <div key={task.id}>
      <div>
        <h5>{task.title}</h5>
        <p>{task.body}</p>
      </div>
      <div>
        <button
          type='button'
          onClick={() => loadTask(task)}>Edit</button>
        <button
          type='button'
          onClick={() => handleDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  ))
}