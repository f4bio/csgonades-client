import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export function AdminWelcome(): JSX.Element {
  const { colors } = useTheme();

  return (
    <>
      <div className="welcome">
        <h1>Welcome to the Moderation dashboard!</h1>
        <p>
          You can find pending nades here and reports that have been submitted
          on nades.
          <br /> Feel free to check out the reports and if they are valid you
          can change that nades status to deleted / declined.
        </p>
      </div>
      <style jsx>{`
        .welcome {
          background: ${colors.DP02};
          padding: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
        }

        h1 {
          font-size: 24px;
        }
      `}</style>
    </>
  );
}
