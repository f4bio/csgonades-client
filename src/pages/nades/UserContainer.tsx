import { FC } from "react";
import Link from "next/link";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { Nade } from "../../models/Nade/Nade";
import { dateFromNow } from "../../utils/DateUtils";

type Props = {
  nade: Nade;
};

export const UserContainer: FC<Props> = ({ nade }) => {
  const { uiDimensions, colors } = useTheme();
  const { avatar, nickname } = nade.user;
  return (
    <>
      <div className="user-container">
        <span className="user-label">Created by</span>
        <Link
          href={`/users?id=${nade.user.steamId}`}
          as={`/users/${nade.user.steamId}`}
        >
          <a className="user-link">
            <img
              className="user-avatar"
              src={
                avatar
                  ? avatar
                  : "https://www.prndl.co/assets/user-placeholder-54d9b5720151ac85adf20a7dbef2a11821b1c35b64d40f32e928974c2c2abd6b.png"
              }
              alt={`avatar for ${nickname}`}
            />
            <span className="user-nickname">{nickname}</span>
            <span>, {dateFromNow(nade.createdAt)}.</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .user-container {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 0.8em;
          background: white;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-left: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          padding: ${uiDimensions.PADDING_LARGE}px;
          padding-top: 0;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }

        .user-label {
          margin-right: 6px;
        }

        .user-link {
          display: flex;
          align-items: center;
          color: #444;
        }

        .user-link:hover .user-nickname {
          text-decoration: underline;
        }

        .user-avatar {
          width: 25px;
          margin-right: 6px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
