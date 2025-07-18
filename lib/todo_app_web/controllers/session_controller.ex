defmodule TodoAppWeb.SessionController do
  use TodoAppWeb, :controller
  alias TodoApp.Accounts
  alias TodoApp.Auth.Guardian

  def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        {:ok, token, _} = Guardian.encode_and_sign(user)
        json(conn, %{token: token})
      {:error, _} ->
        conn |> put_status(:unauthorized) |> json(%{error: "invalid credentials"})
    end
  end
end
