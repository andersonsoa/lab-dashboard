import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div className="grid place-content-center min-h-screen">
      <Link to="/login" className="bg-blue-600 px-3 py-1 rounded-lg">
        Entrar no E-Estado
      </Link>
    </div>
  );
}
