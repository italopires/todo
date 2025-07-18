defmodule TodoAppWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :todo_app,
    module: TodoApp.Auth.Guardian,
    error_handler: TodoAppWeb.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
