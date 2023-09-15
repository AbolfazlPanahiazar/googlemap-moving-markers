import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import mapStyle from "./googleMapStyle.json";
import ClimbingBoxLoader from "react-spinners/DotLoader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface IGoogleMap {
  center?: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map: React.FC<IGoogleMap> = ({ zoom, center }) => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBRxJucUrQqfh2z1DtWr-yBX4ujjHMpH1g",
    libraries: [],
  });

  const [markersPosition, setMarkersPosition] = useState<
    {
      key: string;
      lat: number;
      lng: number;
    }[]
  >([
    {
      key: "first",
      lat: 51,
      lng: 17,
    },
    {
      key: "second",
      lat: 52,
      lng: 17,
    },
    {
      key: "third",
      lat: 51,
      lng: 19,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPositons = markersPosition.map((markerPosition) => {
        return {
          ...markerPosition,
          lat: markerPosition.lat + 0.2,
          lng: markerPosition.lng + 0.2,
        };
      });

      setMarkersPosition(newPositons);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log({ markersPosition });
  }, [markersPosition]);

  return isLoaded ? (
    <div className="w-screen h-screen bg-orange-600">
      <GoogleMap
        key={1}
        mapContainerClassName="map-container"
        options={{
          styles: mapStyle,
          fullscreenControl: true,
          streetViewControl: false,
        }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        <MarkerF
          key="marker_10"
          position={{
            lat: 50.5,
            lng: 30.5,
          }}
        />
        {markersPosition.map((mp) => (
          <MarkerF
            key={mp.key}
            position={{
              lat: mp.lat,
              lng: mp.lng,
            }}
            icon={{
              url: "https://img.icons8.com/ios-filled/50/airplane-mode-on.png",
            }}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <ClimbingBoxLoader size={15} color="#0070d2" />
        Loading...
        {loadError && "There is a problem with Google Map"}
      </div>
    </>
  );
};

export default React.memo(Map);
