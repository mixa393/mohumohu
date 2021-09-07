module AuthorizationSpecHelper
  def sign_in(user)
    post "/api/v1/auth/sign_in/",
         params: { email: user.email, password: user.password },
         headers: { "X-Requested-With" => "XMLHttpRequest" },
         as: :json

    res = response.headers.slice('client', 'access-token', 'uid')
    res.store("X-Requested-With", "XMLHttpRequest")
    res
  end
end