
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix missing marker icons in Vite/CRA builds
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type MapPoint = {
  id: string | number;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
};

type Props = {
  center: [number, number];
  zoom?: number;
  points: MapPoint[];
  className?: string;
  height?: string | number;
};

export default function OptimizedMap({
  center,
  zoom = 5,
  points,
  className,
  height = "60vh",
}: Props) {
  const markers = useMemo(
    () =>
      points.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          {(p.title || p.description) && (
            <Popup>
              <strong>{p.title ?? "Location"}</strong>
              {p.description ? <div>{p.description}</div> : null}
            </Popup>
          )}
        </Marker>
      )),
    [points]
  );

  return (
    <div className={className} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        preferCanvas={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          keepBuffer={2}
        />
        {markers}
      </MapContainer>
    </div>
  );
}
