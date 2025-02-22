import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';

function Cars() {
  const [car, setCar] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')
  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getCar = () => {
    setLoading(true)
    axios({
      url: 'https://realauto.limsa.uz/api/cars',
      method: 'GET',
    }).then(res => {
      console.log(res.data.data);
      setCar(res?.data?.data)
    }).catch(err =>{
      console.log(err, "error")
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getCar()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {
        car.map((item) => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={item.id}>
            {/* <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{cars.name_en}</p>
            </div> */}
            <img className='w-[450px] h-[300px] object-contain' src={`${imageUrl}/${item?.car_images[0]?.image?.src}`} alt='car' />
          </div>
        ))
      }
    </div>
  )
}

export default Cars