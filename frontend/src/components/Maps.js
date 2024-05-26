import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import duckImage from '../assets/duck.webp';
import searchIcon from '../assets/searchicon.jpg';
let latitude;
let longitude;
const PlacesNearYou = (props) => {
    const { placeInfo, setPlaceInfo, setNumClinics, onPlaceClick } = props;
    const [infoAvailable, setInfoAvaliable] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [newPlaceInfo, setNewPlaceInfo] = useState([]);
    useEffect(() => {
        if (!placeInfo || (infoAvailable && placeInfo))
            return;
        setInfoAvaliable(true);
    }, [placeInfo]);
    useEffect(() => {
        if (!infoAvailable || !placeInfo)
            return;
        const sortedPlaceInfo = [...placeInfo].sort((a, b) => {
            if (a.distance === b.distance) {
                return b.isOpen - a.isOpen;
            }
            return a.distance - b.distance;
        });
        setNewPlaceInfo(sortedPlaceInfo);
        setNumClinics(sortedPlaceInfo.length);
    }, [infoAvailable, placeInfo]);
    return (_jsx(_Fragment, { children: newPlaceInfo && newPlaceInfo.map((item, index) => (_jsx("div", { className: `flex justify-end cursor-pointer`, onClick: () => {
                onPlaceClick(item);
                setIsClicked(true);
                item.onClick();
            }, children: _jsxs("div", { className: `m-2 p-3 flex flex-col w-full ${index == placeInfo.length - 1 ? 'border-b' : ''}border-b border-gray-300 hover:text-gray-500 active:text-gray-700`, children: [_jsx("p", { className: "text-md font-medium", children: item.name }), _jsxs("p", { className: "font-normal", children: [item.opening_hours, " ", _jsx("span", { className: "text-xs", children: '\u25CF' }), " ", item.distance, " mi"] }), _jsx("p", { className: "font-normal" }), _jsx("p", { children: item.isOpen })] }) }, index))) }));
};
// Returns 0-6 depending on the current day of the week
function getCurrentDayIndex() {
    const date = new Date();
    const day = date.getDay();
    return (day === 0) ? 6 : day - 1;
}
function zoomToPlace(lat, lng, zoomLevel, duration, map) {
    const target = { lat: lat, lng: lng };
    // Smoothly pan to the target location
    map.panTo(target);
    // Gradually zoom in to the target level
    let currentZoom = map.getZoom();
    const zoomStep = (zoomLevel - currentZoom) / (duration / 100);
    const zoomInterval = setInterval(() => {
        if ((zoomStep > 0 && currentZoom >= zoomLevel) || (zoomStep < 0 && currentZoom <= zoomLevel)) {
            clearInterval(zoomInterval);
        }
        else {
            currentZoom += zoomStep;
            map.setZoom(currentZoom);
        }
    }, 100);
}
const PlaceMarker = (lat, lng, reactMap) => {
    return (_jsx(AdvancedMarker, { position: { lat: lat, lng: lng }, onClick: () => {
            zoomToPlace(lat, lng, 16, 500, reactMap);
        } }));
};
const FindNearbyClinics = (props) => {
    const { lati, long, setPlaceInfo, placeInfo } = props;
    const reactMap = useMap(); // gets map component from the component its in
    const placesLibrary = useMapsLibrary('places'); // gets place library
    const [placesService, setPlacesService] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [placeId, setPlaceId] = useState([]);
    // Given location (lati and long) center on the map
    useEffect(() => {
        if (!reactMap)
            return;
        reactMap.setCenter({ lat: lati, lng: long });
    }, [reactMap]);
    // Once placesLibrary and reactMap is generated, define and trigger placesService
    useEffect(() => {
        if (!placesLibrary || !reactMap)
            return;
        setPlacesService(new placesLibrary.PlacesService(reactMap));
    }, [placesLibrary, reactMap]);
    // Once placesService is triggered, query and place marker for nearby clinics
    useEffect(() => {
        if (!placesService || !reactMap)
            return;
        var request = {
            keyword: 'birth control near me|planned parenthood', // Search for bc / planned parenthood near you
            location: { lat: lati, lng: long }, // Replace with your current location
            radius: 32186.9, // 32186.9 meters (20 mile) radius
            type: 'health',
        };
        // Query
        placesService.nearbySearch(request, function (results, status) {
            if (status === placesLibrary.PlacesServiceStatus.OK) {
                let newListOfPlaceIds = [];
                let newListOfMarkers = [];
                results.forEach(function (place) {
                    const location = place.geometry.location;
                    const lat = location.lat();
                    const lng = location.lng();
                    const marker = PlaceMarker(lat, lng, reactMap);
                    const resultPlaceId = place.place_id;
                    newListOfPlaceIds.push(resultPlaceId);
                    newListOfMarkers.push(marker);
                });
                if (newListOfPlaceIds.length === newListOfMarkers.length) {
                    setPlaceId((prevId) => [...prevId, ...newListOfPlaceIds]);
                    setMarkers((prevMarkers) => [...prevMarkers, ...newListOfMarkers]);
                }
            }
        });
    }, [placesService]);
    useEffect(() => {
        if (!placeId || !placesService)
            return;
        placeId.forEach((obj) => {
            getPlaceDetails(obj);
        });
    }, [placeId]);
    // Updates placeInfo objs that have name, opening hours, isOpen (T or F) and trigger useEffect
    function getPlaceDetails(placeId) {
        var detailsRequest = {
            placeId: placeId,
            fields: ['name', 'opening_hours', 'geometry', 'website', 'formatted_phone_number', 'photos', 'address_component', 'scope'], // Request the name and opening hours fields
        };
        placesService.getDetails(detailsRequest, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const location = place.geometry.location;
                const lat = location.lat();
                const lng = location.lng();
                const sendPlaceInfo = {
                    name: place.name,
                    opening_hours: place.opening_hours.weekday_text[getCurrentDayIndex()],
                    isOpen: place.opening_hours.open_now,
                    onClick: () => {
                        reactMap.setZoom(16);
                        reactMap.setCenter({ lat, lng });
                    },
                    lat,
                    lng,
                    distance: calculateDistance(lat, lng, lati, long),
                    formatted_phone_number: place.formatted_phone_number,
                    photo: place.photos[0].getUrl(),
                    city: place.address_components[3].long_name.includes("County") ? place.address_components[2].long_name : place.address_components[3].long_name,
                };
                setPlaceInfo((oldPlaceInfo) => [...oldPlaceInfo, sendPlaceInfo]);
            }
        });
    }
    ;
    return (_jsx(_Fragment, { children: markers && markers.map((item) => item) }));
};
const UserIcon = (props) => {
    const { lati, long } = props;
    const reactMap = useMap();
    return (_jsx(_Fragment, { children: _jsx(AdvancedMarker, { position: { lat: lati, lng: long }, onClick: () => {
                zoomToPlace(lati, long, 16, 500, reactMap);
            }, children: _jsx("img", { src: duckImage, className: "rounded-full shadow-glow-yellow border-8 border-yellow-500 border-opacity-100", width: 40, height: 40 }) }) }));
};
// const INITIAL_CAMAERA = {
//   zoom: 12,
//   style: {width: '100%', height: '100%'},
//   center: {lat: 34.052235, lng: -118.243683},
// }
const ReactMap = (props) => {
    const { placeInfo, setPlaceInfo, lat, lng } = props;
    return (_jsxs(APIProvider, { apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, children: [_jsx(Map, { mapId: '0', style: { width: '100%', height: '100%' }, defaultCenter: { lat, lng }, defaultZoom: 11, gestureHandling: 'greedy', defaultTilt: 67.5, disableDefaultUI: true, zoomControl: true, streetViewControl: true }), _jsx(FindNearbyClinics, { placeInfo: placeInfo, setPlaceInfo: setPlaceInfo, lati: lat, long: lng }), _jsx(UserIcon, { lati: lat, long: lng })] }));
};
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in miles
    return Number(distance.toFixed(1));
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
function IndividualPlace(props) {
    const { place, setIsClicked } = props;
    const { name, opening_hours, distance, isOpen, photo, city, lat, lng } = place;
    const reactMap = useMap();
    return (_jsx("div", { className: "font-inter font-bold grid grid-rows-20 grid-cols-1 border-l-2 border-b-2 rounded-bl-xl rounded-tl-xl border-t-2", children: _jsx("div", { className: "w-96 flex flex-col", children: _jsxs("div", { className: "flex flex-row relative", children: [_jsxs("div", { children: [_jsx("div", { className: "w-full h-44 bg-cover bg-center bg-no-repeat", style: { backgroundImage: `url(${photo})` } }), _jsxs("div", { className: "p-4 w-full h-full", children: [_jsx("p", { className: "text-xl font-bold", children: name }), _jsxs("p", { className: "mt-1 mb-1 text-sm font-normal", children: ["Birth Control Clinic ", _jsx("span", { className: "text-xs", children: '\u25CF' }), " ", city] }), _jsxs("div", { className: "pt-2 pb-2 mt-4 mb-4 grid grid-cols-3 gap-0 text-center border-t border-b", children: [_jsxs("div", { className: "flex flex-col border-r justify-center", children: [_jsx("p", { className: " text-sm font-bold inline-block", children: "Open" }), _jsx("p", { className: `inline-block text-sm font-normal ${isOpen ? 'text-green-500' : 'text-red-500'}`, children: isOpen ? 'Yes' : 'No' })] }), _jsxs("div", { className: "flex flex-col border-r justify-center", children: [_jsx("p", { className: "inline-block text-sm font-bold", children: "Hours" }), _jsx("p", { className: "inline-block text-xs font-normal", children: opening_hours })] }), _jsxs("div", { className: "flex flex-col justify-center", children: [_jsx("p", { className: "inline-block text-sm font-bold ", children: "Distance" }), _jsxs("p", { className: "inline-block text-xs font-normal", children: [distance, " mi"] })] })] })] })] }), _jsx("div", { className: "absolute w-full flex items-top justify-end z-10", children: _jsx("button", { className: "relative flex items-center text-black justify-center font-bold hover:bg-gray-500 hover:text-white cursor-pointer rounded-full p-1 transition duration-300 ease-in-out outline-none focus:outline-none", onClick: () => {
                                setIsClicked(false);
                                zoomToPlace(latitude, longitude, 12, 500, reactMap);
                            }, style: { width: '40px', height: '40px' }, children: _jsx("span", { className: " hover:opacity-100 transition duration-300 ease-in-out font-inter", children: "X" }) }) })] }) }) }));
}
function getLocation(setLat, setLng) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    }
}
// given location find birth control places nearby and find them in a radius
function Maps() {
    const [placeInfo, setPlaceInfo] = useState([]);
    // const lat = 34.052235; // 33.684566  34.052235 LA
    // const lng = -118.243683; // -117.826508 -118.243683
    // const lat = 33.684566; // Irvine
    // const lng = -117.826508;
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    useEffect(() => {
        getLocation(setLat, setLng);
    }, []);
    const [numClinics, setNumClinics] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [individualPlace, setIndividualPlace] = useState(null);
    const handleToggle = (place) => {
        setIsClicked(!isClicked);
        setIndividualPlace(place);
    };
    return (_jsx(_Fragment, { children: lat && lng &&
            _jsx("div", { className: "flex justify-center items-center w-full h-screen", children: _jsxs("div", { className: "flex justify-center items-center h-screen", children: [" ", _jsxs("div", { className: "p-8 grid grid-cols-2 h-full", children: [" ", _jsxs("div", { className: "overflow-y-scroll h-full md:col-span-1", children: [" ", _jsx("div", { className: "w-full h-full flex jusitfy-end pl-24 box-border", children: _jsx("div", { className: "font-inter font-bold grid grid-rows-20 grid-cols-1", children: !isClicked ? (_jsxs("div", { className: "font-inter font-bold grid grid-rows-20 grid-cols-1 border-l-2 ", children: [_jsxs("div", { className: "m-2 mt-4 p-3 sticky top-0 z-10 bg-white h-17 flex flex-row items-left block text-2xl", style: { boxShadow: '0 20px 30px -10px rgba(255, 255, 255, 1)' }, children: [_jsx("img", { src: searchIcon, className: "m-4 w-8 h-8 flex items-center items-center" }), _jsxs("div", { children: [_jsx("p", { className: "underline", children: "Clinics Near You" }), _jsx("p", { className: "text-base text-gray-400 font-light", children: numClinics ? `${numClinics} nearby` : '' })] })] }), _jsx(PlacesNearYou, { placeInfo: placeInfo, setPlaceInfo: setPlaceInfo, setNumClinics: setNumClinics, lat: lat, lng: lng, onPlaceClick: handleToggle })] })) : (individualPlace && _jsx(IndividualPlace, { place: individualPlace, setIsClicked: setIsClicked })) }) })] }), _jsxs("div", { className: "", children: [" ", _jsx(ReactMap, { className: "w-full h-full", placeInfo: placeInfo, setPlaceInfo: setPlaceInfo, lat: lat, lng: lng })] })] })] }) }) }));
}
export default Maps;
export { ReactMap };
