import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { EditButton } from "../../common/EditButton";
import { AnimationTimings } from "../../constants/Constants";
import { Nade } from "../../models/Nade/Nade";
import { useUpdateNade } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NadeMapValue } from "./NadeMapValue";
import { NadeMovementValue } from "./NadeMovementValue";
import { NadeTechniqueValue } from "./NadeTechniqueValue";
import { NadeTickrateValue } from "./NadeTickrateValue";
import { NadeTypeValue } from "./NadeTypeValue";
import { NadeViewsValue } from "./NadeViewsValue";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeMetaPanel: FC<Props> = ({ nade, allowEdit }) => {
  const { colors } = useTheme();
  const updateNade = useUpdateNade();
  const [isEditing, setIsEditing] = useState(false);
  const [map, setMap] = useState(nade.map);
  const [movement, setMovement] = useState(nade.movement);
  const [tickrate, setTickrate] = useState(nade.tickrate);
  const [technique, setTechnique] = useState(nade.technique);
  const [type, setType] = useState(nade.type);

  function updateNadeMeta() {
    updateNade(nade.id, {
      map,
      movement,
      tickrate,
      technique,
      type,
    });
    setIsEditing(false);
  }

  function cancelUpdate() {
    setIsEditing(false);
  }

  return (
    <>
      <div className="nade-meta-container">
        <div className="nade-meta-panel">
          <div className="nade-meta-item">
            <span className="map-meta-title">Type</span>
            <NadeTypeValue
              nadeType={type}
              isEditing={isEditing}
              onNadeTypeChange={setType}
            />
          </div>

          <div className="nade-meta-item">
            <span className="map-meta-title">Map</span>
            <NadeMapValue
              map={map}
              isEditing={isEditing}
              onMapChange={setMap}
            />
          </div>

          <div className="nade-meta-item">
            <span className="map-meta-title">Movement</span>
            <NadeMovementValue
              isEditing={isEditing}
              movement={movement}
              onChange={setMovement}
            />
          </div>

          <div className="nade-meta-item">
            <span className="map-meta-title">Technique</span>
            <NadeTechniqueValue
              isEditing={isEditing}
              technique={technique}
              onChange={setTechnique}
            />
          </div>

          {technique === "jumpthrow" && (
            <div className="nade-meta-item">
              <span className="map-meta-title">Tickrate</span>
              <NadeTickrateValue
                isEditing={isEditing}
                tickrate={tickrate || "any"}
                onChange={setTickrate}
              />
            </div>
          )}

          {nade.viewCount > 1 && (
            <div className="nade-meta-item">
              <span className="map-meta-title">Views</span>
              <NadeViewsValue views={nade.viewCount} />
            </div>
          )}

          {nade.favoriteCount > 0 && (
            <div className="nade-meta-item">
              <span className="map-meta-title">Favorited</span>
              <NadeViewsValue views={nade.favoriteCount} /> times
            </div>
          )}
        </div>

        {isEditing && (
          <div className="nade-meta-edit-container">
            <span onClick={cancelUpdate}>
              <Icon circular link color="grey" name="cancel" />
            </span>
            <span onClick={updateNadeMeta}>
              <Icon inverted circular link color="olive" name="check" />
            </span>
          </div>
        )}
        {allowEdit && !isEditing && (
          <div className="edit-btn-container">
            <EditButton
              isEditing={isEditing}
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .nade-meta-container {
          position: relative;
        }

        .nade-meta-container:hover .edit-btn-container {
          opacity: 1;
        }

        .nade-meta-panel {
        }

        .nade-meta-item {
          background: ${colors.DP01};
          padding: 12px 18px;
          border: 1px solid ${colors.BORDER};
          border-bottom: 0;
          color: ${colors.TEXT};
        }

        .nade-meta-item:first-child {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }

        .nade-meta-item:last-child {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .map-meta-title {
          display: inline-block;
          font-weight: 400;
          font-size: 0.9em;
          margin-right: 12px;
          min-width: 75px;
          border-right: 1px dotted ${colors.BORDER};
        }

        .edit-btn-container {
          position: absolute;
          top: 6px;
          right: 6px;
          opacity: 0;
          transition: opacity ${AnimationTimings.fast}s;
        }
      `}</style>
    </>
  );
};