import Map from './Map';
import Markers from './Markers';
import useMap from '../../hooks/useMap';
import useCurrentStore from '../../hooks/useCurrentStore';
import type { NaverMap } from '../../types/map';

const MapSection = () => {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    // 마커 밖을 눌렀을 때 클릭 된 마커가 clear되게 됨
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};
export default MapSection;
