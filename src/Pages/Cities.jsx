import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Cities() {
  const [city, setCity] = useState([]);
  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getCities = () => {
    axios({
      method: "GET",
      url: 'https://realauto.limsa.uz/api/cities',
    }).then(res => {
      console.log(res.data.data);
      
      setCity(res.data.data)
    }).catch(err => {
      console.log(err, "error");
    })
  }
  useEffect(() => {
    getCities()
  }, [])

  return (
    <div className='grid grid-cols-4 gap-[20px] mt-[50px]'>
      {
        city.map(city =>(
          <div className="bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition transform hover:scale-105" key={city.id}>
            <img src={`${imageUrl}/${city.image_src}`} alt='fotobrand' className="w-full h-[50%] " />
            <p className="mt-4 font-semibold text-gray-700">{city.name}</p>
            <p className="mt-2 font-semibold text-gray-500 text-[14px] px-4 text-center">{city.text}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Cities