import React from 'react'

export const Button = ({label,onClick}) => {
  return (
    <>
        <button className="bg-white/10 w-full rounded px-4 py-3 text-stone-50 text-sm sm:text-base sm:w-auto hover:cursor-pointer hover:bg-white/20 uppercase" onClick={onClick}>{label}</button>
    </>
  )
}
