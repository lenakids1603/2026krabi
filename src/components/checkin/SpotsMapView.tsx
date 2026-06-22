import { useEffect, useMemo, useRef, useState } from 'react';
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
import { cn } from '../../lib/utils';

// `focus` = the selection came from the list and the map should pan/zoom to it.
// Marker clicks select without focus (the marker is already on screen).
type Selection = { id: string | null; focus: boolean };

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

export default function SpotsMapView({ spots, onNavigate }: Props) {
  const [selection, setSelection] = useState<Selection>({ id: null, focus: false });
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const select = (id: string | null, focus: boolean) => setSelection({ id, focus });

  // Marker click (or list click) → scroll the matching list row into view.
  // Scoped to the list container so it never yanks the whole page on mobile.
  useEffect(() => {
    if (!selection.id) return;
    const el = itemRefs.current[selection.id];
    const container = listRef.current;
    if (!el || !container) return;
    const e = el.getBoundingClientRect();
    const c = container.getBoundingClientRect();
    if (e.top < c.top || e.bottom > c.bottom) {
      container.scrollBy({ top: e.top - c.top - 12, behavior: 'smooth' });
    }
  }, [selection]);

  if (spots.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-[2rem] border border-outline-variant/30 text-on-surface-variant">
        正在加载打卡点…
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
      {/* Map — large area on the left (desktop) / on top (mobile) */}
      <div className="relative w-full lg:flex-1 h-72 sm:h-80 lg:h-[70vh] lg:min-h-[500px] rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm bg-surface-container-high shrink-0">
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
              <MapContents spots={spots} selection={selection} onSelect={select} />
            </GoogleMap>
          </APIProvider>
        ) : (
          <MissingKeyNotice />
        )}
      </div>

      {/* Linked list — scrollable column on the right (desktop) / below (mobile) */}
      <div
        ref={listRef}
        className="w-full lg:w-[360px] xl:w-[400px] max-h-[58vh] lg:max-h-none lg:h-[70vh] overflow-y-auto hide-scrollbar space-y-3 pr-0.5 shrink-0"
      >
        {spots.map((spot) => {
          const active = spot.id === selection.id;
          const color = colorFor(spot.category);
          return (
            <div
              key={spot.id}
              ref={(el) => {
                itemRefs.current[spot.id] = el;
              }}
              onClick={() => select(spot.id, true)}
              className={cn(
                'flex gap-3 p-3 rounded-2xl border bg-white cursor-pointer transition-all',
                active
                  ? 'border-primary ring-2 ring-primary/30 shadow-md'
                  : 'border-outline-variant/30 hover:border-primary/40 hover:shadow-sm',
              )}
            >
              <img
                src={spot.image}
                alt={spot.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = IMG_FALLBACK;
                }}
                className="w-20 h-20 rounded-xl object-cover shrink-0 bg-surface-container-high"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: color.bg }}
                  />
                  <h4 className="font-heading font-bold text-sm text-on-surface truncate">
                    {spot.name}
                  </h4>
                </div>
                <span className="inline-block mt-1 text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
                  {spot.category}
                </span>
                <p className="text-[11px] text-on-surface-variant/80 leading-snug mt-1 line-clamp-2">
                  {spot.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(spot);
                  }}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer"
                >
                  <Navigation size={12} /> 一键导航
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Markers + info window. Lives inside <Map> so it can drive the map via useMap().
function MapContents({
  spots,
  selection,
  onSelect,
}: {
  spots: CheckinSpot[];
  selection: Selection;
  onSelect: (id: string | null, focus: boolean) => void;
}) {
  const map = useMap();
  const didFit = useRef(false);

  // Initial framing via fitBounds (with padding). Runs once per map view open.
  useEffect(() => {
    if (!map || didFit.current) return;
    map.fitBounds(boundsOf(spots), 56);
    didFit.current = true;
  }, [map, spots]);

  // List → map: pan (and zoom in if currently zoomed out) to the chosen marker.
  useEffect(() => {
    if (!map || !selection.id || !selection.focus) return;
    const spot = spots.find((s) => s.id === selection.id);
    if (!spot) return;
    map.panTo({ lat: spot.lat, lng: spot.lng });
    if ((map.getZoom() ?? 0) < 13) map.setZoom(14);
  }, [map, selection, spots]);

  const active = useMemo(
    () => spots.find((s) => s.id === selection.id) ?? null,
    [spots, selection.id],
  );

  return (
    <>
      {spots.map((spot) => {
        const color = colorFor(spot.category);
        const isActive = spot.id === selection.id;
        return (
          <AdvancedMarker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            zIndex={isActive ? 20 : 1}
            onClick={() => onSelect(spot.id, false)}
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
          onCloseClick={() => onSelect(null, false)}
        >
          <div style={{ maxWidth: 210, padding: '2px 2px 4px' }}>
            <div style={{ fontWeight: 800, color: '#00516E', fontSize: 13, lineHeight: 1.3 }}>
              {active.name}
            </div>
            <div style={{ marginTop: 3, fontSize: 11, color: '#5b6b70', lineHeight: 1.4 }}>
              <span style={{ fontWeight: 700 }}>{active.category}</span>
              {' · '}
              {active.description.length > 30
                ? active.description.slice(0, 30) + '…'
                : active.description}
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
          即可显示真实地图；右侧列表不受影响，仍可正常浏览与导航。
        </p>
      </div>
    </div>
  );
}
