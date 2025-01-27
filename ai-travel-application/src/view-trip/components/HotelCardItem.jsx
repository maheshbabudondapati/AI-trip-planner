import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {

 const [photoUrl,setPhotoUrl]=useState();
 
   useEffect(() => {
     if (hotel?.hotelName) {
       GetPlacePhoto();
     }
   }, [hotel]);
   
   const GetPlacePhoto = async () => {
     try {
       const data = {
         textQuery: hotel?.hotelName
       };
       
       const response = await GetPlaceDetails(data); // Pass the data parameter
       console.log(response.data);
       const photoUrl=PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name);
       setPhotoUrl(photoUrl);
       //return response.data;
     } catch (error) {
       console.error("Error fetching place photo:", error);
       // Handle error appropriately
     }
   };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
    <div className='hover:scale-105 transition-all cursor-pointer'>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover'></img>
      <div className='my-2 flex flex-col gap-1'>
        <h2 className='font-medium'>{hotel?.hotelName}</h2>
        <h2 className='text-sm text-gray-500'>📍{hotel?.hotelAddress}</h2>
        <h2 className='text-sm'>💰{hotel?.price}</h2>
        <h2>⭐{hotel?.rating}</h2>
      </div>
    </div>
  </Link>
  )
}

export default HotelCardItem