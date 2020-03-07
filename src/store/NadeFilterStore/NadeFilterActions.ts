import { MapCoordinates } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { Meta } from "../Analytics/AnalyticsMiddleware";

export type ToogleMapPositionModal = {
  type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL";
  visisble: boolean;
  meta: Meta;
};

export type FilterByMapCoordinates = {
  type: "@@nadefilter/FILTER_BY_MAP_COORDINATES";
  coords: MapCoordinates;
  meta: Meta;
};

export type FilterByNadeType = {
  type: "@@nadefilter/FILTER_BY_TYPE";
  nadeType: NadeType;
  meta: Meta;
};

export type ToggleFilterByFavorites = {
  type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES";
  meta: Meta;
};

export type ResetNadeFilter = {
  type: "@@nadefilter/RESET_NADE_FILTER";
  meta?: Meta;
};

type SwitchTickrateFilter = {
  type: "@@nadefilter/SWITCH_TICKRATE";
};

type ClickTickrate64 = {
  type: "@@nadefilter/CLICK_TICKRATE_64";
};

type ClickTickrate128 = {
  type: "@@nadefilter/CLICK_TICKRATE_128";
};

export type NadeFilterActions =
  | ToogleMapPositionModal
  | FilterByMapCoordinates
  | FilterByNadeType
  | ToggleFilterByFavorites
  | ResetNadeFilter
  | SwitchTickrateFilter
  | ClickTickrate64
  | ClickTickrate128;

export const filterByTypeAction = (nadeType: NadeType): FilterByNadeType => ({
  type: "@@nadefilter/FILTER_BY_TYPE",
  nadeType,
  meta: {
    gaEvent: {
      label: nadeType,
    },
  },
});

export const toggleFilterByFavoritesAction = (): ToggleFilterByFavorites => ({
  type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES",
  meta: { gaEvent: {} },
});

export const resetNadeFilterAction = (
  ignoreAnalytics = false
): ResetNadeFilter => ({
  type: "@@nadefilter/RESET_NADE_FILTER",
  meta: ignoreAnalytics ? undefined : { gaEvent: {} },
});

export const filterByMapCoordsAction = (
  coords: MapCoordinates
): FilterByMapCoordinates => ({
  type: "@@nadefilter/FILTER_BY_MAP_COORDINATES",
  coords,
  meta: {
    gaEvent: {
      label: `(${coords.x}, ${coords.y})`,
    },
  },
});

export const toggleMapPositionModalAction = (
  visisble: boolean
): ToogleMapPositionModal => ({
  type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL",
  visisble,
  meta: {
    gaEvent: {
      label: `${visisble}`,
    },
  },
});

export const switchTickrateAction = (): SwitchTickrateFilter => ({
  type: "@@nadefilter/SWITCH_TICKRATE",
});

export const selectTickrate64 = (): ClickTickrate64 => ({
  type: "@@nadefilter/CLICK_TICKRATE_64",
});

export const selectTickrate128 = (): ClickTickrate128 => ({
  type: "@@nadefilter/CLICK_TICKRATE_128",
});
