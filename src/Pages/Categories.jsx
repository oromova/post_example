import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './Loading';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [nameUz, setNameUz] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [images, setImages] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
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

  useEffect(() => {
    getCategory();
  }, []);

  const addCategories = () => {
    const formdata = new FormData();
    formdata.append("name_en", nameUz);
    formdata.append("name_ru", nameRu);
    if (images) {
      formdata.append("images", images);
    }
    axios({
      url: `https://realauto.limsa.uz/api/categories/${selectedItem?.id}`,
      method: selectedItem ? "PUT" : "POST",
      data: formdata,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res?.data?.data);
      toast.success("Add Categories");
      getCategory();
      setSelectedItem(null);
    }).catch(err => {
      console.log(err, "error");
    }).finally(() => {
      setLoading(false);
    });
  };

  const closeModal = () => {
    setopenModal(false);
    setSelectedItem(null);
  };

  const showEdit = () => {
    setSelectedItem(category);
    setNameUz(category.name_en);
    setNameRu(category.name_ru);
  };

  const deleteCategory = (id) => {
    axios({
      method: 'DELETE',
      url: `https://realauto.limsa.uz/api/categories/${selectedItem?.id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      toast.success("Delete category");
      const updateCategory = categories.filter(item => item?.id !== selectedItem?.id);
      setCategories(updateCategory);
      setSelectedItem(null);
    });
  };


  return loading ? (
    <Loading />
  ) : (
    <div>
      {selectedItem ? <div className='mb-3.5 border p-4 rounded-2xl w-fit'>
        <h2 className='mb-2.5'>Haqiqatdan ham o'chirasanmi?</h2>
        <button
          onClick={() => setSelectedItem(null)}
          className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95">Yo'q</button>
        <button
          onClick={deleteCategory}
          className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95">Ha</button>
      </div>
        : ""
      }
      <input
        className="mb-3.5 p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6"
        type="text"

        placeholder="name_uz"
        onChange={(e) => setNameUz(e?.target?.value)}
        value={nameUz}
      />
      <input
        className="p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6"
        type="text"

        placeholder="name_ru"
        onChange={(e) => setNameRu(e?.target?.value)}
        value={nameRu}
      />
      <input
        type="file"
        className="p-2.5 bg-gray-100 rounded-[10px] outline-0 mr-6"
        onChange={(e) => setImages(e?.target?.files[0])}
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={addCategories}
        disabled={loading}
      >
        {loading ? "Sending..." : "Save"}
      </button>

      <div className="grid grid-cols-3 gap-5">
        {categories.map((category) => (
          <div
            className="grid grid-cols-1 gap-6 shadow-lg shadow-gray-400/50 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/60"
            key={category.id}
          >
            <div className="flex items-center justify-center mt-3">
              <h1 className="text-[24px]">Name:</h1>
              <p className="text-[24px]">{category.name_uz}</p>
            </div>
            <img
              className="w-full h-[300px]"
              src={`${imageUrl}/${category.image_src}`}
              alt={category.name_uz}
            />
            <button className='w-[90px] mx-auto px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
             transition-transform duration-200 hover:scale-105 active:scale-95'
              onClick={() => showEdit(category)}
            >
              Edit
            </button>
            <button className='w-[90px] mb-4 mx-auto px-5 py-2.5 bg-blue-400 text-white rounded-[10px] outline-0 mr-6 
            transition-transform duration-200 hover:scale-105 active:scale-95'
              onClick={() => setSelectedItem(category)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Categories;