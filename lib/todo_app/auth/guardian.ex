defmodule TodoApp.Auth.Guardian do
  use Guardian, otp_app: :todo_app
  alias TodoApp.Accounts

  def subject_for_token(user, _), do: {:ok, to_string(user.id)}
  def resource_from_claims(%{"sub" => id}), do: {:ok, Accounts.get_user!(id)}
end
