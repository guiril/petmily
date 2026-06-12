'use client';

import { useState, useEffect } from 'react';
import type { ExtendedFeatureCollection } from 'd3-geo';
import { geoMercator, geoPath } from 'd3-geo';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { CITIES } from '@/lib/cities';

const WIDTH = 400;
const HEIGHT = 600;

interface TaiwanMapProps {
  currentCity: string;
  onCitySelect: (cityKey: string) => void;
}

export const TaiwanMap = ({ currentCity, onCitySelect }: TaiwanMapProps) => {
  const [counties, setCounties] = useState<ExtendedFeatureCollection | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const topoData: Topology = await (
        await fetch('/geo/taiwan-country.topo.json')
      ).json();

      const geoData = feature(
        topoData,
        topoData.objects.map,
      ) as ExtendedFeatureCollection;

      setCounties(geoData);
    })();
  }, []);

  if (!counties) return <svg />;

  const projection = geoMercator().fitSize([WIDTH, HEIGHT], counties);
  const pathGenerator = geoPath().projection(projection);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
      {counties.features.map((countyFeature) => {
        const city = CITIES.find(
          (cityConfig) => cityConfig.name === countyFeature.properties?.name,
        );
        const isCurrentCity = city?.key === currentCity;
        const isAvailable = city?.isAvailable ?? false;

        const isInteractable = isAvailable && !isCurrentCity;

        const fillClass = isCurrentCity
          ? 'fill-orange-400'
          : isAvailable
            ? 'fill-gray-200 hover:fill-orange-200'
            : 'fill-gray-200';

        return (
          <path
            key={String(countyFeature.properties?.id)}
            d={pathGenerator(countyFeature) ?? ''}
            className={`${fillClass}${isInteractable ? ' cursor-pointer' : ''}`}
            stroke="white"
            strokeWidth={1}
            onClick={isInteractable ? () => onCitySelect(city!.key) : undefined}
          />
        );
      })}
    </svg>
  );
};
