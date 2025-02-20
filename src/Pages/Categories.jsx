import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameUz, setNameUz] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [images, setImages] = useState(null);
  const token = localStorage.getItem('token');

  const imageUrl = 'http://realauto.limsa.uz/api/uploads/images';

  const getCategory = () => {
    setLoading(true);
    axios({
      url: 'https://realauto.limsa.uz/api/categories',
      method: "GET",
    }).then(res => {
      setCategories(res?.data?.data);
    }).catch(err => {
      console.log(err, "error");
    }).finally(() => {
      setLoading(false);
    });
  };

  const getnameUz = () => {
    axios.get('https://realauto.limsa.uz/api/categories')
      .then(res => {
        setNameUz(res?.data?.data);
      });
  };

  useEffect(() => {
    getCategory();
    getnameUz();
  }, []);

  const addCategories = () => {
    const formdata = new FormData();
    formdata.append("name_en", nameUz);
    formdata.append("name_ru", nameRu);
    if (images) {
      formdata.append("images", images);
    }
    axios({
      url: 'https://realauto.limsa.uz/api/categories',
      method: 'POST',
      data: formdata,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res);
      toast.success("Add Categories");
      getCategory();
    }).catch(err => {
      console.log(err, "error");
    });
  };

  return (
    <div>
      <input
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        type="text" placeholder='name_uz' onChange={(e) => setNameUz(e?.target?.value)}
      />
      <input
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        type="text" placeholder='name_ru' onChange={(e) => setNameRu(e?.target?.value)}
      />
      <input type="file"
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        onChange={(e) => setImages(e?.target?.files[0])}
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={addCategories}
      >
        Save
      </button>
      <div className='grid grid-cols-3 gap-5'>
        {
          loading ? <div>Loading </div> : (
          
            categories.map(category => (
            <div
              className="grid grid-cols-1 gap-6 shadow-lg shadow-gray-400/50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/60"
              key={category.id}
            >
              <div className='flex items-center justify-center mt-3'>
                <h1 className='text-[24px]'>Name:</h1>
                <p className='text-[24px]'>{category.name_uz}</p>
              </div>
              <img className='w-full h-[300px]' src={`${imageUrl}/${category.image_src}`} alt={category.name_uz} />
            </div>
          ))
          )
        }
      </div>
    </div>
  );
}

export default Categories;