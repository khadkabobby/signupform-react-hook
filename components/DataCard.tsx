import React from 'react'

type Props = {}

const DataCard = (props: Props) => {
  return (
    <div className="card border-2 border-black w-full grid grid-cols-1 p-3 rounded-md">
        <div className="name">First Name :</div>
        <div className="name">Last Name :</div>
        <div className="name">Email :</div>
        <div className="name">Password :</div>
        <div className="buttons flex justify-between w-[60%] my-3 mx-auto">
            <button className='border px-3 py-1 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600'>Edit</button>
            <button className='border px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600'>Delete</button>
        </div>
    </div>
  )
}

export default DataCard