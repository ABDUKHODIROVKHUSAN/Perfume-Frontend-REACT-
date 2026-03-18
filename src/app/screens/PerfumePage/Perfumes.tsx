import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useHistory, useLocation } from "react-router-dom";

import { Perfume } from "../../../lib/types/perfume";
import { CartItem } from "../../../lib/types/search";
import PerfumeService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

type BrandFilter =
  | "ALL"
  | "Dior"
  | "Chanel"
  | "Gucci"
  | "Armani"
  | "Hugo Boss";

const COLLECTIONS = [
  { label: "All", value: "ALL" },
  { label: "Dior", value: "Dior" },
  { label: "Chanel", value: "Chanel" },
  { label: "Gucci", value: "Gucci" },
  { label: "Armani", value: "Armani" },
  { label: "Hugo Boss", value: "Hugo Boss" },
] as const;

interface Props {
  onAdd: (item: CartItem) => void;
}

const Perfumes: React.FC<Props> = ({ onAdd }) => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState<Perfume[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<BrandFilter>("ALL");

  const PER_PAGE = 8;
  const SWIPE_THRESHOLD = 60;
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const raw = (params.get("brand") || params.get("collection") || "ALL").trim();
    const selected =
      COLLECTIONS.find((item) => item.value.toLowerCase() === raw.toLowerCase())
        ?.value || "ALL";

    setFilter(selected as BrandFilter);
    setPage(1);
  }, [location.search]);

  const getPerfumeBrand = (p: Perfume): string =>
    (p as Perfume & { perfumeBrand?: string; PerfumeBrand?: string }).perfumeBrand ||
    (p as Perfume & { perfumeBrand?: string; PerfumeBrand?: string }).PerfumeBrand ||
    "";

  const getPerfumeCollection = (p: Perfume): string => {
    const rawCollection = (p as unknown as Record<string, unknown>).perfumeCollection;
    return typeof rawCollection === "string" && rawCollection.trim()
      ? rawCollection
      : "Signature Collection";
  };

  const filtered =
    filter === "ALL"
      ? data
      : data.filter((p) => getPerfumeBrand(p).toLowerCase() === filter.toLowerCase());

  const visible = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const fromIndex = filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const toIndex = Math.min(page * PER_PAGE, filtered.length);

  const goToNextPage = () => {
    setPage((prev) => (prev < pages ? prev + 1 : prev));
  };

  const goToPrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const onSwipeEnd = () => {
    if (touchStartX === null || touchEndX === null || pages <= 1) return;
    const delta = touchStartX - touchEndX;

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) goToNextPage();
    else goToPrevPage();
  };

  return (
    <section className="gold-soft-perfumes">
      <header className="gold-soft-header">
        <div className="gold-soft-header-grid">
          <div>
            <span>Maison de Parfum</span>
            <h2>Golden Signature Collection</h2>
            <p className="gold-soft-intro-copy">
              Editorially curated fragrances designed to own a room, linger in memory,
              and define every entrance.
            </p>
          </div>
          <aside className="gold-soft-summary-card">
            <strong>{filtered.length}</strong>
            <p>Total fragrances in this edit</p>
            <em>
              Showing {fromIndex}-{toIndex}
            </em>
          </aside>
        </div>
      </header>

      <div className="gold-soft-tabs">
        {COLLECTIONS.map((c) => (
          <button
            key={c.value}
            className={`gold-soft-tab ${filter === c.value ? "active" : ""}`}
            onClick={() => {
              history.replace({ search: `?brand=${encodeURIComponent(c.value)}` });
              setFilter(c.value);
              setPage(1);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        className="gold-soft-grid"
        onTouchStart={(e) => {
          setTouchStartX(e.touches[0].clientX);
          setTouchEndX(null);
        }}
        onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
        onTouchEnd={onSwipeEnd}
      >
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
              <div className="gold-soft-title-row">
                <h3>{p.perfumeName}</h3>
                <p className="gold-soft-price">${p.perfumePrice.toLocaleString()}</p>
              </div>
              <p className="gold-soft-collection">{getPerfumeCollection(p)}</p>
              <p className="gold-soft-desc">
                {p.perfumeDesc || "A captivating fragrance crafted for elegant daily wear."}
              </p>

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
                Add
              </button>
            </div>
          </article>
        ))}
      </div>

      {pages > 1 && (
        <Stack className="gold-soft-pagination">
          <div className="gold-soft-nav">
            <button
              type="button"
              className="gold-soft-nav-btn"
              onClick={goToPrevPage}
              disabled={page === 1}
              aria-label="Previous products"
            >
              <ChevronLeftIcon />
            </button>
            <span className="gold-soft-nav-text">{page} / {pages}</span>
            <button
              type="button"
              className="gold-soft-nav-btn"
              onClick={goToNextPage}
              disabled={page === pages}
              aria-label="Next products"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </Stack>
      )}
    </section>
  );
};

export default Perfumes;
