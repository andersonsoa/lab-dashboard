import { Link, useResolvedPath } from "react-router-dom";
import {
  TbBoxSeam,
  TbBuildingBank,
  TbBuildingWarehouse,
  TbClipboardCheck,
  TbSettingsCog,
  TbShoppingCart,
  TbUserBolt,
  TbUserDollar,
  TbUsersGroup,
} from "react-icons/tb";
import { Nav } from "@/components/Nav";

const navLinks = [
  {
    to: "almoxarifado",
    text: "Almoxarifado",
    Icon: TbBuildingWarehouse,
  },
  {
    text: "Cadastro Geral",
    to: "cadastro-geral",
    Icon: TbUsersGroup,
    submenus: [
      {
        to: "cadastro-geral/pessoa-fisica",
        text: "Pessoa Fisica",
        Icon: TbUserBolt,
      },
      {
        to: "cadastro-geral/pessoa-juridica",
        text: "Pessoa Juridica",
        Icon: TbUserDollar,
      },
    ],
  },
  {
    to: "compras",
    text: "Compras",
    Icon: TbShoppingCart,
  },
  {
    to: "inventario",
    text: "Inventário",
    Icon: TbClipboardCheck,
  },
  {
    to: "patrimonio",
    text: "Patrimônio",
    Icon: TbBuildingBank,
    submenus: [
      {
        to: "patrimonio/bens",
        text: "Bens",
        Icon: TbBoxSeam,
      },
    ],
  },
  {
    to: "configuracoes",
    text: "Configurações",
    Icon: TbSettingsCog,
  },
];

export function Sidebar() {
  const routes = useResolvedPath(location.pathname);

  return (
    <div className="h-full bg-zinc-50 dark:bg-transparent max-w-[280px] w-full border-r dark:border-r-zinc-800/50 border-r-zinc-200 shadow-lg dark:bg-zinc-800">
      <header className="px-4 h-20 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-10" />
          <h1 className="text-lg font-bold italic font-roboto uppercase">
            Power Dashboard
          </h1>
        </Link>
      </header>
      <div className="border-b border-b-zinc-100 dark:border-b-zinc-800/50 mx-4" />
      <div className="p-4">
        <p className="text-xs px-2 text-zinc-500 uppercase mb-4">Principal</p>
        <Nav.Root>
          {navLinks.map((nl) =>
            !nl.submenus ? (
              <Nav.Link key={nl.to} to={nl.to} icon={nl.Icon}>
                {nl.text}
              </Nav.Link>
            ) : (
              <Nav.SubmenuRoot
                key={nl.text}
                defaultOpen={routes.pathname.includes(nl.to)}
              >
                <Nav.SubmenuButton text={nl.text} icon={nl.Icon} />
                <Nav.SubmenuContent>
                  {nl.submenus &&
                    nl.submenus.map((sb) => (
                      <Nav.Link key={sb.to} to={sb.to} icon={sb.Icon}>
                        {sb.text}
                      </Nav.Link>
                    ))}
                </Nav.SubmenuContent>
              </Nav.SubmenuRoot>
            ),
          )}
        </Nav.Root>
      </div>
    </div>
  );
}
