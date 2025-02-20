import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Cars() {
  const [car, setCar] = useState([])
  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getCar = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/cars',
      method: 'GET',
    }).then(res =>{
      console.log(res.data);
      setCar(res.data)
    }).catch(err =>{
      console.log(err, "error")
    })
  }

  useEffect(() => {
    getCar()
  }, [])

  return (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {
        car.map(cars => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={car.id}>
            {/* <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{cars.name_en}</p>
            </div> */}
            <img className='w-[450px] h-[300px]' src={`${imageUrl}/${cars.images.image.src}`} alt='car' />
          </div>
        ))
      }
    </div>
  )
}

export default Cars