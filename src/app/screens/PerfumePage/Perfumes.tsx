import React, { useEffect, useState, ChangeEvent } from "react";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useHistory } from "react-router-dom";

import { Perfume } from "../../../lib/types/perfume";
import { CartItem } from "../../../lib/types/search";
import { PerfumeCollection } from "../../../lib/enums/perfume.enum";
import PerfumeService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

type CollectionFilter = "ALL" | PerfumeCollection;

const COLLECTIONS = [
  { label: "All", value: "ALL" },
  { label: "Dior", value: PerfumeCollection.DIOR },
  { label: "Chanel", value: PerfumeCollection.CHANEL },
  { label: "Gucci", value: PerfumeCollection.GUCCI },
  { label: "Armani", value: PerfumeCollection.ARMANI },
  { label: "Hugo Boss", value: PerfumeCollection.HUGO_BOSS },
] as const;
;

interface Props {
  onAdd: (item: CartItem) => void;
}

const Perfumes: React.FC<Props> = ({ onAdd }) => {
  const history = useHistory();
  const [data, setData] = useState<Perfume[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<CollectionFilter>("ALL");

  const PER_PAGE = 8;

  useEffect(() => {
    const load = async () => {
      const service = new PerfumeService();
      const res = await service.getPerfumes({
        page: 1,
        limit: 200,
        order: "price",
      });
      setData(res);
    };
    load();
  }, []);

  const filtered =
    filter === "ALL"
      ? data
      : data.filter((p) => p.perfumeCollection === filter);

  const visible = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const pages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <section className="gold-soft-perfumes">
      <header className="gold-soft-header">
        <span>Maison de Parfum</span>
        <h2>Golden Signature Collection</h2>
      </header>

      <div className="gold-soft-tabs">
        {COLLECTIONS.map((c) => (
          <button
            key={c.value}
            className={`gold-soft-tab ${filter === c.value ? "active" : ""}`}
            onClick={() => {
              setFilter(c.value);
              setPage(1);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="gold-soft-grid">
        {visible.map((p, i) => (
          <article
            key={p._id}
            className="gold-soft-card"
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => history.push(`/perfumes/${p._id}`)}
          >
            <div className="gold-soft-image">
              <img
                src={`${serverApi}/${p.perfumeImages[0]}`}
                alt={p.perfumeName}
              />
            </div>

            <div className="gold-soft-info">
              <h3>{p.perfumeName}</h3>
              <p>${p.perfumePrice.toLocaleString()}</p>

              <button
                className="gold-soft-add"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd({
                    _id: p._id,
                    name: p.perfumeName,
                    image: p.perfumeImages[0],
                    quantity: 1,
                    price: p.perfumePrice,
                  });
                }}
              >
                <LocalMallOutlinedIcon fontSize="small" />
                Add to cArd
              </button>
            </div>
          </article>
        ))}
      </div>

      {pages > 1 && (
        <Stack className="gold-soft-pagination">
          <Pagination
            page={page}
            count={pages}
            onChange={(_: ChangeEvent<unknown>, v) => setPage(v)}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
              />
            )}
          />
        </Stack>
      )}
    </section>
  );
};

export default Perfumes;
