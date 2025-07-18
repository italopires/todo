defmodule TodoAppWeb.TaskController do
  use TodoAppWeb, :controller

  alias TodoApp.Todo
  alias TodoApp.Todo.Task

  action_fallback TodoAppWeb.FallbackController

  def index(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    tasks = Todo.list_tasks_by_user(user.id)
    render(conn, :index, tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    user = Guardian.Plug.current_resource(conn)

    task_params = Map.put(task_params, "user_id", user.id)

    with {:ok, %Task{} = task} <- Todo.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", "/api/tasks/#{task.id}")
      |> render(:show, task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Todo.get_task!(id)

    with :ok <- authorize_user!(conn, task) do
      render(conn, :show, task: task)
    end
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Todo.get_task!(id)

    with :ok <- authorize_user!(conn, task),
      {:ok, _task} <- Todo.update_task(task, task_params) do
      render(conn, :show, task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Todo.get_task!(id)

    with :ok <- authorize_user!(conn, task),
      {:ok, _task} <- Todo.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end

  defp authorize_user!(conn, %Task{user_id: user_id}) do
    current_user = Guardian.Plug.current_resource(conn)

    if user_id == current_user.id do
      :ok
    else
      conn
      |> put_status(:forbidden)
      |> json(%{error: "You are not authorized."})
      |> halt()
    end
  end
end
