import { useEffect, useState } from "react";
import axios from "axios";

export function useCustomState() {
  const [arrays, setArrays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/arrays", {
          mode: "cors",
        });
        const data = response.data;
        const sortedData = [...data].sort((a, b) => a.order - b.order);
        setArrays(sortedData);
        // const dataArray = Array.isArray(sortedData) ? sortedData : [];
        // setArrays(dataArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };

    fetchData();
  }, [setArrays]);

  return { arrays };
}
