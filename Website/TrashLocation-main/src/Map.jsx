import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { collection, getDocs,doc ,deleteDoc} from 'firebase/firestore';
import { db } from './config/firebase';
import { Icon } from 'leaflet';
import PointerRed from './assets/pointerRed.png';
import "./map.css";
import 'leaflet/dist/leaflet.css';
function Map() {
  const locationCollectionRef = collection(db, 'TrashLocation');
  const [locations, setLocations] = useState([]);

  const pointer = new Icon({
    iconUrl: PointerRed,
    iconSize: [35, 35],
  });

  function deleteLocation(documentId) {
    const documentRef = doc(db,'TrashLocation', documentId);
    console.log("documentId: " + documentId);
    deleteDoc(documentRef)
    .then(() => {
      console.log('Document successfully deleted!');
      getLocationList();
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
  }
 
  // useEffect(() => {
  //   getLocationList();
  // },[]);

  




  const getLocationList = async () => {
    try {
      const data = await getDocs(locationCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLocations(filteredData);
      console.log('filtereddata', filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLocationList();
  },[]);
  let position=[0,0]
  console.log('locations', locations);
  return (
    <MapContainer center={[21.168420666666666,81.6606361666666]} zoom={13}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {locations?.map((location, index) => (
        console.log("location",location.latitude),
        position=[location.latitude,location.longitude ], 
        <Marker key={index} icon={pointer} position={position}>
          <Popup>
            <p>Remove if Trash collected</p>
            <button
            onClick={() =>{
              deleteLocation(location.id)
            }

            }
            
            >Remove Location</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;












