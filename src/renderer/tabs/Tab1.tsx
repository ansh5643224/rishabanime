import { useContext } from 'react';

import { getTitle } from '../../modules/utils';
import { ListAnimeData, UserInfo } from '../../types/anilistAPITypes';
import { AuthContext } from '../App';
import AnimeSection from '../components/AnimeSection';
import Slideshow from '../components/Slideshow';
import Store from 'electron-store'
import Heading from '../components/Heading';

const STORE = new Store()

interface Tab1Props {
  userInfo?: UserInfo
  currentListAnime?: ListAnimeData[];
  trendingAnime?: ListAnimeData[];
  mostPopularAnime?: ListAnimeData[];
  nextReleasesAnime?: ListAnimeData[];
  recommendedAnime?: ListAnimeData[];
}

const Tab1: React.FC<Tab1Props> = ({
  userInfo,
  currentListAnime,
  trendingAnime,
  mostPopularAnime,
  nextReleasesAnime,
  recommendedAnime,
}) => {
  // const [fetchedRecommended, setFetchedRecommended] = useState<boolean>(false);
  const hasHistory = useContext(AuthContext);
  const recommendedFrom = hasHistory &&
                          recommendedAnime &&
                          recommendedAnime.length > 0 &&
                          recommendedAnime[recommendedAnime.length - 1] || undefined;
  let recommendedTitle = recommendedFrom &&
                           getTitle(recommendedFrom.media);

  return (
    <div className="body-container  show-tab">
      <div className="main-container lifted">
        <main>
          {STORE.get('light_mode') as boolean && <Heading text="Discover" />}

          <Slideshow listAnimeData={trendingAnime} />

          <div className="section-container">
            {hasHistory && (
              <AnimeSection
                title="Continue Watching"
                animeData={currentListAnime}
              />
            )}
            <AnimeSection title="Trending Now" animeData={trendingAnime} />
            {hasHistory && recommendedFrom && (
              <AnimeSection
                title={`Because you watched ${
                  (recommendedTitle &&
                  recommendedTitle.length > 58) ?
                  recommendedTitle.substring(0, 58) + '...' :
                  recommendedTitle
                }`}
                animeData={recommendedAnime?.slice(0, -1)}
              />
            )}
            <AnimeSection title="Most Popular" animeData={mostPopularAnime} />
            {/* <AnimeSection title="Next Releases" animeData={nextReleasesAnime} /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tab1;
