import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export function PessoaFisica() {
  const [items, setItems] = useState<
    { id: number; name: string; email: string }[]
  >([]);

  useEffect(() => {
    api.get("/cadastro-geral/pessoa-fisica").then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div className="">
      <h1 className="text-lg mb-2">Pessoa Fisica</h1>

      <div className="space-y-2 flex-1">
        {items.map((item) => (
          <div key={item.id} className="bg-white text-zinc-900 p-4 rounded">
            <p className="font-bold">{item.name}</p>
            <p className="text-zinc-600 text-xs">{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
