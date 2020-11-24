import Router from "next/router";
import { FC, useState } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { User } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useFinishProfile } from "../store/UsersStore/hooks/useFinishProfile";
import { Dimensions } from "../constants/Constants";
import { useDisplayToast } from "../store/ToastStore/hooks/useDisplayToast";

type Props = { user: User };

export const FinishProfile: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const finishProfile = useFinishProfile();
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState<string | undefined>();
  const { colors } = useTheme();
  const displayToast = useDisplayToast();

  function onSubmit() {
    if (nickname.includes("@")) {
      setError(
        "It looks like you put your e-mail as your nickname. This is not very smart as it will be visible to anyone."
      );
      return;
    }

    setLoading(true);
    finishProfile(user.steamId, {
      nickname,
      email,
      bio,
    });
    displayToast({
      severity: "success",
      message:
        "Your profile is ready! Btw, come join the rest of us on Discord 😎 You can find the link to join on the bottom of the website.",
      title: "All set!",
      durationSeconds: 30,
    });
    Router.push("/");
  }

  return (
    <>
      <PageCentralize>
        <div className="finish-profile">
          <div className="welcome">
            <h1>Hi {user.nickname}, let&apos;s finish your profile!</h1>
            <h2>Then go favorite some nades or add your own 👊</h2>
          </div>
        </div>
        {!!error && (
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}
        <div className="profile-form">
          <span className="label">
            Nickname <span className="require">*</span>
          </span>
          <input
            value={nickname}
            placeholder="Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          <span className="label">E-mail</span>
          <input
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="label">Bio</span>
          <textarea
            value={bio}
            placeholder="Write something funny... Or keep it blank if your mysterious."
            onChange={(e) => setBio(e.target.value)}
            rows={10}
          />
          <button disabled={loading} className="save-btn" onClick={onSubmit}>
            SAVE
          </button>
        </div>
      </PageCentralize>
      <style jsx>{`
        .finish-profile {
          background: linear-gradient(
            252.84deg,
            ${colors.jumboGradientEnd} 33.44%,
            ${colors.jumboGradientStart} 66.89%
          );
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          border-radius: 5px;
        }

        .welcome {
          color: ${colors.TEXT};
          padding: 20px 30px;
        }

        .welcome h1 {
          font-size: 32px;
          margin: 0;
          padding: 0;
        }

        .welcome h2 {
          font-size: 28px;
          margin: 0;
          padding: 0;
        }

        .error {
          background: #800d0d;
          color: white;
          max-width: 400px;
          margin: 30px auto;
          padding: 20px;
          border-radius: 5px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          padding: 20px 30px;
          background: ${colors.DP01};
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        .label {
          margin-bottom: 5px;
          margin-top: 30px;
          font-size: 18px;
          color: ${colors.TEXT};
        }

        .require {
          color: maroon;
        }

        input,
        textarea {
          margin-bottom: 20px;
          border: 1px solid ${colors.BORDER};
          padding: 15px;
          font-size: 16px;
          font-weight: 300;
          outline: none;
          border-radius: 5px;
          background: transparent;
          color: ${colors.TEXT};
        }

        .save-btn {
          border: none;
          outline: none;
          cursor: pointer;
          padding: 15px 20px;
          background: ${colors.PRIMARY};
          color: white;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
