defmodule Mix.Tasks.CreateUser do
  use Mix.Task

  @shortdoc "Creates the first user with email and password"

  def run(_) do
    Mix.Task.run("app.start")

    email = "teste_user@todo.com"
    password = "teste_user"

    create_user(email, password)
  end

  defp create_user(email, password) do
    alias TodoApp.Accounts
    alias Bcrypt

    params = %{
      "email" => email,
      "password" => password,
      "password_hash" => Bcrypt.hash_pwd_salt(password)
    }

    case Accounts.create_user(params) do
      {:ok, user} ->
        Mix.shell().info("User created successfully: #{user.email}")

      {:error, changeset} ->
        Mix.shell().error("Failed to create user:")
        IO.inspect(changeset.errors)
    end
  end
end
