import { User } from "@/context/auth";
import { TokenError } from "@/lib/server/error";
import { jwt } from "@/lib/server/mocks";
import { Response, createServer } from "miragejs";
import { faker } from "@faker-js/faker";

const USER = {
  id: "aos2k3o0444",
  name: "Anderson Soares",
  email: "anderson.ceu@gmail.com",
  password: "123#123",
};

export function createMockServer({ environment = "test" }) {
  const server = createServer({
    environment,
    routes() {
      this.urlPrefix = "http://localhost:5173";
      this.namespace = "api";
      this.get("/me", (_schema, req) => {
        const token = req.requestHeaders["Authorization"];
        if (!token) throw new TokenError();
        const user = jwt.verify<User>(token);
        return user;
      });

      this.post("/auth", (_schema, req) => {
        const { email, password } = JSON.parse(req.requestBody);

        if (email !== USER.email || password !== USER.password) {
          throw new Error("invalid credentials");
        }

        const payload = {
          id: USER.id,
          name: USER.name,
          email: USER.email,
        };

        const token = jwt.sign(payload);

        return {
          user: payload,
          token,
        };
      });

      this.get("/almoxarifado/items", async (_schema, req) => {
        try {
          const token = req.requestHeaders["Authorization"];
          if (!token) throw new TokenError();

          jwt.verify<User>(token);

          return [{ id: "d92hh", name: "Panela" }];
        } catch (e) {
          return e as Response;
        }
      });

      this.get("/cadastro-geral/pessoa-fisica", async (_schema, req) => {
        try {
          const token = req.requestHeaders["Authorization"];
          if (!token) throw new TokenError();

          jwt.verify<User>(token);

          return Array.from({ length: 20 }).map((_, idx) => ({
            id: idx + 1,
            name: faker.person.fullName(),
            email: faker.internet.email(),
          }));
        } catch (e) {
          return e as Response;
        }
      });

      this.get("/cadastro-geral/pessoa-juridica", async (_schema, req) => {
        try {
          const token = req.requestHeaders["Authorization"];
          if (!token) throw new TokenError();

          jwt.verify<User>(token);

          return [{ id: "d92hh", name: "Panela" }];
        } catch (e) {
          return e as Response;
        }
      });
    },
  });

  server.logging = true;
  server.passthrough();

  return server;
}
