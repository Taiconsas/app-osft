import React from 'react';

const AreaCualificacion = ({ area }) => {
  const { id_area_cualificacion, nombre_area_cualificacion, sigla_area_cualificacion } = area;

  return (
    <div>
      - <b>( Código: {id_area_cualificacion} Sigla: {sigla_area_cualificacion} )</b>  {nombre_area_cualificacion}.
    </div>
  );
};

export default AreaCualificacion;