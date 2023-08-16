import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <div className="grid h-screen place-items-center">
        <div className="w-24 h-24 rounded-full border-4 border-zinc-500 border-l-transparent animate-spin" />
      </div>
    );
  }

  return <Outlet />;
}
