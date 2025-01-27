import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ tripData }) {

  // First, get the days sorted
  const days = Object.keys(tripData?.tripInfoData?.itinerary || {})
    .sort((a, b) => a.localeCompare(b)); // This will sort day1, day2, etc.


  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>

      <div>
        {days.map((day) => {
          const dayData = tripData?.tripInfoData?.itinerary[day];
          return (
            <div className='mt-5'>
              <h2 className='font-medium text-lg'>{day}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {dayData?.places.map((place, index) => (
                  <div className='my-3'>
                    <h2 className='font-medium text-sm text-orange-600'>{dayData.bestTimeToVisit}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>

            </div>

          )


        })}

      </div>

    </div>
  )
}


export default PlacesToVisit