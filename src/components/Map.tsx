import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

interface SearchProps {
  searchResults: SearchDetail[];
}

const Map = ({ searchResults }: SearchProps) => {
  const [selectedLocation, setSelectedLocation] = useState<SearchDetail | null>(null);
  const coordinates = searchResults.map(({ long, lat }) => ({
    longitude: long,
    latitude: lat,
  }));
  const center = getCenter(coordinates);
  const [viewPort, setViewPort] = useState({
    ...(center && {
      longitude: center.longitude,
      latitude: center.latitude,
      zoom: 16,
    }),
  });

  return (
    <ReactMapGL
      mapStyle={`${process.env.NEXT_PUBLIC_MAPBOX_STYLE}`}
      mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      {...viewPort}
      onMove={(event) => setViewPort(event.viewState)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat} offset={[-20, -10]}>
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="animate-bounce cursor-pointer text-2xl"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation && selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation(null)}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
