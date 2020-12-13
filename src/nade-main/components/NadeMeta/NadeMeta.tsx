import { FC, memo } from "react";
import { tickrateString, Tickrate } from "../../../nade-data/Nade/NadeTickrate";
import { nadeTypeString, NadeType } from "../../../nade-data/Nade/NadeType";
import { techniqueString, Technique } from "../../../nade-data/Nade/Technique";
import { capitalize } from "../../../utils/Common";
import { Movement } from "../../../nade-data/Nade/NadeMovement";

type Props = {
  movement?: Movement;
  rounded?: boolean;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
};

export const NadeMeta: FC<Props> = memo(
  ({ movement, type, technique, tickrate }) => {
    return (
      <>
        <div className="nade-meta">
          <div className="nade-meta-item">
            <h4>Type</h4>
            <span>{type ? nadeTypeString(type) : "Not set."}</span>
          </div>

          <div className="nade-meta-item">
            <h4>Movement</h4>
            <span>{movement ? capitalize(movement) : "Not set."}</span>
          </div>

          <div className="nade-meta-item">
            <h4>Technique</h4>
            <span>{technique ? techniqueString(technique) : "Not set."}</span>
          </div>

          {tickrate && (
            <div className="nade-meta-item">
              <h4>Tickrate</h4>
              <span>{tickrateString(tickrate)}</span>
            </div>
          )}
        </div>
        <style jsx>{`
          .nade-meta {
            display: flex;
            color: white;
            overflow-x: auto;
          }

          .nade-meta-item {
            text-align: center;
            flex: 1;
            white-space: nowrap;
            padding: 10px 16px;
            background: #729b79;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
          }

          .nade-meta-item:last-child {
            border-right: none;
          }

          h4 {
            margin: 0;
            padding: 0;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 5px;
          }

          span {
            font-size: 16px;
          }
        `}</style>
      </>
    );
  }
);
