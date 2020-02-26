import React, { useState, useRef } from 'react'
import FilePicker from './FilePicker'
import Grid from './Grid'

export default function Main() {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [options, setOptions] = useState([]);


  const executeCompare = () => {
    if (rows1.length === 0 || rows2.length === 0) {
      return;
    }
    const array1 = rows1;
    const array2 = rows2;
    console.log(array1)
    const maxVal = Math.min(array1.length, array2.length);
    for (let i = 0; i < maxVal; i++) {
      if (array1[i].Checksum !== array2[i].Checksum) {
        console.log("ppppp", array1[i].data, array2[i].data)
        compareBits(array1[i].data, array2[i].data, i)
      }
    }

  }

  const compareBits = (data1, data2, rawN) => {
    if (!data1 || !data2) return;
    let bitsData1 = data1.split(/\s+/);
    bitsData1 = bitsData1.filter(item => item.length > 0);
    console.log("b11", bitsData1)
    let bitsData2 = data2.split(/\s+/);
    bitsData2 = bitsData2.filter(item => item.length > 0);
    console.log("b1222", bitsData2)
    bitsData1.forEach((bit, index) => {
      if (bit !== bitsData2[index]) {
        //row, bit position
        const newElement = {
          raw: rawN,
          selectedBits: []
        }
        setOptions(oldArray => [...oldArray, newElement])
      }
    });

  }

  return (
    <React.Fragment>
      {executeCompare()}

      <div style={{ position: 'fixed', top: 0, left: '40%' }} >
        {<FilePicker setData1={(data) => setData1(data)} setData2={(data) => setData2(data)} />}
      </div>
      {<div style={{ marginTop: '10vh', display: 'flex', flexDirection: 'row', backgroundColor: '#eee' }}>
        <div style={{ width: '50vw' }}>
          <Grid data={data1} key={data1} setRows={(newRows) => setRows1(rows1.concat(newRows))} rows={rows1} options={options} />
        </div>
        <div style={{ width: '50vw' }}>
          <Grid data={data2} key={data2} setRows={(newRows) => setRows2(rows2.concat(newRows))} rows={rows2} options={options} />
        </div>
      </div>
      }
    </React.Fragment>
  )
}
