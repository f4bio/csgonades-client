import { FC, memo } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { NadeLight } from "../models/Nade/Nade";
import { useFilteredNades } from "../store/MapStore/hooks/useFilteredNades";

type Props = {
  ssrNades: NadeLight[];
};

export const MapPageNades: FC<Props> = memo(({ ssrNades }) => {
  const nades = useFilteredNades();

  const renderNades = nades.length ? nades : ssrNades;

  return (
    <>
      <NadeListGrid nades={renderNades} emptyMessage={`No nades found.`} />
      <style jsx>{``}</style>
    </>
  );
});
