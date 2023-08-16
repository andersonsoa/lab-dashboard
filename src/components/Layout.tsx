import { FabButton } from "@/components/FabButton";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { useTheme } from "@/hooks/useTheme";
import {
  TbBellCode,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbLogout,
  TbMoon,
  TbSun,
} from "react-icons/tb";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export function Layout() {
  const auth = useAuth();
  const drawer = useDrawer();
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  if (!auth.signed) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="h-screen flex">
      {drawer.isOpen ? <Sidebar /> : null}

      <div className="flex-1  flex flex-col  h-screen">
        <header className="flex items-center justify-between px-4 h-20 shadow bg-zinc-100 dark:bg-zinc-900">
          <div className="flex gap-4 items-center">
            <button
              onClick={drawer.toggle}
              className="text-2xl hover:bg-zinc-800 transition-all text-zinc-300 p-2 rounded"
            >
              {drawer.isOpen ? (
                <TbLayoutSidebarLeftCollapse />
              ) : (
                <TbLayoutSidebarRightCollapse />
              )}
            </button>
            <div>
              <p className="dark:text-zinc-400 text-zinc-500 text-xs">
                Bem vindo,
              </p>
              <p className="text-blue-500 font-semibold">{auth.user?.name}</p>
              <p className="dark:text-zinc-300 text-zinc-400 text-xs tracking-wider">
                {auth.user?.email}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <FabButton activeColor="blue">
              <TbBellCode />
            </FabButton>
            <FabButton
              activeColor="blue"
              onClick={() => auth.signOut(() => navigate("/login"))}
            >
              <TbLogout />
            </FabButton>
            <FabButton onClick={toggleTheme} activeColor="blue">
              {theme === "light" ? <TbMoon /> : <TbSun />}
            </FabButton>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-3">
          <Outlet context={{ message: "hello" }} />
        </div>
      </div>
    </main>
  );
}
