import { FC } from "react";
import { EzoicHead } from "../common/ezoicLoader/EzoicHead";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../layout/Layout2";
import { NadeLight } from "../models/Nade/Nade";
import { BlogList } from "./BlogList";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";

type Props = {
  recentNades: NadeLight[];
};

export const FrontPage: FC<Props> = ({ recentNades }) => {
  return (
    <Layout2 canonical="">
      <EzoicHead codes={[110]} />
      <FrontPageJumbo />
      {false && <BlogList />}
      <RecentNades recentNades={recentNades} />
      <FrontpageActions />
      <div className="bottom-placeholder">
        <EzoicPlaceHolder id={110} />
      </div>
      <style jsx>{`
        .bottom-placeholder {
          margin-bottom: 100px;
          margin-top: 30px;
        }
      `}</style>
    </Layout2>
  );
};
