import React, { useEffect, useState } from "react";

const MiApi = ({ searchTerm }) => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://mindicador.cl/api"; // aca realizo el llamado a mi api para obtener los datos necesarios
        const response = await fetch(apiUrl);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          throw new Error("La solicitud no fue exitosa");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = Object.keys(data)
        .map((key) => data[key])
        .filter((item) => {
          return (
            (item.codigo === "dolar" ||
              item.codigo === "euro" ||
              item.codigo === "utm" ||
              item.codigo === "ipc" ||
              item.codigo === "uf") &&
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) //mediante el hooks useEffect  filtro los datos que necesito mediante condicionales para mostrar en mi tabla
          );
        })
        .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Utilizo el metodo Sort para ordenarlos alfabéticamente por nombre
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  if (!filteredData) {
    return <div>Cargando...</div>;
  }

  return <Indicador filteredData={filteredData} />; // aca llamo la funcion filter data para mostrar los datos filtrados
};

const Indicador = ({ filteredData }) => {
  // creo el componente indicador donde voy a renderizar los datos obtenidos
  return (
    <>
      <table className="table me-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Unidad de Medida</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.codigo}</td>
              <td>{formatDate(item.fecha)}</td>
              <td>{item.unidad_medida}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const formatDate = (dateString) => {
  // creo la constante formatDate para darle el formato deseado a la fecha.
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};

export default MiApi;
