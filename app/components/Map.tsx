"use client"

import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useCountries } from '../lib/getCountries';
import { icon } from 'leaflet';

const ICON = icon  ({
    iconUrl: 'https://images.ctfassets.net/3prze68gbwl1/assetglossary-17su9wok1ui0z7w/c4c4bdcdf0d0f86447d3efc450d1d081/map-marker.png',
    iconSize: [50, 50]
})

export default function Map({locationValue}: {locationValue: string}) {
    const {getCountryByValue} = useCountries()
    const latLang = getCountryByValue(locationValue)?.latLang
    if (!window) return null
    return (
        <MapContainer scrollWheelZoom={false} className="h-[50vh] rounded-lg relative z-0"
        center={latLang ?? [52.505, 0.09]}
        zoom={8}>
            <TileLayer 
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             
        <Marker position={latLang ??[52.505, 0.09]} icon={ICON}/>

        </MapContainer>
    )
}