import React, { useState, useEffect } from "react";
import Select from "react-select"; // 👈 usar react-select
import "./Area.css";

const AreaDetail = ({ indice }) => {
  const [indices, setIndices] = useState([]);
  const [ocupaciones, setOcupaciones] = useState([]);
  const [selectedOcupacion, setSelectedOcupacion] = useState(null); // ahora objeto completo
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (indice) {
      setIndices(indice.indices || []);
      setOcupaciones(indice.ocupaciones || []);
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [indice]);

  // --- Generar opciones únicas de nivel ---
  const nivelOptions = Array.from(
    new Set(ocupaciones.map((ocu) => ocu?.nivel_competencia).filter(Boolean))
  ).map((nivel) => ({
    value: nivel,
    label: `Nivel ${nivel}`,
  }));

  // --- Filtro ---
  const filteredIndices = indices.filter((item, index) => {
    if (!selectedOcupacion) return true;
    return (
      ocupaciones[index]?.nivel_competencia === selectedOcupacion.value
    );
  });

  // --- Paginación ---
  const totalPages = Math.ceil(filteredIndices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredIndices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 4) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  return (
    <div className="area-detail">
      <h2 className="area-title">Ocupaciones</h2>

      {/* --- Filtro con react-select --- */}
      <Select
        placeholder="Filtrar por nivel de competencia..."
        value={selectedOcupacion}
        onChange={(option) => {
          setSelectedOcupacion(option);
          setCurrentPage(1);
        }}
        options={nivelOptions}
        isClearable
        isSearchable
        theme={(theme) => ({
          ...theme,
          borderRadius: 15,
          colors: {
            ...theme.colors,
            primary25: "#96b3ff",
            primary: "#96b3ff",
          },
        })}
      />

      {/* --- Grid de ocupaciones --- */}
      {paginatedData.length > 0 ? (
        <div className="area-grid">
          {paginatedData.map((item) => {
            const ocu = ocupaciones[indices.indexOf(item)];
            return (
              <a
                href={`/indices/${item._id}`}
                key={item._id}
                className="area-card"
              >
                <h3 className="card-title">{item.nombre_cuoc_indice}</h3>
                <p className="card-subtitle">
                  {ocu
                    ? `Nivel de competencia: ${ocu.nivel_competencia}`
                    : "Sin información de competencia"}
                </p>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="no-data">No hay datos disponibles...</p>
      )}

      {/* --- Paginación --- */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {getPageNumbers().map((num, idx) =>
            num === "..." ? (
              <span key={`ellipsis-${idx}`} className="ellipsis">
                ...
              </span>
            ) : (
              <button
                key={num}
                className={num === currentPage ? "active" : ""}
                onClick={() => goToPage(num)}
              >
                {num}
              </button>
            )
          )}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaDetail;
