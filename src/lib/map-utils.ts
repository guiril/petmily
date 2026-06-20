import type {
  ExtendedFeatureCollection,
  ExtendedFeature,
  GeoProjection,
} from 'd3-geo';
import type { Position, Polygon } from 'geojson';
import type { Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import { geoArea, geoPath } from 'd3-geo';

export const toFeatureCollection = (
  topo: Topology,
): ExtendedFeatureCollection => {
  return feature(topo, topo.objects.map) as ExtendedFeatureCollection;
};

const polygonArea = (coordinates: Position[][]): number =>
  geoArea({ type: 'Polygon', coordinates });

export const splitToPolygons = (
  countyFeature: ExtendedFeature,
): ExtendedFeature[] => {
  const geometry = countyFeature.geometry;

  if (!geometry || geometry.type !== 'MultiPolygon') return [countyFeature];

  return geometry.coordinates.map((polygonCoords, polygonIndex) => ({
    ...countyFeature,
    geometry: { type: 'Polygon', coordinates: polygonCoords } as Polygon,
    properties: { ...countyFeature.properties, polygonIndex },
  }));
};

export const scaleProjectionAroundCentroid = (
  projection: GeoProjection,
  countyFeature: ExtendedFeature,
  scaleFactor: number,
): void => {
  if (scaleFactor === 1) return;

  const [centroidX, centroidY] = geoPath()
    .projection(projection)
    .centroid(countyFeature);
  const [translateX, translateY] = projection.translate();

  projection.scale(projection.scale() * scaleFactor);
  projection.translate([
    centroidX * (1 - scaleFactor) + scaleFactor * translateX,
    centroidY * (1 - scaleFactor) + scaleFactor * translateY,
  ]);
};

export const keepLargestPolygon = (
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
