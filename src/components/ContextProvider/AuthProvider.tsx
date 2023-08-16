import { User, AuthContext, SignInData } from "@/context/auth";
import { api } from "@/lib/api";
import { ReactNode, useCallback, useEffect, useState } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(({ payload, cb }: SignInData) => {
    api
      .post("/auth", payload)
      .then((res) => {
        setUser(() => ({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          token: res.data.token,
        }));
        api.defaults.headers["Authorization"] = res.data.token;
        localStorage.setItem("@app:token", res.data.token);
        cb();
      })
      .catch((err) => {
        console.error("falha ao executar o login", err);
      });
  }, []);

  const signOut = useCallback((cb: () => void) => {
    setUser(() => undefined);
    api.defaults.headers["Authorization"] = null;
    localStorage.removeItem("@app:token");
    cb();
  }, []);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.request.aborted) {
        console.log("request aborted");
      }

      if (error.request.status === 401) {
        setUser(() => undefined);
        api.defaults.headers["Authorization"] = null;
        localStorage.removeItem("@app:token");
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    console.log("loading auth context");

    const token = localStorage.getItem("@app:token");

    if (token) {
      setLoading(true);
      api.defaults.headers["Authorization"] = token;

      api
        .get("/me")
        .then((res) => {
          console.log(res.data.me);
          setUser({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            token: token,
          });
        })
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, loading, signed: !!user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
