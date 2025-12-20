
import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Location = () => {
    const position = [23.6850, 90.3563];
    const mapRef = useRef(null);

    return (
        <div className='my-20'>
            <h3 className="text-5xl font-bold mb-10 leading-tight bg-linear-to-l from-blue-700 to-purple-600 bg-clip-text text-transparent">In Our Office Location</h3>
            <div className='rounded-2xl w-full h-[800px]'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        <Marker
                            position={position}>
                            <Popup>
                                <strong>eTutionBD</strong> <br /> Service Area: {position}.
                            </Popup>
                        </Marker>
                    }

                </MapContainer>
            </div>
        </div>
    );
};

export default Location;