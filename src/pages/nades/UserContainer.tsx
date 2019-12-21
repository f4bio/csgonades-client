import { FC } from "react";
import { User, UserLight } from "../../models/User";
import Link from "next/link";

type Props = {
  user: UserLight;
  marginTop?: number;
};

export const UserContainer: FC<Props> = ({ user, marginTop }) => {
  const { avatar, nickname } = user;
  return (
    <>
      <Link href={`/users/${user.steamId}`}>
        <a>
          <div className="user-container">
            <img
              className="user-avatar"
              src={
                avatar
                  ? avatar
                  : "https://www.prndl.co/assets/user-placeholder-54d9b5720151ac85adf20a7dbef2a11821b1c35b64d40f32e928974c2c2abd6b.png"
              }
            />
            <span>{nickname}</span>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .user-container {
          margin-top: ${marginTop || 0}px;
          display: flex;
          align-items: center;
        }

        .user-avatar {
          width: 30px;
          margin-right: 6px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
