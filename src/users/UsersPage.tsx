import { PageCentralize } from "../common/PageCentralize";
import { Layout2 } from "../layout/Layout2";
import { User } from "../models/User";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";

type Props = {
  user: User | null;
};

export const UserPage: React.FC<Props> = ({ user }) => {
  return (
    <Layout2
      title={user ? user.nickname : "User not found"}
      canonical={user?.steamId ? `/users/${user?.steamId}` : undefined}
    >
      <PageCentralize>
        {!user && <UserNotFound />}
        {user && <UserUI user={user} />}
      </PageCentralize>
    </Layout2>
  );
};
