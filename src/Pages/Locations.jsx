import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Locations() {
  const [locations, setLocations] = useState([])
  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

 const getLocation= () => {
  axios({
    url: 'https://realauto.limsa.uz/api/locations',
    method: 'GET',
  }).then(res => {
    setLocations(res.data.data)
  }).catch(err => {
    console.log(err, 'error')
  });
 } 

 useEffect(() => {
  getLocation()
 }, []);

 return (
  <div className='grid grid-cols-3 gap-[20px] mt-[50px]'>
    {
      locations.map((location) => (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center transition transform hover:scale-105" key={location.id}>
          <img src={`${imageUrl}/${location.image_src}`} alt='location' className="object-contain" />
          <p className="mt-2 font-semibold text-gray-700">{location.name}</p>
        </div>
      ))
    }
  </div>
);

}

export default Locations