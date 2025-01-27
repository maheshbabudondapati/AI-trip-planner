import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
  const { tripId } = useParams();

  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId])

  const GetTripData = async () => {
    const docRef = doc(db, 'AITripPlanData', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Doccument: ", docSnap.data());
      setTripData(docSnap.data());
    }
    else {
      console.log('no such document')
      toast('No trip found');
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection tripData={tripData} />
      <Hotels tripData={tripData} />
      <PlacesToVisit tripData={tripData} />
      <Footer tripData={tripData} />
    </div>
  )
}

export default Viewtrip