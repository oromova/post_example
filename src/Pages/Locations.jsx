import axios from 'axios';
import React from 'react'

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
    <div>
      {
        locations.map(location => (
          <div key={location.id}>
            <img src={`${imageUrl}/${location.image_src}`} alt="location" />
          </div>

        ))
      }
    </div>
  )
}

export default Locations