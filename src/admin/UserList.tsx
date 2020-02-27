import Link from "next/link";
import { FC, useEffect, useMemo, useState } from "react";
import { Button, Pagination } from "semantic-ui-react";
import { useAdminPage } from "../store/AdminStore/AdminHooks";
import { useSiteStats } from "../store/GlobalStore/GlobalHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { dateFromNow, prettyDateTime } from "../utils/DateUtils";

const USER_LIMIT = 15;

export const UserList: FC = () => {
  const { colors } = useTheme();
  const [page, setPage] = useState(1);
  const [sortByActivity, setSortByActivity] = useState(false);
  const {
    stats: { numUsers },
  } = useSiteStats();
  const { users, fetchUsers } = useAdminPage();

  const numPages = useMemo(() => Math.ceil(numUsers / USER_LIMIT), [numUsers]);

  useEffect(() => {
    fetchUsers(page, USER_LIMIT, sortByActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortByActivity]);

  return (
    <>
      <div>
        <Button onClick={() => setSortByActivity(false)}>By created at</Button>
        <Button onClick={() => setSortByActivity(true)}>By last active</Button>
        <table id="users">
          <thead>
            <tr>
              <td></td>
              <td>Nickname</td>
              <td>Last active</td>
              <td>Created at</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.steamId}>
                <td className="avatar">
                  <img src={user.avatar} />
                </td>
                <td className="nickname">
                  <Link
                    href={`/users?id=${user.steamId}`}
                    as={`/users/${user.steamId}`}
                    key={user.steamId}
                  >
                    <a>{user.nickname}</a>
                  </Link>
                </td>
                <td className="last-active">{dateFromNow(user.lastActive)}</td>
                <td className="-created-at">
                  {prettyDateTime(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          defaultActivePage={1}
          totalPages={numPages}
          onPageChange={(_, pageProps) => {
            const activePage = pageProps.activePage as number;
            setPage(activePage);
          }}
        />
      </div>
      <style jsx>{`
        #users {
          width: 100%;
          border-collapse: collapse;
        }

        thead td {
          font-weight: normal;
        }

        tr {
          border-bottom: 1px solid ${colors.BORDER};
        }

        td {
          padding: 6px;
          vertical-align: center;
        }

        .avatar {
          width: 40px;
        }

        .avatar img {
          width: 100%;
          border-radius: 50%;
          display: block;
        }

        .nickname {
          width: 75%;
        }

        .nickname a {
          color: ${colors.TEXT};
        }

        .nickname a:hover {
          text-decoration: underline;
        }

        .last-active {
        }

        .created-at {
        }
      `}</style>
    </>
  );
};