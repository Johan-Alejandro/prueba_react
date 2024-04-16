import React, { useState } from "react";
import Header from "./components/Header";
import MiApi from "./components/MiApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/*/renderizo el componente header*/}
      <Header />
      {/*/renderizo el componente api y creo un input para usarlo como buscador y filtrar los datos necesarios*/}
      <div className="container mt-4">
        <input
          type="text"
          placeholder="Buscar indicador..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />
        {/*/renderizo el componente api con el parametro searchTerm*/}
        <MiApi searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default App;
