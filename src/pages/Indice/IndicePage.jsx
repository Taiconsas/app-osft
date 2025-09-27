import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner/spinner';
import Ocupacion from '../../components/Indices/Relations/Ocupacion/Ocupacion.component';
import Conocimiento from '../../components/Indices/Relations/Conocimiento/Conocimiento.component';
import AreaCualificacion from '../../components/Indices/Relations/AreaCualificacion/AreaCualificacion.component';
import Funciones from '../../components/Indices/Relations/Funcion/Funcion.component';
import OcupacionAfin from '../../components/Indices/Relations/OcupacionAfin/OcupacionAfin.component';
import Denominacion from '../../components/Indices/Relations/Denominacion/Denominacion.component';

import './IndicePage.css';
import { API_BASE } from "../../api";

const IndicePage = (props) => {
  const [indice, setIndice] = useState({});
  const [ocupacion, setOcupacion] = useState([]);
  const [conocimiento, setConocimiento] = useState([]);
  const [areaCualificacion, setAreaCualificacion] = useState([]);
  const [funciones, setFunciones] = useState([]);
  const [ocupacionAfin, setOcupacionAfin] = useState([]);
  const [denominacionOcupacion, setDenominacionOcupacion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const value = props.match.params.id.replace('+', '').trim();
    const url = `${API_BASE}/indices/${value}`;

    axios.get(url)
      .then(res => {
        const data = res.data[0] || {};
        setIndice(data);

        setOcupacion(data.ocupacion02 || []);
        setConocimiento(data.conocimiento05 || []);
        setAreaCualificacion(data.ocupacion_area_cualificacion13 || data.area_cualificacion08 || []);
        setFunciones(data.funciones04 || []);
        setOcupacionAfin(data.ocupacion_afin07 || []);
        setDenominacionOcupacion(data.denominaciones03 || []);

        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        props.onError('Loading the indice failed. Please try again later');
      });
  }, [props.match.params.id, props]);

  if (isLoading) return <Spinner />;
  if (!indice.cod_indice) return <p>No se encontró información</p>;

  return (
    <Fragment>
      <main className="indice-page">
        <h1>Índice Profesional</h1>

        <fieldset className="form-section">
          <legend>Información General</legend>
          <div className="form-group">
            <label>Código Índice:</label>
            <span>{indice.cod_indice}</span>
          </div>
          <div className="form-group">
            <label>Nombre de la ocupación:</label>
            <span>{indice.nombre_cuoc_indice}</span>
          </div>
          <div className="form-group">
            <label>Índice gran grupo:</label>
            <span>{indice.indice_gran_grupo}</span>
          </div>
          <div className="form-group">
            <label>Índice subgrupo principal:</label>
            <span>{indice.indice_subgrupo_ppal}</span>
          </div>
          <div className="form-group">
            <label>Índice subgrupo:</label>
            <span>{indice.indice_subgrupo}</span>
          </div>
          <div className="form-group">
            <label>Índice perfil ocupacional:</label>
            <span>{indice.indice_perfil_ocupacional}</span>
          </div>
          <div className="form-group">
            <label>Índice grupo primario:</label>
            <span>{indice.indice_grupo_primario}</span>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Descripción de la Ocupación</legend>
          {ocupacion.length > 0 ? (
            ocupacion.map(item => <Ocupacion key={item.cod_indice} ocupacion={item} />)
          ) : (
            <p>No hay información disponible</p>
          )}
        </fieldset>

        <fieldset className="form-section">
          <legend>Área de Cualificación</legend>
          {areaCualificacion.length > 0 ? (
            areaCualificacion.map(item => <AreaCualificacion key={item.codigo_area_cualificacion} area={item} />)
          ) : (
            <p>No hay información disponible</p>
          )}
        </fieldset>

        <fieldset className="form-section">
          <legend>Conocimientos</legend>
          {conocimiento.length > 0 ? (
            conocimiento.map(item => <Conocimiento key={item.id_conocimiento} conocimiento={item} />)
          ) : (
            <p>No hay información disponible</p>
          )}
        </fieldset>

        <fieldset className="form-section">
          <legend>Funciones</legend>
          {funciones.length > 0 ? (
            funciones.map(item => <Funciones key={item.consecutivo_funcion} funcion={item} />)
          ) : (
            <p>No hay información disponible</p>
          )}
        </fieldset>

        <fieldset className="form-section">
          <legend>Ocupaciones Afines</legend>
          {ocupacionAfin.length > 0 ? (
            ocupacionAfin.map(item => <OcupacionAfin key={item.ocupacion_afin} ocupacion={item} />)
          ) : (
            <p>No hay información disponible</p>
          )}
        </fieldset>

        <fieldset className="form-section">
          <legend>Denominaciones</legend>
          {denominacionOcupacion.length > 0 ? (
            denominacionOcupacion.map(item => <Denominacion key={item.denominacion} denominacionOcu={item} />)
          ) : (
            <p>No hay información disponible</p>
          )}
        </fieldset>
      </main>
    </Fragment>
  );
};

export default IndicePage;
