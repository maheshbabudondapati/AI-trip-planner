import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";

function InfoSection({ tripData }) {

  const [photoUrl,setPhotoUrl]=useState();

  useEffect(() => {
    if (tripData?.userSelectionData?.location?.label) {
      GetPlacePhoto();
    }
  }, [tripData]);
  
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: tripData?.userSelectionData?.location?.label
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
    <div>





      <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'></img>

      <div className='flex justify-between items-center'>


        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{tripData?.userSelectionData?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📅No. of Days: {tripData?.userSelectionData?.noOfDays}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>👯‍♂️No. of Travelers: {tripData?.userSelectionData?.noOfTravellers}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰Budget: {tripData?.userSelectionData?.budget}</h2>
          </div>
        </div>

        <Button>
          <FaShareAlt />
        </Button>
      </div>





    </div>
  )
}

export default InfoSection