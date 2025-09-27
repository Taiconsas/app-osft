import React, { useState, useEffect } from 'react';

// Componente genérico para secciones colapsables
const SectionToggle = ({ title, children }) => {
  const [open, setOpen] = useState(true); // abierto por defecto

  return (
    <div style={sectionStyle}>
      <div style={sectionHeaderStyle} onClick={() => setOpen(!open)}>
        {title} {open ? '▲' : '▼'}
      </div>
      {open && <div style={sectionContentStyle}>{children}</div>}
    </div>
  );
};

// Componentes individuales
const Ocupacion = ({ ocupacion, competencia }) => (
  <div style={itemStyle}>
    <p>{ocupacion.descripcion_ocupacion}</p>
    {competencia && (
      <p style={{ fontStyle: 'italic', color: '#555' }}>
        <b>Nivel Competencia:</b> {competencia.nivel_competencia_cuoc} - {competencia.descriptor_nivel_competencia_cuoc}
      </p>
    )}
  </div>
);

const AreaCualificacion = ({ area }) => (
  <div style={itemStyle}>
    <b>{area.sigla_area_cualificacion}</b>: {area.nombre_area_cualificacion}
  </div>
);

const Conocimiento = ({ conocimiento }) => (
  <div style={itemStyle}>
    <b>{conocimiento.nombre_conocimiento}</b> (ID: {conocimiento.id_conocimiento})
  </div>
);

const Funciones = ({ funcion }) => (
  <div style={itemStyle}>
    <b>Función {funcion.consecutivo_funcion}:</b> {funcion.redaccion_funcion}
  </div>
);

const OcupacionAfin = ({ ocupacion }) => (
  <div style={itemStyle}>
    <b>{ocupacion.nombre_ocupacion_afin}</b> (Código: {ocupacion.ocupacion_afin})
  </div>
);

const Denominacion = ({ denominacionOcu }) => (
  <div style={itemStyle}>
    <b>{denominacionOcu.nombre_denominacion}</b> (Denominación: {denominacionOcu.denominacion})<br />
    Fuente: {denominacionOcu.fuente_denominacion} - Código CIUO: {denominacionOcu.codigo_ciuo || 'N/A'}
  </div>
);

const Destreza = ({ destreza }) => (
  <div style={itemStyle}>
    <b>{destreza.nombre_destreza}</b> (Código: {destreza.id_destreza})<br />
    {destreza.descripcion_destreza}
  </div>
);

// Estilos generales
const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: "'Questrial', sans-serif",
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '5px',
  fontSize: '2rem',
  color: '#ffffffff',
};

const subtitleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#333',
};

const sectionStyle = {
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const sectionHeaderStyle = {
  backgroundColor: '#1c52ac',
  color: '#fff',
  padding: '12px 16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  userSelect: 'none',
};

const sectionContentStyle = {
  backgroundColor: '#f9f9f9',
  padding: '12px 16px',
};

const itemStyle = {
  padding: '8px 0',
  borderBottom: '1px solid #ddd',
};

// Componente principal
const IndiceDetail = ({ indice }) => {
  const [ocupacion, setOcupacion] = useState([]);
  const [conocimiento, setConocimiento] = useState([]);
  const [areaCualificacion, setAreaCualificacion] = useState([]);
  const [funciones, setFunciones] = useState([]);
  const [ocupacionAfin, setOcupacionAfin] = useState([]);
  const [denominacionOcupacion, setDenominacionOcupacion] = useState([]);
  const [destrezas, setDestrezas] = useState([]);
  const [competencia, setCompetencia] = useState([]);

  useEffect(() => {
    setOcupacion(indice.ocupacion02 || []);
    setConocimiento(indice.conocimiento05 || []);
    setAreaCualificacion(indice.areas || []);
    setFunciones(indice.funciones04 || []);
    setOcupacionAfin(indice.ocupacion_afin07 || []);
    setDenominacionOcupacion(indice.denominaciones03 || []);
    setDestrezas(indice.destreza06 || []);
    setCompetencia(indice.competencia11 || []);
  }, [indice]);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{indice.nombre_cuoc_indice}</h1>
      <h3 style={subtitleStyle}>Código: {indice.cod_indice}</h3>

      <SectionToggle title="Ocupación">
        {ocupacion.map((item) => (
          <Ocupacion key={item.cod_indice} ocupacion={item} competencia={competencia[0]} />
        ))}
      </SectionToggle>

      <SectionToggle title="Áreas de Cualificación">
        {areaCualificacion.map((item) => (
          <AreaCualificacion key={item._id} area={item} />
        ))}
      </SectionToggle>

      <SectionToggle title="Conocimientos">
        {conocimiento.map((item) => (
          <Conocimiento key={item.id_conocimiento} conocimiento={item} />
        ))}
      </SectionToggle>

      <SectionToggle title="Funciones">
        {funciones.map((item) => (
          <Funciones key={item.consecutivo_funcion} funcion={item} />
        ))}
      </SectionToggle>

      <SectionToggle title="Ocupaciones Afines">
        {ocupacionAfin.map((item) => (
          <OcupacionAfin key={item.ocupacion_afin} ocupacion={item} />
        ))}
      </SectionToggle>

      <SectionToggle title="Denominaciones">
        {denominacionOcupacion.map((item) => (
          <Denominacion key={item.denominacion} denominacionOcu={item} />
        ))}
      </SectionToggle>

      <SectionToggle title="Destrezas">
        {destrezas.map((item) => (
          <Destreza key={item.id_destreza} destreza={item} />
        ))}
      </SectionToggle>
    </div>
  );
};

export default IndiceDetail;
