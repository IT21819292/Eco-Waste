import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const AddSpecialRoute = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const directionsCallback = (res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    } else {
      setError('Directions request failed due to ' + res.status);
    }
  };

  const checkDistance = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    if (response) {
      const distance = response.routes[0].legs[0].distance.value;
      if (distance > 10000) {
        setError('The distance between the two destinations is more than 10km');
        setResponse(null);
      } else {
        setError(''); // Clear any previous error message
        // Here you can add the code to save the route if the distance is less than 10km
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="Google API Key">
      <div>
        <form onSubmit={checkDistance}>
          <input type="text" onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
          <input type="text" onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
          <input type="submit" value="Check Distance" />
        </form>
        {error && <p>{error}</p>}
        <GoogleMap
          id='direction-example'
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          zoom={2}
          center={{
            lat: 0,
            lng: -180
          }}
        >
          {
            (origin !== '' && destination !== '') && (
              <DirectionsService
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: 'DRIVING'
                }}
                callback={directionsCallback}
              />
            )
          }

          {
            response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response
                }}
              />
            )
          }
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default AddSpecialRoute;
