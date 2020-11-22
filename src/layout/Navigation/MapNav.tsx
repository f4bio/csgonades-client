import { FC } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useRouter } from "next/router";
import { MapPageLink } from "./MapNavLink";
import { Dimensions } from "../../constants/Constants";
import { ThemeToggler } from "../Misc/ThemeToggler";
import { NavItem } from "./NavItem";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";

export const MapNav: FC = () => {
  const { colors } = useTheme();
  const { query } = useRouter();
  const selectedMap = query.map as CsgoMap;

  return (
    <>
      <div id="secondary-nav">
        <PageCentralize>
          <div id="map-nav-wrap">
            <div id="map-nav">
              <ul>
                <li>
                  <MapPageLink map="mirage">
                    <NavItem
                      csMap={"mirage"}
                      selected={selectedMap === "mirage"}
                    />
                  </MapPageLink>
                </li>

                <li>
                  <MapPageLink map="inferno">
                    <NavItem
                      csMap={"inferno"}
                      selected={selectedMap === "inferno"}
                    />
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="dust2">
                    <NavItem
                      csMap={"dust2"}
                      selected={selectedMap === "dust2"}
                    />
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="overpass">
                    <NavItem
                      csMap={"overpass"}
                      selected={selectedMap === "overpass"}
                    />
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="cache">
                    <NavItem
                      csMap={"cache"}
                      selected={selectedMap === "cache"}
                    />
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="train">
                    <NavItem
                      csMap={"train"}
                      selected={selectedMap === "train"}
                    />
                  </MapPageLink>
                </li>

                <li>
                  <MapPageLink map="nuke">
                    <NavItem csMap={"nuke"} selected={selectedMap === "nuke"} />
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="vertigo">
                    <NavItem
                      csMap={"vertigo"}
                      selected={selectedMap === "vertigo"}
                    />
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="anubis">
                    <NavItem
                      csMap={"anubis"}
                      selected={selectedMap === "anubis"}
                    />
                  </MapPageLink>
                </li>
              </ul>
            </div>

            <div id="right-options">
              <div id="theme-toggle">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </PageCentralize>
      </div>
      <style jsx>{`
        #secondary-nav {
          background: ${colors.DP03};
          height: ${Dimensions.NAV_HEIGHT}px;
          border-bottom: 1px solid ${colors.BORDER};
        }

        #map-nav-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: ${Dimensions.NAV_HEIGHT}px;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        ul li {
        }
      `}</style>
    </>
  );
};
