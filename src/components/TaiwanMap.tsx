'use client';

import { useState, useEffect } from 'react';
import type { ExtendedFeatureCollection, ExtendedFeature } from 'd3-geo';
import type { Position, Polygon } from 'geojson';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { geoMercator, geoPath, geoArea } from 'd3-geo';
import { CITIES } from '@/lib/cities';

const TAIWAN_TOPO_URL = '/geo/taiwan-country.topo.json';

const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;
const OFFSHORE_WIDTH = 250;
const OFFSHORE_HEIGHT = SVG_HEIGHT / 3;
const MAIN_X_START = OFFSHORE_WIDTH + 8;

const OFFSHORE_COUNTY_NAMES = ['連江縣', '金門縣', '澎湖縣'];

const OFFSHORE_COUNTY_SCALES: Record<string, number> = {
  連江縣: 1.25,
  金門縣: 1,
  澎湖縣: 1,
};

const OFFSHORE_COUNTY_OFFSETS: Record<string, [number, number]> = {
  連江縣: [160, 50],
  金門縣: [160, -80],
  澎湖縣: [30, -60],
};

const OFFSHORE_ISLAND_OFFSETS: Record<
  string,
  Record<number, [number, number]>
> = {
  連江縣: {
    0: [0, -80],
    1: [0, -80],
    2: [0, 0],
    3: [-10, 20],
    4: [-10, 30],
    5: [-250, 70],
  },
  金門縣: {
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
  },
  澎湖縣: {
    0: [15, -70],
    1: [-30, -70],
    2: [0, -45],
    3: [0, 0],
    4: [0, 0],
    5: [0, 10],
  },
};

const LABEL_OFFSETS: Record<string, [number, number]> = {
  基隆市: [12, -8],
  新北市: [0, 15],
  新竹市: [-10, 0],
  臺中市: [-4, 5],
  嘉義縣: [-44, 4],
  嘉義市: [12, 0],
  高雄市: [8, 0],
  屏東縣: [-10, 0],
  花蓮縣: [2, 0],
  金門縣: [20, 0],
  澎湖縣: [30, 0],
};

interface TaiwanMapProps {
  currentCity: string;
  onCitySelect: (cityKey: string) => void;
}

const fetchTaiwanTopo = async (): Promise<Topology | undefined> => {
  try {
    return (await fetch(TAIWAN_TOPO_URL)).json();
  } catch (err) {
    console.error('Failed to load map.', err);
  }
};

const toFeatureCollection = (topo: Topology): ExtendedFeatureCollection => {
  return feature(topo, topo.objects.map) as ExtendedFeatureCollection;
};

const polygonArea = (coordinates: Position[][]): number =>
  geoArea({ type: 'Polygon', coordinates });

const splitToPolygons = (countyFeature: ExtendedFeature): ExtendedFeature[] => {
  const geometry = countyFeature.geometry;

  if (!geometry || geometry.type !== 'MultiPolygon') return [countyFeature];

  return geometry.coordinates.map((polygonCoords, polygonIndex) => ({
    ...countyFeature,
    geometry: { type: 'Polygon', coordinates: polygonCoords } as Polygon,
    properties: { ...countyFeature.properties, polygonIndex },
  }));
};

const isOffshoreCounty = (countyFeature: ExtendedFeature): boolean =>
  OFFSHORE_COUNTY_NAMES.includes(countyFeature.properties?.name);

const keepLargestPolygon = (
  countyFeature: ExtendedFeature,
): ExtendedFeature => {
  const geometry = countyFeature.geometry;

  if (!geometry || geometry.type !== 'MultiPolygon') return countyFeature;

  const largest = geometry.coordinates.reduce((maxPolygon, currentPolygon) =>
    polygonArea(currentPolygon) > polygonArea(maxPolygon)
      ? currentPolygon
      : maxPolygon,
  );

  return {
    ...countyFeature,
    geometry: { type: 'Polygon', coordinates: largest },
  };
};

