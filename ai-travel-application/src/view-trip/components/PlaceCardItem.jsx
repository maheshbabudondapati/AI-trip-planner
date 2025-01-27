import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react'

function PlaceCardItem({ place }) {
  const [photoUrl,setPhotoUrl]=useState();
   
     useEffect(() => {
       if (place?.placeName) {
         GetPlacePhoto();
       }
     }, [place]);
     
     const GetPlacePhoto = async () => {
       try {
         const data = {
           textQuery: place?.placeName
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
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[130px] h-[130px] rounded-xl object-cover'></img>

        <div>
          <h2 className='font-bold text-lg'>{place?.placeName}</h2>
          <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
          <h2 className='mt-2'>🕰️{place?.travelTime}</h2>
        </div>

      </div>
    </Link>
  )
}

export default PlaceCardItem