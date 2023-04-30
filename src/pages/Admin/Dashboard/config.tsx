import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import type { ColumnsType } from "antd/es/table";

import { AuthContext } from "src/contexts/AuthContext";

export const useDashboardColumns = () => {
  const { user } = useContext(AuthContext);
  const columns = useMemo(
    () =>
      [
        {
          key: "name",
          dataIndex: "name",
          title: "Datel",
          width: 150,
        },
        {
          key: "tier_1",
          dataIndex: "tier_1",
          title: "Tier 1",
          hidden: ["commerce"].includes(user.role),
          children: [
            {
              key: "tier_1.open",
              dataIndex: "tier_1.open",
              title: "Open",

              render: (_, record) => {
                let url = "";
                if (["admin", "first_tier"].includes(user.role))
                  url = `/admin/first-tier?status=Open&datel_id=${record.datel_id}`;
                if (user.role === "wh")
                  url = `/admin/warehouse/order?on_tier=Tier 1&status=Open&datel_id=${record.datel_id}`;
                if (user.role === "tl")
                  url = `/admin/form-tl-sektor?on_tier=Tier 1&status=Open&datel_id=${record.datel_id}`;

                //
                if (record?.tier_1?.open) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.tier_1.open}</Link>
                      ) : (
                        record.tier_1.open
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
            {
              key: "tier_1.mitra_done",
              dataIndex: "tier_1.mitra_done",
              title: "Mitra Done",
              render: (_, record) => {
                let url = "";
                if (["admin", "first_tier"].includes(user.role))
                  url = `/admin/first-tier?status=Mitra Done&datel_id=${record.datel_id}`;
                if (user.role === "wh")
                  url = `/admin/warehouse/order?on_tier=Tier 1&status=Mitra Done&datel_id=${record.datel_id}`;
                if (user.role === "tl")
                  url = `/admin/form-tl-sektor?on_tier=Tier 1&status=Mitra Done&datel_id=${record.datel_id}`;

                if (record?.tier_1?.mitra_done) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.tier_1.mitra_done}</Link>
                      ) : (
                        record.tier_1.mitra_done
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
            {
              key: "tier_1.closed",
              dataIndex: "tier_1.closed",
              title: "Closed",
              render: (_, record) => {
                let url = "";
                if (["admin", "first_tier"].includes(user.role))
                  url = `/admin/first-tier?status=Closed&datel_id=${record.datel_id}&show_all=true&on_tier=Tier 1`;
                if (user.role === "wh")
                  url = `/admin/warehouse/order?on_tier=Tier 1&status=Closed&datel_id=${record.datel_id}`;
                if (user.role === "tl")
                  url = `/admin/form-tl-sektor?on_tier=Tier 1&status=Closed&datel_id=${record.datel_id}`;
                if (record?.tier_1?.closed) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.tier_1.closed}</Link>
                      ) : (
                        record.tier_1.closed
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
          ],
        },
        {
          key: "tier_2",
          dataIndex: "tier_2",
          title: "Tier 2",
          hidden: ["commerce"].includes(user.role),
          children: [
            {
              key: "tier_2.open",
              dataIndex: "tier_2.open",
              title: "Open",
              render: (_, record) => {
                let url = "";
                if (user.role === "admin")
                  url = `/admin/mitra?&on_tier=Tier 1&status=Open&datel_id=${record.datel_id}`;
                if (user.role === "wh")
                  url = `/admin/warehouse/order?on_tier=Mitra&status=Open&datel_id=${record.datel_id}`;
                if (user.role === "first_tier")
                  url = `/admin/first-tier?on_tier=Mitra&status=Open&datel_id=${record.datel_id}&show_all=true`;
                if (user.role === "tl")
                  url = `/admin/form-tl-sektor?on_tier=Mitra&status=Open&datel_id=${record.datel_id}`;
                if (record?.tier_2?.open) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.tier_2.open}</Link>
                      ) : (
                        record.tier_2.open
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
            {
              key: "tier_2.return",
              dataIndex: "tier_2.return",
              title: "Return by Tier 1",
              render: (_, record) => {
                let url = "";
                if (user.role === "admin")
                  url = `/admin/mitra?status=Return by Tier 1&datel_id=${record.datel_id}`;
                if (user.role === "wh")
                  url = `/admin/warehouse/order?on_tier=Mitra&status=Return by Tier 1&datel_id=${record.datel_id}`;
                if (user.role === "first_tier")
                  url = `/admin/first-tier?on_tier=Mitra&status=Return by Tier 1&datel_id=${record.datel_id}&show_all=true`;
                if (user.role === "tl")
                  url = `/admin/form-tl-sektor?on_tier=Mitra&status=Return by Tier 1&datel_id=${record.datel_id}`;

                if (record?.tier_2?.return) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.tier_2.return}</Link>
                      ) : (
                        record.tier_2.return
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
          ],
        },
        {
          key: "commerce",
          dataIndex: "commerce",
          title: "Commerce",
          hidden: ["wh", "first_tier", "tl"].includes(user.role),
          children: [
            {
              key: "commerce.not_filled",
              dataIndex: "commerce.not_filled",
              title: "Belum Diisi",
              render: (_, record) => {
                let url = "";
                if (["admin", "commerce"].includes(user.role))
                  url = `/admin/commerce/order?status=not_filled&datel_id=${record.datel_id}`;
                if (record?.commerce?.not_filled) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.commerce.not_filled}</Link>
                      ) : (
                        record.commerce.not_filled
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
            {
              key: "commerce.filled",
              dataIndex: "commerce.filled",
              title: "Sudah diisi",
              render: (_, record) => {
                let url = "";
                if (["admin", "commerce"].includes(user.role))
                  url = `/admin/commerce/order?status=filled&datel_id=${record.datel_id}`;
                if (record?.commerce?.filled) {
                  return (
                    <div className="text-center">
                      {url ? (
                        <Link to={url}>{record.commerce.filled}</Link>
                      ) : (
                        record.commerce.filled
                      )}
                    </div>
                  );
                }
                return <div className="text-center">0</div>;
              },
            },
          ],
        },
      ].filter((c) => !c.hidden) as ColumnsType<any>,
    [user]
  );

  return columns;
};
