import { api } from "@/lib/api";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
};

export function Almoxarifado() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api
      .get("/almoxarifado/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => console.log("unexpected error", e));
  }, []);
  return (
    <div>
      <h2>Almoxarifado</h2>

      {items.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
