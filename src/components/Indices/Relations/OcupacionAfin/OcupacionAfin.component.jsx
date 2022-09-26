import React from 'react';

const OcupacionAfin = ({ ocupacion }) => {
  const { ocupacion_afin, nombre_ocupacion_afin } = ocupacion;

  return (
    <div>
      * <b>( {ocupacion_afin} )</b>  {nombre_ocupacion_afin}.
    </div>
  );
};

export default OcupacionAfin;