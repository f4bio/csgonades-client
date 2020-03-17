import { useEffect } from "react";
import { useRouter } from "next/router";
import { ezoicInit } from "../common/ezoicLoader/EzoinInit";

const isBrowser = typeof window !== "undefined";

export const useAdRefresher = () => {
  const { route } = useRouter();

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const adIds = [];

    const delayFindAds = setTimeout(() => {
      const elements = document.querySelectorAll(
        'div[id^="ezoic-pub-ad-placeholder"]'
      );
      elements.forEach(el => {
        if (isHidden(el)) {
          return;
        }

        try {
          const id = Number(el.id.split("-").pop());
          adIds.push(id);
        } catch (error) {
          console.error("Failed to parse ad id");
        }
      });
      console.log("> Found ads, initing ez", adIds);
      ezstandalone.init();
    }, 1000);

    const delay = setTimeout(() => {
      ezoicInit(adIds);
    }, 2000);
    return () => {
      clearTimeout(delayFindAds);
      clearTimeout(delay);
    };
  }, [route]);
};

function isHidden(el: any) {
  return el.offsetParent === null;
}
