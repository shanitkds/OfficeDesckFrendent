import React, { useEffect, useRef, useState } from "react";

function GetLocation({ onLocation }) {
  const [status, setStatus] = useState("waiting");
  const [coords, setCoords] = useState(null);
  const watchId = useRef(null);

  const cleanup = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const startGPS = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    setStatus("getting");

    let best = null;

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const r = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };

        console.log("📡 accuracy:", r.accuracy);

        // save best accuracy
        if (!best || r.accuracy < best.accuracy) {
          best = r;
          setCoords(r);

          if (onLocation) onLocation(r);
        }

        // if accuracy good → stop fast
        if (r.accuracy < 80) {
          cleanup();
          setStatus("done");
        }
      },
      (err) => {
        console.log(err);
        setStatus("error");
        cleanup();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    // stop after 10 sec anyway
    setTimeout(() => {
      cleanup();
      setStatus("done");
    }, 10000);
  };

  useEffect(() => {
    startGPS();
    return cleanup;
  }, []);

  return (
    <div>
      {status === "getting" && <p>📍 Getting location fast...</p>}
      {status === "done" && coords && (
        <p>
          ✅ Lat: {coords.lat.toFixed(5)} , Lng: {coords.lng.toFixed(5)}
          <br />
          Accuracy ±{coords.accuracy.toFixed(0)}m
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>
          ❌ Turn ON GPS + Allow Location Permission
        </p>
      )}
    </div>
  );
}

export default GetLocation;