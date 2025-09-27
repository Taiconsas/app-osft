import React, { useState, useEffect } from 'react';
import Ocupacion from '../../components/Indices/Relations/Ocupacion/Ocupacion.component'


const areaDetail = ({ indice }) => {
    const [indices, setIndices] = useState({});
    const [ocupaciones, setOcupacion] = useState({});
    const [arreglo, setArreglo] = useState({});
   

    useEffect(() => {
        //console.log("indice..", indice);
        setIndices(indice["indices"]);
        setOcupacion(indice["ocupaciones"]);

        //setArreglo({...indice["indices"], ...indice["ocupaciones"] });

        // let sortedProducts = indice["ocupaciones"].sort(
        //     (p1, p2) => (p1.nivel_competencia < p2.nivel_competencia) ? 1 : (p1.nivel_competencia > p2.nivel_competencia) ? -1 : 0);

        // const arreglos = {...indice["ocupaciones"] , ...indice["indices"]};
        // console.log("Arreglos", sortedProducts);
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
            <h3>
                {Array.isArray(indices) ? (indices).map((item, index) => {
                    return (
                        <a href={'/indices/' + item._id}
                            key={item.cod_indice}>
                            <button>{ocupaciones[index].nivel_competencia} - {item.nombre_cuoc_indice}
                            </button><br />
                        </a>
                    )
                }) : "error desplegando ocupación, intente mas tarde.."}<br />
            </h3>
            <br />
        </div>
    );
};

export default areaDetail;