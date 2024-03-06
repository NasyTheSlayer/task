import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { Map } from "./components/Map";
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 50.4501,
  lng: 30.5234,
};

const libraries = ["places"];

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY!,
    libraries: libraries as any[],
  });

  return (
    <div>{isLoaded ? <Map center={defaultCenter} /> : <h2>Loading</h2>}</div>
  );
};

export default App;
