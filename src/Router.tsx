import { Layout } from "@/components/Layout";
import { Almoxarifado } from "@/pages/dashboard/almoxarifado";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PessoaJuridica } from "@/pages/dashboard/cadastro-geral/PessoaJuridica";
import { PessoaFisica } from "@/pages/dashboard/cadastro-geral/PessoaFisica";
import { NotFound } from "@/pages/dashboard/NotFound";
import { Compras } from "@/pages/dashboard/compras";
import { Home } from "@/pages/dashboard/Home";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/dashboard/Login";
import { ContextProvider } from "@/components/ContextProvider";
import { Dashboard } from "@/pages/dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "",
    element: <ContextProvider />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "dashboard",
            element: <Layout />,
            children: [
              {
                path: "",
                element: <Home />,
              },
              {
                path: "compras",
                element: <Compras />,
              },
              {
                path: "almoxarifado",
                element: <Almoxarifado />,
              },
              {
                path: "cadastro-geral/pessoa-fisica",
                element: <PessoaFisica />,
              },
              {
                path: "cadastro-geral/pessoa-juridica",
                element: <PessoaJuridica />,
              },
              {
                path: "*",
                element: <NotFound />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={routes} />;
}
