import Router from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthApi } from "../../api/TokenApi";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";
import { dateMinutesAgo } from "../../utils/DateUtils";
import { setToken, setUserAction, signOutUser } from "./AuthActions";
import { userSelector } from "./AuthSelectors";
import { getUserFavorites } from "../../api/FavoriteApi";
import { addAllFavoritesAction } from "../FavoriteStore/FavoriteActions";

export const useSignedInUser = () => {
  const user = useSelector(userSelector);
  return user;
};

export const useIsSignedIn = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }
  return true;
};

export const useIsAllowedUserEdit = (user: User): boolean => {
  const signedInUser = useSelector(userSelector);
  if (!signedInUser) {
    return false;
  }

  if (
    signedInUser.role === "administrator" ||
    signedInUser.role === "moderator"
  ) {
    return true;
  }

  if (signedInUser.steamId === user.steamId) {
    return true;
  }

  return false;
};

export const useIsAdminOrModerator = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator" || user.role === "moderator") {
    return true;
  }

  return false;
};

export const useIsAdmin = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator") {
    return true;
  }

  return false;
};

export const useSignOut = () => {
  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    AuthApi.signOut().then(() => {
      dispatch(signOutUser());
    });
  }, [dispatch]);
  return signOut;
};

export const usePreloadUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { userDetails, userToken } = await trySignInFunc();

      if (!userDetails || !userToken) {
        return;
      }

      setUserAction(dispatch, userDetails);
      dispatch(setToken(userToken));

      const result = await getUserFavorites(userToken);

      if (result.isOk()) {
        dispatch(addAllFavoritesAction(result.value));
      }
    })();
  }, [dispatch]);
};

async function trySignInFunc() {
  const tokenResult = await AuthApi.refreshToken();

  if (tokenResult.isErr()) {
    return {
      userToken: null,
      userDetails: null,
    };
  }

  const userToken = tokenResult.value;

  const userResult = await UserApi.fetchSelf(userToken);

  if (userResult.isErr()) {
    return {
      userToken: null,
      userDetails: null,
    };
  }

  const user = userResult.value;

  return {
    userToken,
    userDetails: user,
  };
}

export const useOnSignIn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { userDetails, userToken } = await trySignInFunc();
      if (!userDetails || !userToken) {
        Router.push("/", "/");
      }

      dispatch(setToken(userToken));
      setUserAction(dispatch, userDetails);

      const isFirstSignIn = checkIsFirstSignIn(userDetails);

      if (isFirstSignIn || userDetails.steamId === "76561198199195838") {
        Router.push(`/finishprofile`, "/finishprofile");
      } else {
        Router.push("/", "/");
      }
    })();
  }, [dispatch]);
};

function checkIsFirstSignIn(user: User): boolean {
  const minsAgo = dateMinutesAgo(user.createdAt);

  return minsAgo < 2;
}
