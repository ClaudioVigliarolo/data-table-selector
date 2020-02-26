import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'

export default function Reader(props) {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CSVReader onFileLoaded={props.setData1} />
      <CSVReader onFileLoaded={props.setData2} />
    </div>
  )

}

