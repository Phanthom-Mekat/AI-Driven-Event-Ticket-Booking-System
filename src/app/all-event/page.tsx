import CodingExpert from '@/components/AllEvent/CodingExpert'
import OutComes from '@/components/AllEvent/OutComes'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

export default function page() {
  return (
    <div className='w-11/12 mx-auto flex flex-col items-center justify-center my-8'> 
      <Navbar></Navbar>
      <OutComes></OutComes>
      <CodingExpert></CodingExpert>
    </div>
  )
}
