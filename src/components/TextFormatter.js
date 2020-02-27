import React from 'react'

export default function TextFormatter(props) {

  const formatText = (text, uid, selectedBits) => {
    const item = selectedBits.find(x => x.rawId && x.rawId.includes(uid));
    //I the id of the row of the first grid is different from the id of the row of the second grid, so I created a sole ID by merging the two
    if (!item) return text;

    let arr = text.split(/\s+/);
    arr = arr.filter(item => item.length > 0)


    return item.selectedBits.map((bitDiff, index) => {
      return (
        <span key={index} style={{ color: bitDiff ? 'red' : '', fontWeight: bitDiff ? 'bolder' : '' }}>
          {arr[index]} {' '}
        </span>
      )
    })

  }


  return (
    <span style={{ color: 'green' }}>

      {formatText(props.value, props.data.row.uid, props.selected)}
    </span>

  )
}
