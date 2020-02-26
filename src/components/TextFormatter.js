import React from 'react'

export default function TextFormatter(props) {

  const formatText = (text) => {
    let arr = text.split(/\s+/);
    arr = arr.filter(item => item.length > 0)
    // console.log(arr)
    return arr.map((item, index) => {
      return (
        <span key={index} style={{ color: index === 1 ? 'red' : '', fontWeight: index === 1 ? 'bolder' : '' }}>
          {item}{' '}
        </span>
      )
    })
  }
  return (
    <span style={{ color: 'green' }}>
      {formatText(props.value)}
    </span>

  )
}
