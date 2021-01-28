import { GetServerSideProps, NextPage } from "next";
import { UserApi } from "../../users/data/UserApi";
import { User } from "../../users/models/User";
import { UserPage } from "../../users/UsersPage";
import { SEO } from "../../shared-components/SEO";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { Navigation } from "../../navigation/Navigation";

type Props = {
  user: User | null;
};

const UserPageComponent: NextPage<Props> = ({ user }) => {
  if (!user) {
    return <div>404! User not found</div>;
  }

  return (
    <>
      <SEO title={user.nickname} canonical={`/user/${user.steamId}`} />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<UserPage user={user} key={user.steamId} />}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const steamId = context.query.user as string;

  const result = await UserApi.fetchUser(steamId);

  if (result.isErr()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: result.value,
    },
  };
};

export default UserPageComponent;
