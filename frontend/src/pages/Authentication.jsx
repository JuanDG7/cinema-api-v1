import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Response("metieron cualquiera en el query parameter", {
      status: 404,
    });
  }

  const data = await request.formData();
  const authData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8000/api/auth/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw new Response("Error al autenticar", { status: 500 });
  }

  const resData = await response.json();
  console.log("Respuesta del servidor:", resData); // para ver qué devuelve el backend

  localStorage.setItem("token", resData.token); // 👈 GUARDAR el token
  return redirect("/movies");
}
