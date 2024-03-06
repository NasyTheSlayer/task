import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import s from "./Map.module.scss";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: true,
};

export const Map = ({ center }) => {
  const [markers, setMarkers] = useState([]);
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const handleMapClick = (event) => {
    const newMarker = {
      id: markers.length + 1,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers([...markers, newMarker]);
  };

  const handleMarkerDelete = (id) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(updatedMarkers);
  };

  const handleMarkerDragEnd = (index, event) => {
    const { latLng } = event;
    const updatedMarkers = [...markers];
    updatedMarkers[index].lat = latLng.lat();
    updatedMarkers[index].lng = latLng.lng();
    setMarkers(updatedMarkers);
  };

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={defaultOptions}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onRightClick={() => handleMarkerDelete(marker.id)}
            label={{
              text: marker.id.toString(),
              color: "white",
            }}
            draggable={true}
            onDragEnd={(event) => handleMarkerDragEnd(index, event)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
