import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ tripData }) {
  return (
    <div>


      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {tripData?.tripInfoData?.hotels?.map((hotel, index) => (
      <HotelCardItem hotel={hotel}/>
        ))}
      </div>


    </div>
  )
}

export default Hotels