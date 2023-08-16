import { useOutletContext } from "react-router-dom";

export function Compras() {
  const outlet = useOutletContext<{ message: string }>();
  return (
    <div>
      <h2>Compras</h2>
      <p>{outlet.message}</p>
    </div>
  );
}
