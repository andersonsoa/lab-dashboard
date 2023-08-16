import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

type TLogin = z.infer<typeof schema>;

export function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<TLogin>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: TLogin) {
    auth.signIn({
      payload: data,
      cb: () => navigate("/dashboard"),
    });
  }

  if (auth.signed) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center pt-10">
      <div className="w-[340px] rounded bg-zinc-900 border border-zinc-800 shadow-lg p-4">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <img src="/logo.svg" alt="Logo" className="w-24 mx-auto py-4" />

          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-xs text-zinc-300 mb-1">E-Mail</span>
              <input
                className="text-zinc-800 w-full px-2 py-1 rounded shadow"
                type="text"
                placeholder="foo@example.com"
                {...register("email")}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-xs text-zinc-300 mb-1">Senha</span>
              <input
                className="text-zinc-800 w-full px-2 py-1 rounded shadow"
                type="password"
                placeholder="****"
                {...register("password")}
              />
            </label>
          </div>

          <div className="flex">
            <button className="bg-blue-900 font-semibold uppercase shadow hover:brightness-110 transition-all flex-1 h-10 rounded">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
