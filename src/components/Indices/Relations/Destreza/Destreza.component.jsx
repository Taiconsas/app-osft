import React from 'react';

const Destreza = ({ destreza }) => {
  const { id_destreza, nombre_destreza, descripcion_destreza } = destreza;

  return (
    <div>
      - <b>( Código: {id_destreza} nombre: {nombre_destreza} )</b>  {descripcion_destreza}.
    </div>
  );
};

export default Destreza;