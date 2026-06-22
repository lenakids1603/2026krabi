import { useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { Navigation, MapPin } from 'lucide-react';
import { CheckinSpot } from '../../types/api';
import { MAPS_API_KEY, hasValidMapsKey } from '../../lib/mapsKey';

// Optional per-category marker colours (task step 3, optional). Falls back to teal.
const CATEGORY_COLORS: Record<string, { bg: string; border: string }> = {
  摄影位: { bg: '#FF7E53', border: '#E0633B' },
  餐厅: { bg: '#EF4444', border: '#B91C1C' },
  酒吧: { bg: '#8B5CF6', border: '#6D28D9' },
  咖啡馆: { bg: '#F59E0B', border: '#B45309' },
  其他: { bg: '#00516E', border: '#003A50' },
};
function colorFor(category: string) {
  return CATEGORY_COLORS[category] ?? { bg: '#00516E', border: '#003A50' };
}

// Same graceful fallback the card view uses when a custom image fails to load.
const IMG_FALLBACK =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';

// Frame all spots (Krabi in the north + Lanta in the south) — derived from the
// data, so no center/zoom is hard-coded.
function boundsOf(spots: CheckinSpot[]): google.maps.LatLngBoundsLiteral {
  const lats = spots.map((s) => s.lat);
  const lngs = spots.map((s) => s.lng);
  const pad = 0.04;
  return {
    north: Math.max(...lats) + pad,
    south: Math.min(...lats) - pad,
    east: Math.max(...lngs) + pad,
    west: Math.min(...lngs) - pad,
  };
}

interface Props {
  spots: CheckinSpot[];
  onNavigate: (spot: CheckinSpot) => void;
}

// Full-bleed, tall map. Tapping a marker opens a rich info card (image + name +
// category + description + 一键导航). There is no separate list.
export default function SpotsMapView({ spots, onNavigate }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (spots.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-[2rem] border border-outline-variant/30 text-on-surface-variant">
        正在加载打卡点…
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] min-h-[580px] rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm bg-surface-container-high">
      {hasValidMapsKey ? (
        <APIProvider apiKey={MAPS_API_KEY} version="weekly">
          <GoogleMap
            defaultBounds={boundsOf(spots)}
            mapId="DEMO_MAP_ID"
            gestureHandling="greedy"
            clickableIcons={false}
            reuseMaps
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            <MapContents
              spots={spots}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onNavigate={onNavigate}
            />
          </GoogleMap>
        </APIProvider>
      ) : (
        <MissingKeyNotice />
      )}
    </div>
  );
}

// Markers + info window. Lives inside <Map> so it can drive the map via useMap().
function MapContents({
  spots,
  selectedId,
  onSelect,
  onNavigate,
}: {
  spots: CheckinSpot[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onNavigate: (spot: CheckinSpot) => void;
}) {
  const map = useMap();
  const didFit = useRef(false);

  // Initial framing via fitBounds (with padding). Runs once per map view open.
  useEffect(() => {
    if (!map || didFit.current) return;
    map.fitBounds(boundsOf(spots), 56);
    didFit.current = true;
  }, [map, spots]);

  const active = spots.find((s) => s.id === selectedId) ?? null;

  return (
    <>
      {spots.map((spot) => {
        const color = colorFor(spot.category);
        const isActive = spot.id === selectedId;
        return (
          <AdvancedMarker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            zIndex={isActive ? 20 : 1}
            onClick={() => onSelect(spot.id)}
          >
            <Pin
              background={color.bg}
              borderColor={isActive ? '#FFFFFF' : color.border}
              glyphColor="#FFFFFF"
              scale={isActive ? 1.45 : 1}
            />
          </AdvancedMarker>
        );
      })}

      {active && (
        <InfoWindow
          position={{ lat: active.lat, lng: active.lng }}
          pixelOffset={[0, -44]}
          onCloseClick={() => onSelect(null)}
        >
          <div style={{ width: 240, maxWidth: '78vw' }}>
            <img
              src={active.image}
              alt={active.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = IMG_FALLBACK;
              }}
              style={{
                width: '100%',
                height: 128,
                objectFit: 'cover',
                borderRadius: 10,
                display: 'block',
              }}
            />
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    background: colorFor(active.category).bg,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontWeight: 800, color: '#00516E', fontSize: 14, lineHeight: 1.25 }}>
                  {active.name}
                </span>
              </div>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 5,
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#5b6b70',
                  background: '#eef2f4',
                  padding: '2px 8px',
                  borderRadius: 9999,
                }}
              >
                {active.category}
              </span>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: '#4b5a60', lineHeight: 1.5 }}>
                {active.description}
              </p>
              <button
                onClick={() => onNavigate(active)}
                style={{
                  marginTop: 10,
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '8px 10px',
                  background: '#FF7E53',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 12,
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}
              >
                <Navigation size={13} /> 一键导航
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MissingKeyNotice() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6 bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]">
      <span className="p-3 bg-white/80 rounded-2xl text-[#0284C7] shadow-sm">
        <MapPin size={26} />
      </span>
      <div className="space-y-1">
        <p className="font-heading font-bold text-sm text-[#00516E]">地图未配置</p>
        <p className="text-xs text-[#075985]/80 max-w-xs leading-relaxed">
          构建前设置环境变量 <code className="font-mono">GOOGLE_MAPS_PLATFORM_KEY</code>{' '}
          即可显示真实地图。
        </p>
      </div>
    </div>
  );
}
