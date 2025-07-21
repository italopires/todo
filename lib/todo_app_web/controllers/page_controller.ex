defmodule TodoAppWeb.PageController do
  use TodoAppWeb, :controller

  def home(conn, _params) do
    render_inertia(conn, "Home")
  end

  def sign_in(conn, _params) do
    render_inertia(conn, "SignIn")
  end
end
