import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './Loading';

function Models() {
  const [models, setModels] = useState([]);
  const [name, setName] = useState([]);
  const [brandId, setbrandId] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const getModels = () => {
    setLoading(true);
    axios({
      url: 'https://realauto.limsa.uz/api/models',
      method: 'GET',
    }).then(res => {
      setModels(res?.data?.data);
      console.log(res.data.data);
    }).catch(err => {
      console.log(err, "error");
    }).finally(() => {
      setLoading(false);
    });
  };

  const getBrands = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'GET',
    }).then(res => {
      setBrand(res?.data?.data);
      console.log(res.data.data);
    }).catch(err => {
      console.log(err, "error");
    });
  };

  useEffect(() => {
    getModels();
    getBrands();
  }, []);

  const addModals = () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("brand_id", brandId);
    axios({
      url: 'https://realauto.limsa.uz/api/models',
      method: 'POST',
      data: formdata,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res?.data?.data);
      toast.success("Add Models");
      getModels();
    }).catch(err => {
      console.log(err, "error");
    });
  };

  return loading ? (
    <Loading/>
  ) : (
    <div>
      <input
        className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6'
        type="text" placeholder='name' onChange={(e) => setName(e?.target?.value)} />
      <select className='p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6 w-[200px]'
        name="" id=""
        onChange={(e) => setbrandId(e?.target?.value)}>
        <option value="" disabled>Select Brands</option>
        {
          brand.map(item => (
            <option value={item.id}> {item.title}</option>
          ))
        }
      </select>
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={addModals}
        disabled={loading}
      >
        {loading ? "Sending..." : "Save"}
      </button>

      <div className='grid grid-cols-2 pt-5 gap-5'>
        {
          models.map((item) => (
            <div className='grid grid-cols-1 gap-5 p-5 bg-[#e0e0e5] rounded-[20px]' key={item.id}>
              <div className='flex justify-between'>
                <h1 className='text-gray-500 text-[24px]'>Name:</h1>
                <p className='text-gray-500 text-[24px]'>{item.name}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Models;