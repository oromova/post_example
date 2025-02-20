import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(null)
  const [loading, setLoading] = useState(true);

  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getBrand = () => {
    setLoading(true);
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'GET',
    }).then(res => {
      setBrands(res?.data?.data);
    }).catch(err =>{
      console.log(err, "error")
    }).finally(() => {
      setLoading(false);
    });
  };

  const getnameUz = () => {
    axios.get('https://realauto.limsa.uz/api/brands')
    .then(res => {
      setTitle(res?.data?.data)
    });
  }

  useEffect(() => {
    getBrand();
    getnameUz();
  }, []);

  const addBrands = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('images', images);
    if (images) {
      formData.append('images', images);
    }
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'POST',
      data: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      console.log(res);
      toast.success("Added Brands");
      getBrand();
    }).catch(err => {
      console.log(err, "error");
    })
  }

  return (
    <div>
      <input
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        type="text" placeholder='name_ru' onChange={(e) => setTitle(e?.target?.value)}
      />
      <input type="file"
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        onChange={(e) => setImages(e?.target?.files[0])}
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={addBrands}
      >
        Save
      </button>
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
    </div>
  );
}

export default Brands;