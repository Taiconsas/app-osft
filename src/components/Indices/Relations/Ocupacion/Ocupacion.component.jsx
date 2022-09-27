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
       * Competencia: <br/>{descriptor_nivel_competencia_cuoc}
    </div>
  );
};

export default Ocupacion;