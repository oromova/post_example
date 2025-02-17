import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Brands() {
  const [brands, setBrands] = useState([]);
  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getBrand = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'GET',
    }).then(res => {
      setBrands(res.data.data);


    });
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className='grid grid-cols-7 gap-[20px] mt-[50px]'>
      {
        brands.map((brand) => (
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center transition transform hover:scale-105" key={brand.id}>
            <img src={`${imageUrl}/${brand.image_src}`} alt='fotobrand' className="w-24 h-12 object-contain" />
            <p className="mt-2 font-semibold text-gray-700">{brand.title}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Brands;