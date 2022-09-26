import React, { useState, useEffect } from 'react';
import Ocupacion from '../../components/Indices/Relations/Ocupacion/Ocupacion.component'
import Conocimiento from '../../components/Indices/Relations/Conocimiento/Conocimiento.component';
import AreaCualificacion from '../../components/Indices/Relations/AreaCualificacion/AreaCualificacion.component';
import Funciones from '../../components/Indices/Relations/Funcion/Funcion.component';
import OcupacionAfin from '../../components/Indices/Relations/OcupacionAfin/OcupacionAfin.component';
import Denominacion from '../../components/Indices/Relations/Denominacion/Denominacion.component';

const IndiceDetail = ({ indice }) => {
  const [ocupacion, setOcupacion] = useState({});
  const [conocimiento, setConocimiento] = useState({});
  const [areaCualificacion, setAreCualificacion] = useState({});
  const [funciones, setFunciones] = useState({});
  const [ocupacionAfin, setOcupacionAfin] = useState({});
  const [denominacionOcupacion, setDenominacionOcupacion] = useState({});

  useEffect(() => {
    console.log("indice..", indice);
    setOcupacion(indice["ocupacion02"]);
    setConocimiento(indice["conocimiento05"]);
    setAreCualificacion(indice["ocupacion_area_cualificacion13"]);
    setFunciones(indice["funciones04"]);
    setOcupacionAfin(indice["ocupacion_afin07"]);
    setDenominacionOcupacion(indice["denominaciones03"]);
  }, [indice]);

  // for (var i in indice){
  //     console.log('element', i);
  //     switch (i) {
  //       case "ocupacion02":
  //         setOcupacion(indice[i]);
  //         console.log("ocupacion02", indice[i]);
  //         break;

  //       case "conocimiento05":
  //         setConocimiento(indice[i]);
  //         break;

  //       case "ocupacion_area_cualificacion13":
  //         setAreCualificacion(indice[i]);
  //         break;
        
  //       case "area_cualificacion08":
  //         setAreCualificacion(indice[i]);
  //         break;
        
  //       case "funciones04":
  //         setFunciones(indice[i]);
  //         break;
        
  //       case "ocupacion_afin07":
  //         setOcupacionAfin(indice[i]);
  //         break;

  //       case "denominaciones03":
  //         setDenominacionOcupacion(indice[i]);
  //         break;
  //       // default:
  //       //   break;
  //     }   
  //   }

  return (
    <div>
      <h1>Código Indice: {indice.cod_indice}</h1>
      <h2>Nombre de la ocupación: {indice.nombre_cuoc_indice}</h2>
      <div>
        <b>Indice gran grupo: </b>{indice.indice_gran_grupo}<br />
        <b>Indice subgrupo principal: </b>{indice.indice_subgrupo_ppal}<br />
        <b>Indice subgrupo: </b>{indice.indice_subgrupo}<br />
        <b>Indice perfil ocupacional: </b>{indice.indice_perfil_ocupacional}<br />
        <b>Indice grupo primario: </b>{indice.indice_grupo_primario}<br />
        <br />
        <br />
        <b>Descripción de la ocupación:</b>{Array.isArray(ocupacion) ? (ocupacion).map((item) => { return <Ocupacion key={item.cod_indice} ocupacion={item} /> }) : "error desplegando ocupación, intente mas tarde.."}<br />
        <br />
        <b>Area cualificacion: </b>{Array.isArray(areaCualificacion) ? (areaCualificacion).map((item) => { return <AreaCualificacion key={item.codigo_area_cualificacion} area={item} /> }) : "error desplegando areas de conocimiento, intente mas tarde.."} <br />
        <br />
        <b>Conocimientos:</b>{Array.isArray(conocimiento) ? (conocimiento).map((item) => { return <Conocimiento key={item.id_conocimiento} conocimiento={item} /> } ) : "error desplegando conocimiento, intente mas tarde.." } <br />
        <br />
        <b>Funciones:</b>{Array.isArray(funciones) ? (funciones).map((item) => { return <Funciones key={item.consecutivo_funcion} funcion={item} /> }) : "error desplegando funciones, intente mas tarde.."} <br />
        <br />
        <b>Ocupaciones afines:</b>{Array.isArray(ocupacionAfin) ? (ocupacionAfin).map((item) => { return <OcupacionAfin key={item.ocupacion_afin} ocupacion={item} /> }) : "error desplegando ocupaciones afines, intente mas tarde.."} <br />
        <br />
        <b>Denominaciones:</b>{Array.isArray(denominacionOcupacion) ? (denominacionOcupacion).map((item) => { return <Denominacion key={item.denominacion} denominacionOcu={item} /> }) : "error desplegando ocupaciones afines, intente mas tarde.."} <br />
      </div>
    </div>
  );
};

export default IndiceDetail;