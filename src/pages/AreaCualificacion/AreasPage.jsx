import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select'
import axios from 'axios';

import Indices from '../../components/Indices/Indices.component';
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

  const handler = useCallback(
    (event) => {
      if (event != null) {
        setAreaSelected(event._id);
      } else {
        setArea(null);
        setAreaSelected('');
      }
    },
  );

  // const indiceDeleteHandler = (indiceId) => {
  //   axios
  //     .delete('http://localhost:3200/indices/' + indiceId)
  //     .then(result => {
  //       console.log(result);
  //       this.fetchData();
  //     })
  //     .catch(err => {
  //       this.props.onError(
  //         'Deleting the area failed. Please try again later'
  //       );
  //       console.log(err);
  //     });
  // };

  const fetchData = () => {
    if (areaSelected !== '' && areaSelected !== "-1") {
      const url = `https://app-osft-taicon.herokuapp.com/indicesArea/${areaSelected}`;
      axios
        .get(url)
        .then(areasResponse => {
          //console.log("Ocupaciones: ",JSON.stringify(areasResponse.data[0]));
          setArea(areasResponse.data[0]);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setArea({});
          setIsLoading(false);
          this.props.onError('Loading Ocupaciones failed. Please try again later');
        });
    }
  };

  const fetchFilter = () => {
    axios
      .get('https://app-osft-taicon.herokuapp.com/areasFilter')
      .then(areasResponse => {
        //console.log("Areas: ", JSON.stringify(areasResponse.data))
        setFilter(areasResponse.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("Error:",err);
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
        <Select
          placeholder="Seleccione una area de calualificación..."
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
          //   <Indices
          //   indices={indices}
          //   filter={filter}
          //   handler={handler}
          // /> 
          <AreaDetail indice={area}  />
        ) : (
          <p>Seleccione una area de cualificacion.</p>
        ))} 
    </main>
  );
};

export default AreasPage;