import getConfig from "next/config";
import axios from "axios";
import { ok } from "neverthrow";
import { Favorite } from "../../models/Favorite";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

const { config } = getConfig();

export const getUserFavorites = async (
  token: string
): AppResult<Favorite[]> => {
  try {
    const res = await axios.get<Favorite[]>(`${config.apiUrl}/favorites`, {
      headers: { Authorization: token },
    });
    const favoritedNades = res.data;
    return ok(favoritedNades);
  } catch (error) {
    return extractApiError(error);
  }
};

export class FavoriteApi {
  static async getUserFavorites(token: string): AppResult<Favorite[]> {
    try {
      const res = await axios.get<Favorite[]>(`${config.apiUrl}/favorites`, {
        headers: { Authorization: token },
      });
      const favoritedNades = res.data;
      return ok(favoritedNades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async favorite(nadeId: string, token: string): AppResult<Favorite> {
    try {
      const res = await axios.post(
        `${config.apiUrl}/favorites/${nadeId}`,
        undefined,
        {
          headers: { Authorization: token },
        }
      );
      const favorite = res.data as Favorite;
      return ok(favorite);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async unFavorite(
    favoriteId: string,
    token: string
  ): AppResult<boolean> {
    try {
      await axios.delete(`${config.apiUrl}/favorites/${favoriteId}`, {
        headers: { Authorization: token },
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
