import { FC, memo } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigation } from "../../store/GlobalStore/hooks/useNavigation";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const Hamburger: FC = memo(({}) => {
  const { colors } = useTheme();
  const { toggleNav, isNavOpen } = useNavigation();

  return (
    <>
      <div className="hamburger" onClick={toggleNav}>
        {isNavOpen && (
          <FaTimes
            size={30}
            style={{ position: "relative", left: -8, top: 0 }}
          />
        )}
        {!isNavOpen && (
          <FaBars
            size={24}
            style={{ position: "relative", left: -5, top: 2 }}
          />
        )}
      </div>
      <style jsx>{`
        .hamburger {
          margin-right: 3px;
          cursor: pointer;
          display: none;
          color: ${colors.TEXT};
          width: 30px;
          height: 30px;
          opacity: 0.85;
          transition: opacity 0.15s;
        }

        .hamburger:hover {
          opacity: 1;
        }

        @media only screen and (max-width: 1195px) {
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
});
