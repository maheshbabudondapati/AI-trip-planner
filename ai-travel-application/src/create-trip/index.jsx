import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FireBaseConfig';
import { AiOutlineLoading } from "react-icons/ai";


function CreateTrip() {

  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDailog, setOpenDailog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])


  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true);
      return;
    }


    if (formData?.noOfDays > 7 && !formData?.location || !formData?.budget || !formData?.noOfTravellers) {
      toast("please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{noOfTravellers}', formData?.noOfTravellers)
      .replace('{budget}', formData.budget)
      .replace('{noOfDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());

    setLoading(false);

    SaveAITrip(result?.response?.text());


  }

  /*
  Here, we going to save the trip which we are getting above in to the database(Firebase)
  here we are generating documentId of every document by using time stamp data of now and 
  that timestamp is converted to string so then it is unique.
  */

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITripPlanData", docId), {
      userSelectionData: formData,
      tripInfoData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),  // Fixed function name and call
    onError: (error) => console.log('Login Failed:', error)
  });

  const getUserProfile = async (tokenInfo) => {  // Changed to async/await
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo`, // Corrected API endpoint
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('User Profile:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDailog(false);
      onGenerateTrip();
      //return response.data;

    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences ✈️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>


      <div className='mt-20 flex flex-col gap-3'>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <p>The budget is exclusively allocated for activities and dining purposes</p>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='text-lg font-bold'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
              </div>
            ))}

          </div>

        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('noOfTravellers', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.noOfTravellers == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='text-lg font-bold'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='my-10 justify-end flex'>
        <button onClick={onGenerateTrip} disabled={loading}>
          {loading ?
            <AiOutlineLoading className='h-7 w-7 animate-spin' />
            :
            'Generate Trip'
          }

        </button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='font-bold'>Please Sign In</DialogTitle>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                {loading ?
                  "test" :
                  <>
                    <FcGoogle className='h-7 w-7' />
                  </>}
                Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip