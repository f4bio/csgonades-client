import { FC, useMemo } from "react";
import { Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../utils/Common";

type Props = {
  nade: NadeLight;
};

export const NadeItemTitle: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const iconUrl = iconFromType(nade.type);
  const title = nade.title || "No title...";

  const titleClassName = useMemo(() => {
    const classNames = ["title"];
    switch (nade.status) {
      case "pending":
        classNames.push("pending");
      case "declined":
        classNames.push("declined");
    }
    return classNames.join(" ");
  }, [nade.status]);

  return (
    <>
      <div className={titleClassName}>
        <img
          className="nade-type-icon"
          src={iconUrl}
          alt={`nade icon ${nade.type}`}
        />
        <span className="title-text">{title}</span>
      </div>
      <style jsx>{`
        .title {
          padding: 6px 12px;
          display: block;
          background: ${colors.nadeItemHeadingBg};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nade-type-icon {
          width: 15px;
          margin-right: ${Dimensions.PADDING_SMALL};
        }

        .title.pending {
          background: ${colors.WARNING};
        }

        .title.declined {
          background: ${colors.ERROR};
        }
      `}</style>
    </>
  );
};
