import React, { useState, useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import TextFormatter from './TextFormatter'
import uuid from 'react-uuid'


export default function Grid(props) {
  const [isloaded, setLoaded] = useState(false);
  const [gridSelected, setGridSelected] = useState([]);



  useEffect(() => {
    if (props.data && !isloaded) {
      let newArray = [];
      newArray = [...props.data]
      getRows(newArray);
      setLoaded({ isLoaded: true })
    }
  });


  useEffect(() => {
    if (props.selected.length > 0) {
      setGridSelected(gridSelected => [...gridSelected.concat(props.selected)])
    }
  }, [props.selected]);


  const getRows = (data) => {
    let rows = data;
    rows = rows.slice(4);
    convertRowsToArray(rows);
  }

  const convertRowsToArray = (rows) => {
    let newRows = [];
    rows.forEach(row => {
      const obj = {};
      obj['uid'] = uuid(); //generates a unique identifer for each row
      obj['id'] = row[1]
      obj['parity'] = row[2]
      obj['data'] = row[3]
      obj['Checksum'] = row[4]
      newRows.push(obj);
      props.setRows(newRows)
    });

  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }


  const getSelectedProps = () => {
    return props.selected
  }
  const defaultColumns = [
    { key: "id", name: "ID (hex)", editable: false },
    { key: "parity", name: "Parity", editable: false },
    {
      key: "data", name: "Data (Hex)", editable: false,
      formatter: (propsFormatter) => (<TextFormatter key={props.selected} data={propsFormatter} value={propsFormatter.value} selected={getSelectedProps()} />)
    },
    { key: "Checksum", name: "Checksum", editable: false },
  ];
  const { height, width } = useWindowDimensions();
  return (
    <div style={{ width: '100%' }} id="grid" >
      {props.rows.length > 0 && <ReactDataGrid
        columns={defaultColumns}
        rowGetter={i => props.rows[i]}
        rowsCount={props.rows.length}
        minHeight={height - 50}
        enableCellSelect={true}
      />}
    </div>
  )



}



