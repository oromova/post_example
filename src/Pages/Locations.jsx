import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from './Loading';

function Locations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('')
  const [images, setImages] = useState(null);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token')

  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

 const getLocation= () => {
  setLoading(true);
  axios({
    url: 'https://realauto.limsa.uz/api/locations',
    method: 'GET',
  }).then(res => {
    setLocations(res?.data?.data)
  }).catch(err => {
    console.log(err, 'error')
  }).finally(() => {
    setLoading(false);
  });
 };

 useEffect(() => {
  getLocation()
 }, []);

 const addLocation = () => {
  const formData = new FormData();
  formData.append("name", name)
  formData.append("text", text)
  if (images) {
    formData.append("images", images);
  }
  axios({
    url: 'https://realauto.limsa.uz/api/locations',
    method: 'POST',
    data: formData,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }).then(res => {
    console.log(res);
    toast.success("Added location")
    getLocation();    
  }).catch(err => {
    console.log(err, 'error')
  });
 };

 return loading ? (
  <Loading />
 ) : (
  <div>
    <input
      className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
      type="text" placeholder='name' onChange={(e) => setName(e?.target?.value)}
    />
     <input
      className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
      type="text" placeholder='text' onChange={(e) => setText(e?.target?.value)}
    />
    <input type="file"
      className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
      onChange={(e) => setImages(e?.target?.files[0])}
    />
    <button
      type="submit"
      className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
        transition-transform duration-200 hover:scale-105 active:scale-95"
      onClick={addLocation}
    >
      {loading ? "Sending..." : "Save"}
    </button>

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
  </div>
);
}

export default Locations