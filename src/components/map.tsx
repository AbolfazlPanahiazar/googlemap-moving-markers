import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import mapStyle from "./googleMapStyle.json";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

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
  children?: React.ReactNode;
}

const Map: React.FC<IGoogleMap> = ({ zoom, center, children }) => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBRxJucUrQqfh2z1DtWr-yBX4ujjHMpH1g",
    libraries: [],
  });

  const [_, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="w-full h-full bg-orange-600">
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
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {children || ""}
      </GoogleMap>
    </div>
  ) : (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ClimbingBoxLoader size={15} color="#0070d2" />
        Loading Map...
        {loadError && "There is a problem with Google Map"}
      </div>
    </>
  );
};

export default React.memo(Map);
