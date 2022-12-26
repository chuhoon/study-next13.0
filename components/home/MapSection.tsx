import Map from './Map';
import Markers from './Markers';
import useMap from '../../hooks/useMap';
import type { NaverMap } from '../../types/map';

const MapSection = () => {
  const { initializeMap } = useMap();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };

  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};
export default MapSection;