export const TaiwanMap = ({ currentCity, onCitySelect }: TaiwanMapProps) => {
  const [mainFeatures, setMainFeatures] = useState<ExtendedFeature[] | null>(
    null,
  );
  const [offshoreFeatures, setOffshoreFeatures] = useState<
    ExtendedFeature[] | null
  >(null);
  const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const topoData = await fetchTaiwanTopo();

      if (!topoData) return;

      const geoData = toFeatureCollection(topoData);

      setMainFeatures(
        geoData.features
          .filter((countyFeature) => !isOffshoreCounty(countyFeature))
          .map(keepLargestPolygon),
      );

      setOffshoreFeatures(geoData.features.filter(isOffshoreCounty));
    })();
  }, []);

  if (!mainFeatures || !offshoreFeatures) return <svg />;

  const mainProjection = geoMercator().fitExtent(
    [
      [MAIN_X_START, 0],
      [SVG_WIDTH, SVG_HEIGHT],
    ],
    {
      type: 'FeatureCollection',
      features: mainFeatures,
    },
  );

  const mainPathGenerator = geoPath().projection(mainProjection);

  const offshoreRenderData = offshoreFeatures.map((offshoreFeature, index) => {
    const countyName = offshoreFeature.properties?.name;
    const projection = geoMercator().fitExtent(
      [
        [0, index * OFFSHORE_HEIGHT],
        [OFFSHORE_WIDTH, index * OFFSHORE_HEIGHT + OFFSHORE_HEIGHT],
      ],
      {
        type: 'FeatureCollection',
        features: [offshoreFeature],
      },
    );

    const scaleFactor = OFFSHORE_COUNTY_SCALES[countyName] ?? 1;

    if (scaleFactor !== 1) {
      const pathGeneratorForCentroid = geoPath().projection(projection);
      const [centroidX, centroidY] =
        pathGeneratorForCentroid.centroid(offshoreFeature);
      const [translateX, translateY] = projection.translate();

      projection.scale(projection.scale() * scaleFactor);
      projection.translate([
        centroidX * (1 - scaleFactor) + scaleFactor * translateX,
        centroidY * (1 - scaleFactor) + scaleFactor * translateY,
      ]);
    }

    const pathGenerator = geoPath().projection(projection);
    const polygons = splitToPolygons(offshoreFeature);

    return { offshoreFeature, pathGenerator, polygons };
  });

  return (
    <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="block w-full">
      <g>
        {offshoreRenderData.map(
          ({ offshoreFeature, pathGenerator, polygons }) => {
            const centroid = pathGenerator.centroid(offshoreFeature);
            const countyName = offshoreFeature.properties?.name;
            const islandOffsets = OFFSHORE_ISLAND_OFFSETS[countyName] ?? {};
            const [countyX, countyY] = OFFSHORE_COUNTY_OFFSETS[countyName] ?? [
              0, 0,
            ];
            const labelOffset = LABEL_OFFSETS[countyName] ?? [0, 0];

            const city = CITIES.find(
              (cityConfig) => cityConfig.name === countyName,
            );
            const isCurrentCity = city?.key === currentCity;
            const isInteractable =
              (city?.isAvailable ?? false) && !isCurrentCity;
            const isHovered =
              hoveredCountyId === offshoreFeature.properties?.id;

            const fillClass = isCurrentCity
              ? 'fill-orange-400'
              : isInteractable && isHovered
                ? 'fill-orange-200'
                : 'fill-stone-200';

            const textFillClass =
              isCurrentCity || (isInteractable && isHovered)
                ? 'fill-ink-sub'
                : 'fill-ink-muted';

            return (
              <g
                key={offshoreFeature.properties?.id}
                transform={`translate(${countyX}, ${countyY})`}
                className={
                  isInteractable ? 'cursor-pointer' : 'cursor-not-allowed'
                }
                onClick={
                  isInteractable ? () => onCitySelect(city!.key) : undefined
                }
                onMouseEnter={
                  isInteractable
                    ? () => setHoveredCountyId(offshoreFeature.properties?.id)
                    : undefined
                }
                onMouseLeave={
                  isInteractable ? () => setHoveredCountyId(null) : undefined
                }
              >
                {polygons.map((polygon, index) => {
                  const [islandX, islandY] = islandOffsets[index] ?? [0, 0];

                  return (
                    <g
                      key={`${countyName}-${index}`}
                      transform={`translate(${islandX}, ${islandY})`}
                    >
                      <path
                        d={pathGenerator(polygon) ?? ''}
                        stroke="white"
                        strokeWidth={1}
                        className={fillClass}
                      />
                    </g>
                  );
                })}
                <text
                  x={centroid[0] + labelOffset[0]}
                  y={centroid[1] + labelOffset[1]}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-xs ${textFillClass}`}
                >
                  {countyName}
                </text>
              </g>
            );
          },
        )}
      </g>
      <g>
        {mainFeatures.map((county) => {
          const countyName = county.properties?.name;
          const city = CITIES.find(
            (cityConfig) => cityConfig.name === countyName,
          );
          const isCurrentCity = city?.key === currentCity;
          const isInteractable = (city?.isAvailable ?? false) && !isCurrentCity;
          const isHovered = hoveredCountyId === county.properties?.id;

          const fillClass = isCurrentCity
            ? 'fill-orange-400'
            : isInteractable && isHovered
              ? 'fill-orange-200'
              : 'fill-stone-200';

          return (
            <path
              key={county.properties?.id}
              d={mainPathGenerator(county) ?? ''}
              stroke="white"
              strokeWidth={1}
              className={`${fillClass} ${isInteractable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={
                isInteractable ? () => onCitySelect(city!.key) : undefined
              }
              onMouseEnter={
                isInteractable
                  ? () => setHoveredCountyId(county.properties?.id)
                  : undefined
              }
              onMouseLeave={
                isInteractable ? () => setHoveredCountyId(null) : undefined
              }
            />
          );
        })}
        {mainFeatures.map((county) => {
          const countyName = county.properties?.name;
          if (!countyName) return null;
          const city = CITIES.find(
            (cityConfig) => cityConfig.name === countyName,
          );
          const isCurrentCity = city?.key === currentCity;
          const isInteractable = (city?.isAvailable ?? false) && !isCurrentCity;
          const isHovered = hoveredCountyId === county.properties?.id;

          const centroid = mainPathGenerator.centroid(county);
          const labelOffset = LABEL_OFFSETS[countyName] ?? [0, 0];

          const textFillClass =
            isCurrentCity || (isInteractable && isHovered)
              ? 'fill-ink-sub'
              : 'fill-ink-muted';

          return (
            <text
              key={`${county.properties?.id}-label`}
              x={centroid[0] + labelOffset[0]}
              y={centroid[1] + labelOffset[1]}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-xs ${textFillClass} ${isInteractable ? 'cursor-pointer' : 'pointer-events-none'}`}
              onClick={
                isInteractable ? () => onCitySelect(city!.key) : undefined
              }
              onMouseEnter={
                isInteractable
                  ? () => setHoveredCountyId(county.properties?.id)
                  : undefined
              }
              onMouseLeave={
                isInteractable ? () => setHoveredCountyId(null) : undefined
              }
            >
              {countyName}
            </text>
          );
        })}
      </g>
    </svg>
  );
};
