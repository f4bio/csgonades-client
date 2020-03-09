import { NextPage } from "next";
import { MapPage } from "../../maps2/MapPage";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { resetNadeFilterAction } from "../../store/NadeFilterStore/NadeFilterActions";
import { fetchNadesByMapActionThunk } from "../../store/NadeStore/NadeThunks";

interface Props {
  map: CsgoMap;
}

const Map: NextPage<Props> = ({ map }) => <MapPage key={map} map={map} />;

Map.getInitialProps = async context => {
  const map = context.query.map as CsgoMap;
  const { dispatch } = context.store;

  //@ts-ignore
  await dispatch(fetchNadesByMapActionThunk(map));
  dispatch(resetNadeFilterAction(true));

  return { map };
};

export default Map;
