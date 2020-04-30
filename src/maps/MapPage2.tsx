import { FC, useState, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { NadeFilter } from "./nadefilter/NadeFilter";
import { MapPageNades } from "./MapPageNades";
import { MapPageJumbo } from "./MapPageJumbo";
import { MapView } from "./mapview2/MapView";
import { SignInWarning } from "./components/SignInWarning";
import { Dimensions } from "../constants/Constants";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO2";
import { capitalize } from "../utils/Common";
import { TopContributorList } from "./TopContributor";
import { SidebarPanel } from "../common/SidebarPanel";
import { AdUnit } from "../common/adunits/AdUnit";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SortingMethodSelector } from "./SortingMethodSelector";
import { useAnalytics } from "../utils/Analytics";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage2: FC<Props> = memo(({ map, allNades }) => {
  const { colors } = useTheme();
  const { event } = useAnalytics();
  useMapChangeHandler();
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  function showSignInWarning() {
    setShowLoginWarning(true);
    event({
      category: "Sign In Warning",
      action: "Favorite Not Signed In",
    });
  }

  function dismissSignInWarning() {
    setShowLoginWarning(false);
    event({
      category: "Sign In Warning",
      action: "Dismiss",
    });
  }

  return (
    <>
      <div key={"map-" + map} id="map-page">
        <SEO
          title={mapPageTitleSeo(map)}
          canonical={`/maps/${map}`}
          description={`Find the best smokes, flashbangs, molotovs and grenades for ${capitalize(
            map
          )}. Browse our large collection of nades for CS:GO.`}
        />
        <MapPageJumbo map={map} nades={allNades} />
        <SortingMethodSelector />
        <div className="map-nade-list">
          <MapPageNades allNades={allNades} />
        </div>
      </div>

      <aside key={"side" + map}>
        <div id="map-sidebar">
          <NadeFilter showSingInWarning={showSignInWarning} />

          <SidebarPanel last title="TOP CONTRIBUTORS">
            <TopContributorList nades={allNades} />
          </SidebarPanel>
          <div className="ph-unit">
            <AdUnit tagType="300x250" />
          </div>
        </div>
      </aside>

      <MapView map={map} allNades={allNades} />
      <SignInWarning
        visible={showLoginWarning}
        onDismiss={dismissSignInWarning}
        message="filter"
      />
      <style jsx>{`
        .ph-unit {
        }

        #map-page {
          grid-area: main;
          min-height: 100vh;
          margin: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
        }

        aside {
          grid-area: sidebar;
          width: 300px;
          background: ${colors.DP02};
        }

        #map-sidebar {
          position: sticky;
          top: calc(65px);
        }

        .map-page-container {
          max-width: ${Dimensions.PAGE_WIDTH + 2 * Dimensions.GUTTER_SIZE}px;
          margin: 0 auto;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .map-nades {
          display: grid;
          grid-template-columns: 45px 1fr;
          grid-template-rows: auto;
          grid-template-areas: "filter nades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .map-filter {
          grid-area: filter;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }

        .map-filter-sticky {
          position: sticky;
          top: 50px;
        }

        @media only screen and (max-width: 1210px) {
          #map-page {
            margin-right: 30px;
          }

          aside {
            width: 100%;
          }
        }

        @media only screen and (max-width: 910px) {
          #map-page {
            margin: 15px;
          }
        }

        @media only screen and (max-width: 400px) {
          #map-page {
            margin: 0;
            margin-bottom: 50px;
          }
        }
      `}</style>
    </>
  );
});

function mapPageTitleSeo(map: CsgoMap) {
  if (!map) {
    return "Not found";
  }

  return `${capitalize(map)} Smokes, Flashes and Molotovs`;
}
