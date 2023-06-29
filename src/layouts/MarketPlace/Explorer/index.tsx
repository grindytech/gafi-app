import ExplorerBanner from './components/ExplorerBanner';
import HotCollection from './components/HotCollection';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';
import TrendingSection from './components/TrendingSection';
import TopPool from './components/TopPool';
export default function Explorer() {
  return (
    <>
      <ExplorerBanner />
      <HotCollection />
      <TrendingSection />
      <TopPool />
    </>
  );
}
