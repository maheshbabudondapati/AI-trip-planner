import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from "react-icons/fc"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Header() {
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log('Login Failed:', error)
  })

  const getUserProfile = async (tokenInfo) => {
    setLoading(true)
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('User Profile:', response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      setOpenDialog(false)
      window.location.reload()

    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='logo.svg' alt="Logo" />
      <div>
        {user ? (
          <div className='flex items-center gap-5'>
             <a href='/my-trips'>
            <Button className='rounded-full'>My Trips</Button>
            </a>
            <a href='/my-trips'>
            <Button className='rounded-full'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img 
                  src={user?.picture} 
                  className='h-[35px] w-[35px] rounded-full'
                  alt="User profile" 
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 
                  className='cursor-pointer' 
                  onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    window.location.reload()
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='font-bold'>Please Sign In</DialogTitle>
            <DialogDescription>
              <img src='/logo.svg' alt="Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely</p>
              <Button
                onClick={() => login()}
                className="w-full mt-5 flex gap-4 items-center"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <FcGoogle className='h-7 w-7' />
                    Sign In With Google
                  </>
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
