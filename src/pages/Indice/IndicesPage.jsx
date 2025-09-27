import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select'
import axios from 'axios';

import Indices from '../../components/Indices/Indices.component';
import IndiceDetail from '../../components/Indices/IndiceDetail.component';

const IndicesPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [indice, setIndice] = useState(null);
  const [filter, setFilter] = useState([]);
  const [ocupacionSelected, setOcupacionSelected] = useState('');


  useEffect(() => {
    fetchFilter();
  }, []);

  useEffect(() => {
    if (!(Object.entries(props["match"]["params"]).length === 0)) {
      setOcupacionSelected(props.match.params.id.replace('+', '').trim());
    }
    fetchData();
  }, [ocupacionSelected]);

  const handler = useCallback(
    (event) => {
      if (event != null) {
        props["match"]["params"] = [];
        setOcupacionSelected(event._id);
      } else {
        setIndice(null);
        setOcupacionSelected('');
      }
    },
  );

  const indiceDeleteHandler = (indiceId) => {
    axios
      .delete('https://taicon-osft-services.onrender.com/indices/' + indiceId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the indice failed. Please try again later'
        );
        console.log(err);
      });
  };

  const fetchData = () => {
    if (ocupacionSelected !== '' && ocupacionSelected !== "-1"){
      const url = `https://taicon-osft-services.onrender.com/indices/${ocupacionSelected}`;
      axios
        .get(url)
        .then(indicesResponse => {
          setIndice(indicesResponse.data[0]);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIndice({});
          setIsLoading(false);
          this.props.onError('Loading indices failed. Please try again later');
        });
    }
  };

  const fetchFilter = () => {
    axios
      .get('https://taicon-osft-services.onrender.com/indicesFilter')
      .then(indicesResponse => {
        setFilter(indicesResponse.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setFilter([]);
        setIsLoading(false);
        this.props.onError('Loading filter failed. Please try again later');
      });
  };

  const customFilter = (option, searchText) => {
    if (
      option.label.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <main>
      <br />
      <div className="form-group">
        <Select className="search-index"
          placeholder="Seleccione una ocupación..."
          getOptionLabel={option =>
            `${option.cod_indice} - ${option.nombre_cuoc_indice}`
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
        indice !== null ? (
          //   <Indices
          //   indices={indices}
          //   filter={filter}
          //   handler={handler}
          // /> 
          <IndiceDetail indice={indice} />
        ) : (
          <p>Seleccione una ocupación.</p>
        ))}
    </main>
  );
};

export default IndicesPage;