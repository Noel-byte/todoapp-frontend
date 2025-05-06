import React from 'react'

export const Button = ({label,onClick}) => {
  return (
    <>
        <button className="bg-blue-800 rounded px-4 py-2 text-stone-50 text-sm sm:text-base w-full sm:w-auto hover:cursor-pointer hover:bg-blue-500" onClick={onClick}>{label}</button>
    </>
  )
}
