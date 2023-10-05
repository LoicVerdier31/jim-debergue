import { useEffect, useState } from "react";
import axios from "axios";

export function useCustomState() {
  // Assurez-vous que data est toujours un tableau en le convertissant si nécessaire

  const [arrays, setArrays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/arrays", {
          mode: "cors",
        });
        const data = response.data;
        const sortedData = [...arrays].sort((a, b) => a.order - b.order);
        setArrays(sortedData);
        // Assurez-vous que data est un tableau avant de le définir dans le state
        const dataArray = Array.isArray(data) ? data : [];
        setArrays(dataArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };

    fetchData(); // Appel de la fonction fetchData dans useEffect
  }, []); // Tableau de dépendances vide pour n'exécuter l'effet qu'une seule fois

  return { arrays };
}
