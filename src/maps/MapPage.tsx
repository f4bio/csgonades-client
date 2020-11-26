import React, { FC, memo, Suspense } from "react";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";
import { MapPageNades } from "./MapPageNades";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO";
import { capitalize } from "../utils/Common";
import { LayoutWithSidebar } from "../common/LayoutWithSidebar";
import { MapPageSidebar } from "./MapPageSidebar";
import { Dimensions } from "../constants/Constants";
import FilterBar from "./nadefilter/FilterBar";
import { MapViewSuggested } from "./MapViewSuggested";
import { useOnNadeClusterClick } from "./SuggestedNades/useOnNadeClick";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { FixedBottomClosabeleAd } from "../common/adunits/FixedBottomClosableAd";

const MapViewScreen = React.lazy(() => import("./MapViewScreen"));

const isServer = typeof window === "undefined";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage: FC<Props> = memo(({ map, allNades }) => {
  const { mapView } = useSetMapView();
  useMapChangeHandler(allNades);

  const {
    onNadeClusterClick,
    suggestedNades,
    dismissSuggested,
  } = useOnNadeClusterClick();

  const displayMapOverview: boolean = mapView === "overview" && !isServer;

  return (
    <>
      <SEO
        title={mapPageTitleSeo(map)}
        canonical={`/maps/${map}`}
        description={`Find and learn the best smoke, flashbang, molotov and grenade spots for ${capitalize(
          map
        )}. Browse our large collection of nades for CS:GO.`}
      />

      <LayoutWithSidebar
        key={"map-" + map}
        sidebar={<MapPageSidebar map={map} nades={allNades} />}
      >
        <div id="nade-page">
          <div id="filter">
            <FilterBar />
          </div>
          <div id="nade-nades">
            {mapView === "list" && <MapPageNades allNades={allNades} />}

            <MapViewSuggested
              nades={suggestedNades}
              onDismiss={dismissSuggested}
            />

            {displayMapOverview && (
              <Suspense fallback={<></>}>
                <MapViewScreen
                  map={map}
                  allNades={allNades}
                  onClusterClick={onNadeClusterClick}
                />
              </Suspense>
            )}
          </div>
        </div>
        {false && <FixedBottomClosabeleAd />}
      </LayoutWithSidebar>
      <style jsx>{`
        #nade-page {
          position: relative;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          width: 100%;
          display: grid;
          grid-template-columns: min-content 1fr;
          grid-template-areas: "filter nades";
        }

        #filter {
          grid-area: filter;
          position: sticky;
          top: 16px;
        }

        #nade-nades {
          flex: 1;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          padding: 16px;
          overflow-y: auto;
          grid-area: nades;
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
