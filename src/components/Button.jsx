import React from 'react'

export const Button = ({label,onClick}) => {
  return (
    <>
        <button className='  bg-blue-800 rounded px-3 py-1 text-stone-50 hover:cursor-pointer hover:bg-blue-500' onClick={onClick}>{label}</button>
    </>
  )
}
