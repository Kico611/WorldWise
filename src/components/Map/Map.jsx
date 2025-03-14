import { useCities } from "../../contexts/CitiesContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import Button from "../Button/Button";

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [mapCenter, setMapCenter] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) {
      setMapCenter([parseFloat(lat), parseFloat(lng), 6]);
    }
  }, [lat, lng]);

  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
  }

  function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
    });
  }

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapCenter} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
