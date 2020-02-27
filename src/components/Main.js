import React, { useState, useEffect } from 'react'
import FilePicker from './FilePicker'
import Grid from './Grid'

export default function Main() {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [selected, setSelected] = useState([]);


  useEffect(() => {
    executeCompare()
  }, [rows1]);

  useEffect(() => {
    executeCompare()
  }, [rows2]);



  const executeCompare = () => {
    if (rows1.length === 0 || rows2.length === 0) {
      return;
    }
    const array1 = rows1;
    const array2 = rows2;

    const maxVal = Math.min(array1.length, array2.length);
    for (let i = 0; i < maxVal; i++) {
      if (array1[i].Checksum !== array2[i].Checksum) {
        compareBits(array1[i].data, array2[i].data, array1[i].uid.concat(array2[i].uid))
      }
    }

  }

  const compareBits = (data1, data2, uid) => {
    if (!data1 || !data2) return;

    let bitsData1 = data1.split(/\s+/);
    bitsData1 = bitsData1.filter(item => item.length > 0);
    let bitsData2 = data2.split(/\s+/);
    bitsData2 = bitsData2.filter(item => item.length > 0);
    let selectedBitsArray = [];
    bitsData1.forEach((bit, index) => {
      if (bit !== bitsData2[index]) {
        selectedBitsArray[index] = true;
      } else {
        selectedBitsArray[index] = false;
      }
    });


    const newElement = {
      rawId: uid,
      selectedBits: selectedBitsArray
    }

    setSelected(prevSelected => [...prevSelected, newElement]);
    setSelected(prevArray => [...prevArray])

  }

  return (
    <React.Fragment>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translate(-50%, 0)' }} >
        {<FilePicker setData1={(data) => setData1(data)} setData2={(data) => setData2(data)} />}
      </div>
      {<div style={{ marginTop: 50, display: 'flex', flexDirection: 'row', backgroundColor: '#eee' }}>
        <div style={{ width: '50vw' }}>
          <Grid data={data1} key={data1} setRows={(newRows) => setRows1(rows1.concat(newRows))} rows={rows1} selected={selected} />
        </div>
        <div style={{ width: '50vw' }}>
          <Grid data={data2} key={data2} setRows={(newRows) => setRows2(rows2.concat(newRows))} rows={rows2} selected={selected} />
        </div>
      </div>
      }
    </React.Fragment>
  )
}
