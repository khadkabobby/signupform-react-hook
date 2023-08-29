import React from 'react'
import DataCard from './DataCard'

type Props = {}

const AllData = (props: Props) => {
  return (
    <section className="flex flex-col items-center bg-white text-black h-[100vh] px-4">
        <h2 className='text-3xl font-bold pt-5'>All data</h2>
        <div className="cards w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <DataCard/>
        <DataCard/>
        </div>
    </section>
  )
}

export default AllData