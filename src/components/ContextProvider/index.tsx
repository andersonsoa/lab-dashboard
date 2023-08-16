import { AuthProvider } from "@/components/ContextProvider/AuthProvider";
import { DrawerProvider } from "@/components/ContextProvider/DrawerProvider";
import { ThemeProvider } from "@/components/ContextProvider/ThemeProvider";
import { Outlet } from "react-router-dom";

export function ContextProvider() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DrawerProvider>
          <Outlet />
        </DrawerProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
