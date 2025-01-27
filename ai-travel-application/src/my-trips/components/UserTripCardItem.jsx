import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
  const [photoUrl,setPhotoUrl]=useState();
   
     useEffect(() => {
       if (trip?.userSelectionData?.location?.label) {
         GetPlacePhoto();
       }
     }, [trip]);
     
     const GetPlacePhoto = async () => {
       try {
         const data = {
           textQuery: trip?.userSelectionData?.location?.label
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
    <Link to={'/view-trip/'+ trip?.id}>
    <div className='hover:scale-105 transition-all '>
      <img src={photoUrl} className="object-cover rounded-xl" />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelectionData?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelectionData?.noOfDays} days trip with {trip?.userSelectionData?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem