import React from 'react';

const Conocimiento = ({ conocimiento }) => {
  const { id_conocimiento, nombre_conocimiento } = conocimiento;

  return (
    <div>
      * <b>( {id_conocimiento} )</b>  {nombre_conocimiento}.
    </div>
  );
};

export default Conocimiento;