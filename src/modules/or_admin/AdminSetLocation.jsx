import React, { useState, useEffect } from "react";
import GetLocation from "../../components/GetLocation";
import axios from "axios";
import { BASE_URL, TOCKEN_ONLY } from "../../api/baseurl";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { FaMapMarkerAlt, FaLocationArrow, FaSearch, FaSave } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import toast, { Toaster } from "react-hot-toast";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        accuracy: "manual",
      });
      toast.success("Location pinned");
    },
  });
  return null;
}

function SearchControl() {
  const map = useMapEvents({});
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      autoClose: true,
      keepResult: true,
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);
  return null;
}

function AdminSetLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGpsLocation = (loc) => {
    setLocation(loc);
    toast.success("GPS Captured!");
  };

  const sendLocation = async () => {
    if (!location) {
      toast.error("Select a location first");
      return;
    }
    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}/api/organisation/set-location/`,
        { latitude: location.lat, longitude: location.lng },
        TOCKEN_ONLY()
      );
      toast.success("Location updated!");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 ">
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto bg-white shadow-2xl  sm:rounded-2xl overflow-hidden border border-gray-100">
        
        <header className="bg-slate-900 p-5 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20">
              <FaMapMarkerAlt size={28} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Organisation Location</h2>
              <p className="text-slate-400 text-xs sm:text-sm">Pin your workplace coordinates</p>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          
          {/* Option 1: GPS - Grid Layout for mobile */}
          <section className="bg-blue-50/40 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3 text-blue-900">
              <FaLocationArrow size={16} />
              <h3 className="font-bold uppercase tracking-widest text-[11px] sm:text-xs">Option 1: Device GPS</h3>
            </div>
            <div className="w-full flex justify-center sm:justify-start">
              <GetLocation onLocation={handleGpsLocation} />
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700">
              <FaSearch size={16} />
              <h3 className="font-bold uppercase tracking-widest text-[11px] sm:text-xs">Option 2: Manual Selection</h3>
            </div>
            
            <div className="rounded-xl overflow-hidden border-2 border-slate-100 shadow-sm z-10">
              <MapContainer
                center={[10.8505, 76.2711]}
                zoom={15}
                className="z-0 h-[300px] sm:h-[400px] w-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                <SearchControl />
                <LocationPicker setLocation={setLocation} />
                {location && <Marker position={[location.lat, location.lng]} />}
              </MapContainer>
            </div>
          </section>

          <footer className="pt-6 border-t border-gray-100 flex flex-col lg:flex-row gap-4 lg:items-end">
            
            <div className="flex-1 w-full">
              {location ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-400 font-black">Latitude</span>
                    <span className="font-mono text-sm sm:text-base text-slate-800 tabular-nums">
                      {location.lat.toFixed(6)}
                    </span>
                  </div>
                  <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
                    <span className="text-[10px] uppercase text-slate-400 font-black">Longitude</span>
                    <span className="font-mono text-sm sm:text-base text-slate-800 tabular-nums">
                      {location.lng.toFixed(6)}
                    </span>
                  </div>
                  <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
                    <span className="text-[10px] uppercase text-slate-400 font-black">Accuracy</span>
                    <span className="text-blue-600 font-bold text-sm sm:text-base capitalize">
                      {location.accuracy}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm italic">
                  Waiting for selection...
                </div>
              )}
            </div>

            <button
              onClick={sendLocation}
              disabled={loading || !location}
              className={`w-full lg:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg ${
                loading || !location
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:shadow-blue-300"
              }`}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={18} />
              ) : (
                <FaSave size={18} />
              )}
              <span>{loading ? "Updating..." : "Save Location"}</span>
            </button>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default AdminSetLocation;