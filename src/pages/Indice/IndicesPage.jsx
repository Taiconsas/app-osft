import React, { useState, useEffect, useCallback } from 'react'; 
import Select from 'react-select';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

import IndiceDetail from '../../components/Indices/IndiceDetail.component';
import { API_BASE } from "../../api";

const IndicesPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [indice, setIndice] = useState(null);
  const [filter, setFilter] = useState([]);
  const [ocupacionSelected, setOcupacionSelected] = useState('');

  useEffect(() => { fetchFilter(); }, []);
  useEffect(() => { 
    if (!(Object.entries(props.match.params).length === 0)) {
      setOcupacionSelected(props.match.params.id.replace('+', '').trim());
    }
    fetchData();
  }, [ocupacionSelected]);

  const handler = useCallback((event) => {
    if (event != null) {
      props.match.params = [];
      setOcupacionSelected(event._id);
    } else {
      setIndice(null);
      setOcupacionSelected('');
    }
  }, []);

  const fetchData = () => {
    if (ocupacionSelected !== '' && ocupacionSelected !== "-1") {
      setIsLoading(true);
      axios.get(`${API_BASE}/indices/${ocupacionSelected}`)
        .then(res => { 
          setIndice(res.data[0]); 
          setIsLoading(false); 
        })
        .catch(err => { 
          console.log(err); 
          setIndice({}); 
          setIsLoading(false); 
        });
    }
  };

  const fetchFilter = () => {
    axios.get(`${API_BASE}/indicesFilter`)
      .then(res => { setFilter(res.data); setIsLoading(false); })
      .catch(err => { console.log(err); setFilter([]); setIsLoading(false); });
  };

  const customFilter = (option, searchText) => option.label.toLowerCase().includes(searchText.toLowerCase());

const generatePDF = () => {
  if (!indice) return;

  const doc = new jsPDF("p", "pt", "a4");
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let yOffset = margin;

  const lineHeight = 16;

  const checkPageBreak = (height) => {
    if (yOffset + height > pageHeight - margin) {
      doc.addPage();
      yOffset = margin;
    }
  };

  const drawSectionBox = (title, items, renderItem) => {
    if (!items || items.length === 0) return;

// Header
checkPageBreak(30);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.setTextColor(255, 255, 255);
doc.setFillColor(28, 82, 172);
doc.rect(margin, yOffset, contentWidth, 20, "F");
doc.text(title, margin + 6, yOffset + 14);

// Agregar espacio extra antes de que inicie el texto
yOffset += 30 + 6; // 25 altura del header + 6px de padding interno

    // Section content
    items.forEach(item => {
      const text = renderItem(item);
      const lines = doc.splitTextToSize(text, contentWidth - 12); // dejar padding interno
      checkPageBreak(lines.length * lineHeight + 6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(lines, margin + 6, yOffset); // respeta margen izquierdo
      yOffset += lines.length * lineHeight + 6;
    });

    yOffset += 10; // espacio extra después de sección
  };

  // --- Título principal ---
  let lines = doc.splitTextToSize(indice.nombre_cuoc_indice || "Ocupación", contentWidth);
  checkPageBreak(lines.length * 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(lines, margin, yOffset);
  yOffset += lines.length * 20;

  // Código
  lines = doc.splitTextToSize(`Código: ${indice.cod_indice || ""}`, contentWidth);
  checkPageBreak(lines.length * lineHeight);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(lines, margin, yOffset);
  yOffset += lines.length * 18;

  // Secciones
  drawSectionBox("Ocupación", indice.ocupacion02, (item) => {
    let compText = "";
    if (indice.competencia11 && indice.competencia11.length > 0) {
      const comp = indice.competencia11[0];
      compText = `\nNivel Competencia: ${comp.nivel_competencia_cuoc} - ${comp.descriptor_nivel_competencia_cuoc}`;
    }
    return `${item.descripcion_ocupacion}${compText}`;
  });

  drawSectionBox("Áreas de Cualificación", indice.areas, (a) => `${a.sigla_area_cualificacion} - ${a.nombre_area_cualificacion}`);

  drawSectionBox("Conocimientos", indice.conocimiento05, (c) => `${c.nombre_conocimiento} (ID: ${c.id_conocimiento})`);

  drawSectionBox("Funciones", indice.funciones04, (f) => `Función ${f.consecutivo_funcion}: ${f.redaccion_funcion}`);

  drawSectionBox("Ocupaciones Afines", indice.ocupacion_afin07, (o) => `${o.nombre_ocupacion_afin} (Código: ${o.ocupacion_afin})`);

  drawSectionBox("Denominaciones", indice.denominaciones03, (d) =>
    `${d.nombre_denominacion} (Denominación: ${d.denominacion})\nFuente: ${d.fuente_denominacion} - Código CIUO: ${d.codigo_ciuo || 'N/A'}`
  );

  drawSectionBox("Destrezas", indice.destreza06, (d) =>
    `${d.nombre_destreza} (Código: ${d.id_destreza})\n${d.descripcion_destreza}`
  );

  doc.save(`${indice.nombre_cuoc_indice || "ocupacion"}.pdf`);
};


  // ================= RENDER =================
  return (
    <main>
      <br />
      <div className="form-group">
        <Select
          className="search-index"
          placeholder="Seleccione una ocupación..."
          getOptionLabel={option => `${option.cod_indice} - ${option.nombre_cuoc_indice}`}
          getOptionValue={option => `${option._id}`}
          filterOption={customFilter}
          isClearable
          isSearchable
          onChange={handler}
          options={filter}
          theme={(theme) => ({
            ...theme,
            borderRadius: "15px",
            colors: { ...theme.colors, primary25: '#96b3ff', primary: '#96b3ff' }
          })}
        />
      </div>
      <iframe 
  src="https://chat.openai.com/chat" 
  width="100%" 
  height="500px">
</iframe>
      <br />
      {isLoading ? (
        <p>Loading indices...</p>
      ) : (
        indice ? (
          <>
            <IndiceDetail indice={indice} />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={generatePDF}
                style={{
                  backgroundColor: "#2c3e50",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginBottom: "20px"
                }}
              >
                Descargar PEP en PDF
              </button>
            </div>
          </>
        ) : <p>Seleccione una ocupación.</p>
      )}
    </main>
  );
};

export default IndicesPage;
