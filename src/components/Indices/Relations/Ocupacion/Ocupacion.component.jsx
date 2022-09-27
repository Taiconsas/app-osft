import React from 'react';
import './ocupacion.style.css';

const Ocupacion = ({ ocupacion, competencia }) => {
  const { descripcion_ocupacion } = ocupacion;
  const { nivel_competencia_cuoc, descriptor_nivel_competencia_cuoc  } = competencia;

  return (
    <div className='ocupacion-content'>
      {descripcion_ocupacion}
      <br/>
      <br/>
       * Nivel de competencia cuoc: {nivel_competencia_cuoc}
    </div>
  );
};

export default Ocupacion;