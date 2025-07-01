import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalData } from '@store';

const saleIcon = L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" width="40" height="50">
            <g>
                <path d="M32 0C14.3 0 0 14.3 0 32c0 11.2 6.2 21.1 15.5 26.5L32 80l16.5-21.5C57.8 53.1 64 43.2 64 32 64 14.3 49.7 0 32 0z" fill="#207CC8"/>
                <circle cx="32" cy="32" r="24" fill="#fff"/>
                <g transform="translate(0, 4)">
                  <path d="M18 42V28l14-10 14 10v14h-8v-8h-12v8z" fill="#207CC8"/>
                  <rect x="28" y="36" width="8" height="8" fill="#fff"/>
                </g>
            </g>
        </svg>
    `,
    className: 'sale-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
});

const rentIcon = L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" width="40" height="50">
            <g>
                <path d="M32 0C14.3 0 0 14.3 0 32c0 11.2 6.2 21.1 15.5 26.5L32 80l16.5-21.5C57.8 53.1 64 43.2 64 32 64 14.3 49.7 0 32 0z" fill="#22c55e"/>
                <circle cx="32" cy="32" r="24" fill="#fff"/>
                <g transform="translate(0, 4)">
                  <rect x="20" y="26" width="24" height="20" rx="2" fill="#22c55e"/>
                  <rect x="25" y="32" width="6" height="6" fill="#fff"/>
                  <rect x="33" y="32" width="6" height="6" fill="#fff"/>
                  <rect x="25" y="40" width="6" height="6" fill="#fff"/>
                  <rect x="33" y="40" width="6" height="6" fill="#fff"/>
                </g>
            </g>
        </svg>
    `,
    className: 'rent-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
});

interface MapProps {
    points: ExternalData[];
    center?: [number, number];
}

export function Map({ points, center }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMapRef = useRef<L.Map | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    // Observer para detectar troca de tema
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;
        if (leafletMapRef.current) return;

        const map = L.map(mapRef.current).setView([39.55, -8.2245], 8);
        leafletMapRef.current = map;

        return () => {
            map.remove();
            leafletMapRef.current = null;
        };
    }, []);

    // Recentrar o mapa quando center ou points mudam
    useEffect(() => {
        if (!leafletMapRef.current) return;
        const map = leafletMapRef.current;

        if (points && points.length > 0) {
            const bounds = L.latLngBounds(points.map((p) => [p.latitude, p.longitude]));
            map.fitBounds(bounds, { padding: [40, 40] });
        } else if (center) {
            map.setView(center, 11);
        } else {
            map.setView([39.55, -8.2245], 7);
        }
    }, [center, points]);

    // Atualiza o tile layer quando o tema muda
    useEffect(() => {
        if (!leafletMapRef.current) return;
        const map = leafletMapRef.current;

        // Remove todos os tile layers existentes
        map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });

        const tileUrl = isDarkMode
            ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            : 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';

        const tileOptions = isDarkMode
            ? {
                  minZoom: 0,
                  maxZoom: 20,
                  attribution:
                      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                  ext: 'png',
              }
            : {
                  minZoom: 0,
                  maxZoom: 20,
                  attribution:
                      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                  ext: 'png',
              };

        L.tileLayer(tileUrl, tileOptions).addTo(map);
    }, [isDarkMode]);

    useEffect(() => {
        if (!leafletMapRef.current) return;
        const map = leafletMapRef.current;

        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        points.forEach((point) => {
            const icon = point.type === 'sale' ? saleIcon : rentIcon;
            const typeLabel = point.type === 'sale' ? 'Sale' : 'Rental';
            const priceToShow = point.type === 'sale' ? point.price * 0.7 : point.price;
            const priceFormatted = priceToShow.toLocaleString('en-US', {
                style: 'currency',
                currency: 'EUR',
            });

            const popupStyles = isDarkMode
                ? 'background-color: #1f2937; color: #f9fafb; padding: 6px;'
                : 'background-color: #ffffff; color: #1f2937; padding: 6px;';

            const popupContent = `
                <div style="min-width: 200px; ${popupStyles} padding: 12px; border-radius: 8px;">
                    <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: ${isDarkMode ? '#f9fafb' : '#1f2937'};">
                        ${point.title}
                    </div>
                    <div style="font-size: 12px; color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; margin-bottom: 6px;">
                        <strong>Type:</strong> ${typeLabel}
                    </div>
                    <div style="font-size: 12px; color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; margin-bottom: 6px;">
                        <strong>Price:</strong> ${priceFormatted}
                    </div>
                    <div style="font-size: 12px; color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; margin-bottom: 6px;">
                        <strong>Location:</strong> ${point.province}
                    </div>
                    <div style="font-size: 12px; color: ${isDarkMode ? '#9ca3af' : '#6b7280'};">
                        <strong>Address:</strong> ${point.address}
                    </div>
                    ${point.subtitle ? `<div style="font-size: 12px; color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; margin-top: 6px; font-style: italic;">${point.subtitle}</div>` : ''}
                </div>
            `;

            L.marker([point.latitude, point.longitude], { icon }).addTo(map).bindPopup(popupContent);
        });
    }, [points, isDarkMode]);

    return <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: 8 }} />;
}
