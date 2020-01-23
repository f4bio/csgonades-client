import { NextPage } from "next";
import { CsgoMap } from "../src/models/Nade/CsGoMap";
import { MapPage } from "../src/pages/maps/MapPage";
import { fetchNadesByMapActionThunk } from "../src/store/NadeStore/NadeThunks";

interface Props {
  map: CsgoMap;
}

const Map: NextPage<Props> = ({ map }) => {
  return <MapPage key={map} map={map} />;
};

Map.getInitialProps = async context => {
  const map = context.query.name as CsgoMap;
  const { dispatch } = context.store;

  await dispatch(fetchNadesByMapActionThunk(map));

  return { map };
};

export default Map;
