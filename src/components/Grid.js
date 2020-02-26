import React, { useState, useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import './styles.css'
import TextFormatter from './TextFormatter'



export default function Grid(props) {
  const [isloaded, setLoaded] = useState(false);




  useEffect(() => {
    if (props.data && !isloaded) {
      let newArray = [];
      newArray = [...props.data]
      getRows(newArray);
      setLoaded({ isLoaded: true })
    }
  });

  const getRows = (data) => {
    let rows = data;
    rows = rows.slice(4);
    convertRowsToArray(rows);
  }

  const convertRowsToArray = (rows) => {
    let newRows = [];
    rows.forEach(row => {
      const obj = {};
      obj['id'] = row[1]
      obj['parity'] = row[2]
      obj['data'] = row[3]
      obj['Checksum'] = row[4]
      newRows.push(obj);
      props.setRows(newRows)
    });

  }
  const defaultColumns = [
    { key: "id", name: "ID (hex)", editable: false },
    { key: "parity", name: "Parity", editable: false },
    {
      key: "data", name: "Data (Hex)", editable: false,
      formatter: (propsFormatter) => (<TextFormatter data={propsFormatter} value={propsFormatter.value} options={props.options} />)
    },
    { key: "Checksum", name: "Checksum", editable: false },
  ];


  return (
    <div style={{ width: '100%', }} id="grid" >
      {props.rows.length > 0 && <ReactDataGrid
        columns={defaultColumns}
        rowGetter={i => props.rows[i]}
        rowsCount={props.rows.length}
        minHeight='90vh'
        enableCellSelect={true}
      />}
    </div>
  )



}



