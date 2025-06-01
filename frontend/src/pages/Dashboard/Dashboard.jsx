import { useEffect, useState } from "react";
import { authFetch } from "../../utils/api";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const res = await authFetch("http://localhost:5000/api/protected");
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage("Acesso negado");
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}
