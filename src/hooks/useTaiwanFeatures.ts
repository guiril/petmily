import { useState, useEffect } from 'react';
import type { ExtendedFeature } from 'd3-geo';
import type { Topology } from 'topojson-specification';
import { toFeatureCollection, keepLargestPolygon } from '@/lib/map-utils';

const TAIWAN_TOPO_URL = '/geo/taiwan-country.topo.json';
const OFFSHORE_COUNTY_NAMES = ['連江縣', '金門縣', '澎湖縣'];

type Features = ExtendedFeature[] | null;

const fetchTaiwanTopo = async (
  signal: AbortSignal,
): Promise<Topology | undefined> => {
  try {
    return (await fetch(TAIWAN_TOPO_URL, { signal })).json();
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    console.error('Failed to load map.', err);
  }
};

const isOffshoreCounty = (countyFeature: ExtendedFeature): boolean =>
  OFFSHORE_COUNTY_NAMES.includes(countyFeature.properties?.name);

export const useTaiwanFeatures = () => {
  const [mainFeatures, setMainFeatures] = useState<Features>(null);
  const [offshoreFeatures, setOffshoreFeatures] = useState<Features>(null);

  useEffect(() => {
    // Cancel the fetch if the component unmounts before it completes.
    const abortController = new AbortController();

    (async () => {
      const taiwanTopo = await fetchTaiwanTopo(abortController.signal);

      if (!taiwanTopo) return;

      const { features } = toFeatureCollection(taiwanTopo);

      setMainFeatures(
        features
          .filter((countyFeature) => !isOffshoreCounty(countyFeature))
          .map(keepLargestPolygon),
      );

      setOffshoreFeatures(features.filter(isOffshoreCounty));
    })();

    return () => abortController.abort();
  }, []);

  return { mainFeatures, offshoreFeatures };
};
