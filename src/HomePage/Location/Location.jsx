import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MdOutlineBusinessCenter, MdPhone, MdEmail, MdPlace } from 'react-icons/md';

// Fix for default marker icon issues in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Location = () => {
    const position = [23.6850, 90.3563];
    const mapRef = useRef(null);

    return (
        <div className='my-24 max-w-7xl mx-auto px-4 lg:px-6'>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Find Us</span>
                    <h3 className="text-4xl md:text-5xl font-extrabold leading-tight bg-linear-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                        Our Office Location
                    </h3>
                </div>
                <p className="text-gray-500 dark:text-slate-400 max-w-md">
                    We are located at the heart of the city. Stop by for a coffee or reach out to us for any tuition-related inquiries.
                </p>
            </div>

            <div className='relative group'>
                <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                <div className='relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-800 h-[600px]'>       
                    <div className="absolute top-6 left-15 z-1000 hidden lg:block w-80">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary rounded-lg text-white">
                                    <MdOutlineBusinessCenter size={20} />
                                </div>
                                <h4 className="font-bold text-gray-800 dark:text-white">Headquarters</h4>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <MdPlace className="text-primary mt-1" size={18} />
                                    <p className="text-gray-600 dark:text-slate-300">123 Learning Way, Innovation District, Dhaka, Bangladesh</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdPhone className="text-primary" size={18} />
                                    <p className="text-gray-600 dark:text-slate-300">+880 1234-567890</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdEmail className="text-primary" size={18} />
                                    <p className="text-gray-600 dark:text-slate-300">support@etutionbd.com</p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/30">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    {/* Leaflet Map */}
                    <MapContainer
                        center={position}
                        zoom={8}
                        scrollWheelZoom={false}
                        className='h-full w-full z-10'
                        ref={mapRef}
                    >
                        {/* For a "Beautiful" look, you can use specialized map styles. 
                            Standard OSM tiles are used here, but in Dark Mode, 
                            the CSS filter 'invert(100%) hue-rotate(180deg)' 
                            can be applied to the TileLayer in your global CSS.
                        */}
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={position}>
                            <Popup className="custom-popup">
                                <div className="p-1">
                                    <h5 className="font-bold text-primary">eTutionBD</h5>
                                    <p className="text-xs text-gray-500">Official Service Hub</p>
                                    <p className="text-[10px] mt-2 font-mono">{position[0]}, {position[1]}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Location;