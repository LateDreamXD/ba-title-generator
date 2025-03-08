import halo from '../assets/image/halo.svg';
import cross from '../assets/image/cross.svg';

const loadImg = (svgData: string): string[] => {
  const svgText = decodeURIComponent(svgData.split('svg+xml,')[1]);
  const dp = new DOMParser();
  const doc = dp.parseFromString(svgText, 'image/svg+xml');
  const pathItems = doc.getElementsByTagName('path');
  return Array.from(pathItems).map((item) => item.getAttribute('d')!);
};
export default {
  halo: loadImg(halo),
  cross: loadImg(cross),
}
