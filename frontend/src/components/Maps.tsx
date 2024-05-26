import React, {useEffect, useState} from 'react';
import {APIProvider, Map, AdvancedMarker, Marker, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import duckImage from '../assets/duck.webp';

const PlacesNearYou = (props: any) => {
  const { placeInfo } = props;
  const [ infoAvaliable, setInfoAvaliable ] = useState(false);
  useEffect(()=> {
    if (!placeInfo) return;
    setInfoAvaliable(true);
  }, [placeInfo])
  return (
    <>
    {infoAvaliable && placeInfo.map((item, index)=> (
      <div key={index} className="flex flex-row" onClick={item.onClick}>
        <div className="m-3 flex items-center rounded-xl bg-gray-300 w-full">
          <p className="text-md md:p-6 ">{item.name}</p>
          <div className=" md:pl-4">place {item.opening_hours}</div>
          <div className=" md:pl-4">distance {item.distance}</div>

          <div>{item.isOpen}</div>
        </div>
      </div>
    ))}
    </>
  )
}

// Returns 0-6 depending on the current day of the week
function getCurrentDayIndex() {
  const date = new Date();
  return date.getDay();
}

const PlaceMarker = (lat: number, lng: number, reactMap: any) => {
  return (
    <AdvancedMarker position={{lat: lat, lng: lng}} onClick={() => {
      reactMap.setZoom(16);
      reactMap.setCenter({ lat, lng });
    }}/>
  )
}

// class LatLng {
//   constructor(lat, lng) {
//     this.latitude = lat;
//     this.longitude = lng;
//   }

//   lat() {
//     return this.latitude;
//   }

//   lng() {
//     return this.longitude;
//   }
// }

const FindNearbyClinics = (props: any) => {
  const { lati, long, setPlaceInfo, placeInfo } = props;

  const reactMap = useMap(); // gets map component from the component its in
  const placesLibrary = useMapsLibrary('places'); // gets place library

  const [placesService, setPlacesService] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [placeId, setPlaceId] = useState([]);

  // Given location (lati and long) center on the map
  useEffect(()=> {
    if (!reactMap) return;
    reactMap.setCenter({lat: lati, lng: long});
  }, [reactMap]);


  // Once placesLibrary and reactMap is generated, define and trigger placesService
  useEffect(()=> {
    if (!placesLibrary || !reactMap) return;
    setPlacesService(new placesLibrary.PlacesService(reactMap));
  }, [placesLibrary, reactMap]);
  
  // Once placesService is triggered, query and place marker for nearby clinics
  useEffect(() => {
    if (!placesService || !reactMap) return;
    var request = {
      keyword: 'birth control near me|planned parenthood', // Search for bc / planned parenthood near you
      location: { lat: lati, lng: long }, // Replace with your current location
      radius: 16093.4, // 16093.4 meters (10 mile) radius
      type: 'health',
    };

    // Query
    placesService.nearbySearch(request, function(results:any, status: any) {
      if (status === placesLibrary.PlacesServiceStatus.OK) {
        let newListOfPlaceIds = [];
        let newListOfMarkers = []
        const firstEightRes = results.slice(0,8);
        firstEightRes.forEach(function(place) { // Set markers for each place found
          const location = place.geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const marker = PlaceMarker(lat, lng, reactMap);
          const resultPlaceId = place.place_id;
          newListOfPlaceIds.push(resultPlaceId);
          newListOfMarkers.push(marker);
        });
        setPlaceId((prevId) => [...prevId, ...newListOfPlaceIds]);
        setMarkers((prevMarkers) => [...prevMarkers, ...newListOfMarkers]);

      }
    });
  }, [placesService])

  useEffect(() => {
    console.log("placeid:", placeId, "placesservice", placesService)
    if (!placeId || !placesService) return
    placeId.forEach((obj) => {
      getPlaceDetails(obj)
    })
  }, [placeId])


  // Updates placeInfo objs that have name, opening hours, isOpen (T or F) and trigger useEffect
  function getPlaceDetails(placeId: any) {
    var detailsRequest = {
      placeId: placeId,
      fields: ['name', 'opening_hours', 'geometry'], // Request the name and opening hours fields
    };
  
    placesService.getDetails(detailsRequest, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log('Place details:', place);
        // console.log('Opening hours:', place.opening_hours.weekday_text);
        // console.log('Opening hours:', place.opening_hours.open_now)
        console.log("place", place);
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        const sendPlaceInfo = {
          name: place.name,
          opening_hours: place.opening_hours.weekday_text[getCurrentDayIndex()],
          isOpen: place.opening_hours.open_now,
          onClick: () => {
            reactMap.setZoom(11);
            reactMap.setCenter({ lat: lati, lng: long});
            setTimeout(() => {
              reactMap.setZoom(16);
              reactMap.setCenter({ lat, lng });
            }, 1500);
          }, 
          lat,
          lng,
          distance: calculateDistance(lat, lng, lati, long),
        }
        setPlaceInfo((oldPlaceInfo) => [...oldPlaceInfo, sendPlaceInfo]);
      }
    });
  };

  return (
    <>
    {markers && markers.map((item) => item)}
    </>
  )
}

const UserIcon = (props: any) => {
  const { lati, long } = props;
  const reactMap = useMap();
  return (
  <>
  <AdvancedMarker position={{lat: lati, lng: long}} onClick={() => {
      reactMap.setZoom(16);
      reactMap.setCenter({ lat: lati, lng: long });
    }}>
    <img src={duckImage} className="rounded-full shadow-glow-yellow border-8 border-yellow-500 border-opacity-100" width={40} height={40}></img>
  </AdvancedMarker>
  </>)
}

// const INITIAL_CAMAERA = {
//   zoom: 12,
//   style: {width: '100%', height: '100%'},
//   center: {lat: 34.052235, lng: -118.243683},
// }

const ReactMap = (props: any) => {
  const { placeInfo, setPlaceInfo, lat, lng} = props;
  return (
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Map 
      mapId = {'0'}
      style={{width: '100%', height: '100%'}}
      defaultCenter={{lat, lng}}
      defaultZoom={11}
      gestureHandling={'greedy'}
      defaultTilt={67.5}
      disableDefaultUI={true}
      zoomControl= {true}
      streetViewControl= {true}
    ></Map>
    <FindNearbyClinics placeInfo={placeInfo} setPlaceInfo={setPlaceInfo} lati={lat} long={lng}/>
    <UserIcon lati={lat} long={lng}/>
  </APIProvider>
)};

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  console.log("distance: ", distance);
  return distance;
}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// given location find birth control places nearby and find them in a radius
function Maps () {
  const [placeInfo, setPlaceInfo] = useState([]);
  const lat = 34.052235; // 33.684566  34.052235 LA
  const lng = -118.243683; // -117.826508 -118.243683

  // const lat = 33.684566; // Irvine
  // const lng = -117.826508;
  return (
    <>
    <div className="mx-auto w-full h-full"> {/* container */}
      <div className="p-8 grid grid-cols-2 grid-rows-1"> {/* grid that holds places and map */}
        <div className="debug"> {/* recommending places near you */}
          <p className="m-2 flex items-end ">Places Near You</p>

          <div className="mt-8 font-inter font-bold grid grid-rows-5 grid-cols-1">
            <PlacesNearYou placeInfo={placeInfo} l  at={lat} lng={lng}/>
          </div>
        </div>
        <div className="debug"> {/* map */}
          <ReactMap placeInfo={placeInfo} setPlaceInfo={setPlaceInfo} lat={lat} lng={lng}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Maps
export {ReactMap}