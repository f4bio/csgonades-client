import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useFilterByTickrate } from "../../store2/FilterStore/hooks";
import { FilterBg } from "./FilterBg";

type Props = {};

export const TickrateSelector: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const {
    byTickrate,
    filterByTickrate128,
    filterByTickrate64,
  } = useFilterByTickrate();

  const tick64active = byTickrate === "tick64" ? "active" : "";
  const tick128active = byTickrate === "tick128" ? "active" : "";

  return (
    <>
      <div className="filter-tick">
        <div className="filter-tick-label">TICK</div>
        <FilterBg>
          <Popup
            content={"Only 64 tick"}
            hoverable
            position="right center"
            inverted
            size="tiny"
            mouseEnterDelay={300}
            openOnTriggerClick={false}
            trigger={
              <button
                className={`filter-btn tickrate-btn ${tick64active}`}
                onClick={filterByTickrate64}
              >
                64
              </button>
            }
          />

          <Popup
            content={"Only 128 tick"}
            hoverable
            position="right center"
            inverted
            size="tiny"
            mouseEnterDelay={300}
            openOnTriggerClick={false}
            trigger={
              <button
                className={`filter-btn tickrate-btn ${tick128active}`}
                onClick={filterByTickrate128}
              >
                128
              </button>
            }
          />
        </FilterBg>
      </div>
      <style jsx>{`
        .filter-tick {
          margin-bottom: 30px;
        }

        .filter-tick .filter-tick-label {
          text-align: center;
          color: #dcdcdc;
          width: 100%;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .filter-btn {
          border: none;
          outline: none;
          background: transparent;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${colors.filterColor};
          font-size: 20px;
          cursor: pointer;
          border-bottom: 1px solid ${colors.filterBorder};
        }

        .filter-btn:last-child {
          border: none;
        }

        .tickrate-btn {
          font-size: 16px;
          font-weight: 300;
        }

        .active {
          background: #f8ffed;
        }
      `}</style>
    </>
  );
};
