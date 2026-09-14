import { useEffect, useRef, useState } from 'react'
import { ExternalLink, MapPinned } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { officialLinks } from '../data/site'

type MapState = 'loading' | 'ready' | 'error'

export function WardMap() {
  const mapElement = useRef<HTMLDivElement>(null)
  const [mapState, setMapState] = useState<MapState>('loading')

  useEffect(() => {
    let active = true
    let map: import('leaflet').Map | undefined

    Promise.all([
      import('leaflet'),
      fetch('/data/ward-1.geojson').then((response) => {
        if (!response.ok) throw new Error('Ward boundary could not be loaded.')
        return response.json()
      }),
    ])
      .then(([leafletModule, wardBoundary]) => {
        if (!active || !mapElement.current) return
        const L = leafletModule.default

        map = L.map(mapElement.current, {
          attributionControl: true,
          scrollWheelZoom: false,
          zoomControl: true,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(map)

        const boundary = L.geoJSON(wardBoundary, {
          style: {
            color: '#d74035',
            fillColor: '#f5c64f',
            fillOpacity: 0.32,
            opacity: 1,
            weight: 4,
          },
        }).addTo(map)

        map.fitBounds(boundary.getBounds(), { padding: [24, 24] })
        L.control.scale({ imperial: false }).addTo(map)
        setMapState('ready')
      })
      .catch(() => {
        if (active) setMapState('error')
      })

    return () => {
      active = false
      map?.remove()
    }
  }, [])

  return (
    <div className="ward-map-frame">
      <div
        ref={mapElement}
        className="ward-map-canvas"
        role="application"
        aria-label="Interactive map showing the official Cambridge Ward 1 boundary"
      />
      {mapState === 'loading' && <div className="map-message">Loading the Ward 1 boundary…</div>}
      {mapState === 'error' && (
        <div className="map-message map-message-error">
          The interactive map is unavailable. Use the official City ward lookup below.
        </div>
      )}
      <div className="ward-map-key"><span /> Official Ward 1 boundary</div>
      <div className="ward-map-source">
        <span><MapPinned size={16} /> Boundary data: City of Cambridge Open Data</span>
        <a href={officialLinks.wardLookup} target="_blank" rel="noreferrer">
          Check an address <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
