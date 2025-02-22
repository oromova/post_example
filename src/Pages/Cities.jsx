import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from './Loading';

function Cities() {
  const [city, setCity] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState(null)
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getCities = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: 'https://realauto.limsa.uz/api/cities',
    }).then(res => {
      console.log(res?.data?.data);
      setCity(res?.data?.data)
    }).catch(err => {
      console.log(err, "error");
    }).finally(() => {
      setLoading(false);
    });
  }

  const getName = () => {
    axios.get('https://realauto.limsa.uz/api/cities')
    .then(res => {
      setName(res?.data?.data)
    });
  }

  useEffect(() => {
    getCities()
    getName()
  }, [])
  
  const addCities = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    if (images) {
      formData.append('images', images);
    }
    axios({
      url: 'https://realauto.limsa.uz/api/cities',
      method: 'POST',
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(res => {
      console.log(res);
      toast.success("Add Cities")
      getCities()
    }).catch(err => {
      console.log(err, "error");
    }).finally(
      setLoading(false)
    );
  };

  return loading ? (
    <Loading/>
  ) : (
    <div>
      <input
        className='mb-3.5 p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        type="text" placeholder='name_uz' onChange={(e) => setName(e?.target?.value)}
      />
      <input
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        type="text" placeholder='name_ru' onChange={(e) => setText(e?.target?.value)}
      />
      <input type="file"
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        onChange={(e) => setImages(e?.target?.files[0])}
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={addCities}
        disabled={loading}
      >
        {loading ? "Sending..." : "Save"}
      </button>

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
    </div>
  )
}

export default Cities