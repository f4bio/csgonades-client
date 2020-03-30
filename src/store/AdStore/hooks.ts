import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AdActions } from "./actions";
import { useCallback, useEffect } from "react";
import Router from "next/router";
import { adSlotsSelector } from "./selectors";

const useAdStoreDispatch = () => {
  return useDispatch<Dispatch<AdActions>>();
};

export const useRegisterPlaceholder = () => {
  const dispatch = useAdStoreDispatch();

  const registerPlaceholder = useCallback(
    (slot: number) => {
      dispatch({
        type: "Ads/RegisterPlaceholder",
        slot,
      });
    },
    [dispatch]
  );

  return registerPlaceholder;
};

export const useAdSlotsHandler = () => {
  const adSlots = useSelector(adSlotsSelector);
  const dispatch = useAdStoreDispatch();

  useEffect(() => {
    function clearPlaceholders() {
      dispatch({
        type: "Ads/BeforeNavigationChange",
      });
    }

    Router.events.on("routeChangeStart", clearPlaceholders);

    return () => Router.events.off("routeChangeStart", clearPlaceholders);
  }, [dispatch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!adSlots.length) {
        return;
      }
      onNewSlots(adSlots);
    }, 1000);
    return () => clearTimeout(delay);
  }, [adSlots]);
};

function onNewSlots(slots: number[]) {
  try {
    ezstandalone.define(...slots);

    if (!ezstandalone.enabled) {
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable, display", slots)
    } else {
      ezstandalone.refresh();
      console.log("> refresh", slots)
    }
  } catch (error) {}
}
