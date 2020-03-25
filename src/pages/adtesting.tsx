import { FC, useState, useEffect } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";

type Props = {};

const AdTesting: FC<Props> = ({}) => {
  const [placeholders, setPlaceholder] = useState([]);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const debugInterval = setInterval(() => {
      // @ts-ignore
      setPlaceholder(ezstandalone.placeholders);
      // @ts-ignore
      setSelectedPlaceholder(ezstandalone.selectedPlaceholders);
    }, 1000);
    return () => clearInterval(debugInterval);
  }, []);

  function onRefresh() {
    ezstandalone.refresh();
  }

  function onEnable() {
    ezstandalone.enable();
  }

  function onDefineAll() {
    ezstandalone.define(157, 158, 159, 160);
  }

  function onDefinePage1() {
    ezstandalone.define(157, 158);
  }

  function onDefinePage2() {
    ezstandalone.define(159, 160);
  }

  function onDisplay() {
    ezstandalone.display();
  }

  function onDestroy() {
    ezstandalone.destroy();
  }

  return (
    <>
      <div className="ad-testing">
        <div className="navigation">
          <h3>Navigate between the two virtual pages</h3>
          <button onClick={() => setPage(1)}>Navigate Page 1</button>
          <button onClick={() => setPage(2)}>Navigate Page 2</button>
        </div>

        <div className="page">
          <div className="buttons">
            <h3>Standalone commands</h3>

            <span>Define ads, PAGE1+PAGE2</span>
            <button onClick={onDefineAll}>
              ezstandalone.define(157, 158, 159, 160)
            </button>

            <span>Define ads, PAGE1</span>
            <button onClick={onDefinePage1}>
              ezstandalone.define(157, 158)
            </button>

            <span>Define ads, PAGE2</span>
            <button onClick={onDefinePage2}>
              ezstandalone.define(159, 160)
            </button>

            <button onClick={onEnable}>ezstandalone.enable()</button>
            <button onClick={onDisplay}>ezstandalone.display()</button>
            <button onClick={onRefresh}>ezstandalone.refresh()</button>
            <button onClick={onDestroy}>ezstandalone.destroy()</button>
          </div>

          {page === 1 && (
            <div className="ads">
              <h4>PAGE 1</h4>

              <div className="ad-units">
                <div className="placeholder-wrap">
                  Placeholder[157]
                  <div className="ez">
                    <EzoicPlaceHolder id={157} />
                  </div>
                </div>
                <div className="placeholder-wrap">
                  Placeholder[158]
                  <div className="ez">
                    <EzoicPlaceHolder id={158} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === 2 && (
            <div className="ads">
              <h4>PAGE 2</h4>

              <div className="ad-units">
                <div className="placeholder-wrap">
                  Placeholder[159]
                  <div className="ez">
                    <EzoicPlaceHolder id={159} />
                  </div>
                </div>
                <div className="placeholder-wrap">
                  Placeholder[160]
                  <div className="ez">
                    <EzoicPlaceHolder id={160} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="debug">
            <h2>Debug</h2>
            <span>ezstandalone.placeholders:</span>
            <br />
            {JSON.stringify(placeholders)}
            <br />
            <br />
            <span>ezstandalone.selectedplaceholder:</span>
            <br />
            {JSON.stringify(selectedPlaceholder)}
          </div>
        </div>
      </div>
      <style jsx>{`
        button {
          background: #000;
          color: white;
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .debug {
          background: #000;
          color: white;
          margin-top: 30px;
          padding: 20px;
          color: yellow;
        }

        .placeholder-wrap {
          text-align: center;
        }

        .navigation {
          border: 1px solid #bbb;
          padding: 20px;
          margin-bottom: 30px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          margin-right: 30px;
        }

        .ad-units {
          display: flex;
          margin-top: 20px;
        }

        .buttons button {
          margin-bottom: 20px;
        }

        .page {
          border: 1px solid #bbb;
          padding: 20px;
          display: flex;
        }

        .ad-testing {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 50px;
        }

        .ez {
          background: #ccc;
          width: 336px;
          height: 280px;
          margin: 10px;
        }
      `}</style>
    </>
  );
};

export default AdTesting;