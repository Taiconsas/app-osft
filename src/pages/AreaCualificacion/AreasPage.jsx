import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { API_BASE } from "../../api";
import AreaDetail from '../../components/AreaCualificacion/AreaDetail.component';

const AreasPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [area, setArea] = useState(null);
  const [filter, setFilter] = useState([]);
  const [areaSelected, setAreaSelected] = useState('');

  useEffect(() => {
    fetchFilter();
  }, []);

  useEffect(() => {
    fetchData();
  }, [areaSelected]);

  const handler = useCallback((event) => {
    if (event != null) {
      setAreaSelected(event._id);
    } else {
      setArea(null);
      setAreaSelected('');
    }
  }, []);

  const fetchData = () => {
    if (areaSelected !== '' && areaSelected !== "-1") {
      const url = `${API_BASE}/indicesArea/${areaSelected}`;
      axios
        .get(url)
        .then(areasResponse => {
          setArea(areasResponse.data[0]);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error cargando ocupaciones:", err);
          setArea({});
          setIsLoading(false);
        });
    }
  };

  const fetchFilter = () => {
    axios
      .get(`${API_BASE}/areasFilter`)
      .then(areasResponse => {
        setFilter(areasResponse.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error cargando filtros:", err);
        setFilter([]);
        setIsLoading(false);
      });
  };

  const customFilter = (option, searchText) => {
    return option.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return (
    <main>
      <br />
      <div className="form-group">
        <Select
          placeholder="Seleccione una area de cualificación..."
          getOptionLabel={option =>
            `${option.sigla_area_cualificacion} - ${option.nombre_area_cualificacion}`
          }
          getOptionValue={option => `${option._id}`}
          filterOption={customFilter}
          isClearable={true}
          isSearchable={true}
          onChange={(event) => handler(event)}
          options={filter}
          theme={(theme) => ({
            ...theme,
            borderRadius: "15px",
            colors: {
              ...theme.colors,
              primary25: '#96b3ff',
              primary: '#96b3ff',
            }
          })}
        />
      </div>
      <br />
      {isLoading ? (
        <p>Loading indices...</p>
      ) : (
        area !== null ? (
          <AreaDetail indice={area} />
        ) : (
          <p>Seleccione una area de cualificación.</p>
        )
      )}
    </main>
  );
};

export default AreasPage;
