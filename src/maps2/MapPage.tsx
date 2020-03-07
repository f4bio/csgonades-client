import { FC, useState } from "react";
import { Layout2 } from "../common/layout/Layout2";
import { NadeListGrid } from "../common/NadeListGrid";
import { PageCentralize } from "../common/PageCentralize";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNadesForMap } from "../store/NadeStore/NadeHooks";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
import { MapView } from "./mapview/MapView";
import { NadeFilter } from "./nadefilter/NadeFilter";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const [mapViewVisible, setMapViewVisisble] = useState(false);
  const { nades } = useNadesForMap(map);
  const loading = useIsLoadingNade();

  return (
    <>
      <Layout2 title={capitalize(map)} canonical={`/maps/${map}`}>
        <div className="map-welcome">
          <PageCentralize>
            <h1>
              Find the best smokes, flashbangs, molotovs and grenades for{" "}
              {capitalize(map)}.
              <br />
              Something missing? Sign in, and add a nade to help everyone out.
            </h1>
          </PageCentralize>
        </div>
        <div className="map-page">
          <div className="filter">
            <NadeFilter showMapView={() => setMapViewVisisble(true)} />
          </div>
          <div className="nade-list">
            <NadeListGrid
              loading={loading}
              nades={nades}
              emptyMessage={`No nades found. Sign in and add something! :)`}
            />
          </div>
          <div className="map-page-aside"></div>
        </div>
        <MapView
          closeMapView={() => setMapViewVisisble(false)}
          visible={mapViewVisible}
          map={map}
        />
      </Layout2>
      <style jsx>{`
        .map-welcome {
          background: linear-gradient(
            236.51deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          padding-top: 50px;
          padding-bottom: 50px;
          margin-bottom: 50px;
        }

        .map-welcome h1 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
        }

        .map-page {
          max-width: 1580px;
          display: flex;
          margin: 0 auto;
          padding-bottom: 100px;
          min-height: 80vh;
        }

        .filter {
          width: 160px;
          margin-right: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .map-page-aside {
          width: 160px;
          margin-left: 30px;
        }

        .nade-list {
          flex: 1;
          position: relative;
          max-width: 1200px;
        }
      `}</style>
    </>
  );
};