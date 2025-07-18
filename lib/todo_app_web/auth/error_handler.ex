defmodule TodoAppWeb.Auth.ErrorHandler do
  import Plug.Conn

  def auth_error(conn, {_, reason}, _opts) do
    body = Jason.encode!(%{error: to_string(reason)})
    send_resp(conn, 401, body)
  end
end
