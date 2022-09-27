import React from 'react';

const Destreza = ({ destreza }) => {
  const { id_destreza, nombre_destreza } = destreza;

  return (
    <div>
      - <b>( Código: {id_destreza} )</b>  {nombre_destreza}.
    </div>
  );
};

export default Destreza;