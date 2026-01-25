import React, { useEffect, useState, ChangeEvent } from "react";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Perfume } from "../../../lib/types/perfume";
import { CartItem } from "../../../lib/types/search";
import PerfumeService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
 import { useLocation } from "react-router-dom";
import { PerfumeCollection } from "../../../lib/enums/perfume.enum";
 
type RoomCategory = "BEDROOM" | "LIVING_ROOM" | "DINING_ROOM" | "OFFICE" | "OUTDOOR";

const categories: { label: string; value: RoomCategory | "ALL"; img: string }[] = [
  { label: "All", value: "ALL", img: "/img/all.png" },
  { label: "Bedroom", value: "BEDROOM", img: "/img/bedroom.png" },
  { label: "Living Room", value: "LIVING_ROOM", img: "/img/livingR.png" },
  { label: "Dining Room", value: "DINING_ROOM", img: "/img/kitchen.png" },
  { label: "Office", value: "OFFICE", img: "/img/office.png" },
  { label: "Outdoor", value: "OUTDOOR", img: "/img/outdoor.png" },
];

interface PerfumesProps {
  onAdd: (item: CartItem) => void;
}

const Perfumes: React.FC<PerfumesProps> = ({ onAdd }) => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCollection = (queryParams.get("collection") || "ALL") as RoomCategory | "ALL";
  
  const [filter, setFilter] = useState<RoomCategory | "ALL">(initialCollection);
    const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;
  const history = useHistory();

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const service = new PerfumeService();
        const result = await service.getPerfumes({ page: 1, limit: 100, order: "price" });
        setPerfumes(result);
      } catch (err) {
        console.error("Error fetching perfumes:", err);
      }
    };
    fetchPerfumes();
  }, []);

  const filteredPerfume =
    filter === "ALL"
      ? perfumes
      : perfumes.filter((item) => item.perfumeCollection === filter as PerfumeCollection);

  const paginatedPerfume = filteredPerfume.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredPerfume.length / itemsPerPage);

  const handleCardClick = (id: string) => {
    history.push(`/perfumes/${id}`);
  };

  const handlePagination = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleCategoryChange = (value: RoomCategory | "ALL") => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="perfume-list-container">
      <h2 className="section-title">Perfumes</h2>

      {/* Category Menu */}
      <div className="category-menu">
        {categories.map((cat) => (
          <div
            key={cat.value}
            className={`category-item ${filter === cat.value ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat.value)}
          >
            <img src={cat.img} alt={cat.label} />
            <span>{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Perfume Grid */}
      <div className="perfume-grid">
        {paginatedPerfume.map((item) => (
          <div key={item._id} className="perfume-card">
            <div className="card-img-wrapper" onClick={() => handleCardClick(item._id)}>
              <img
                src={`${serverApi}/${item.perfumeImages[0]}`}
                alt={item.perfumeName}
                className="perfume-image"
              />
              <div className="stock-overlay">
                <InventoryIcon fontSize="small" />
                <span>{item.perfumeLeftCount} left</span>
              </div>
            </div>

            <h3>{item.perfumeName}</h3>
            <p className="price">${item.perfumePrice.toLocaleString()}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd({
                  _id: item._id,
                  name: item.perfumeName,
                  image: item.perfumeImages[0],
                  quantity: 1,
                  price: item.perfumePrice,
                });
              }}
            >
              <AddShoppingCartIcon style={{ marginRight: 6 }} />
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack className="pagination-section" spacing={2}>
          <Pagination
            page={currentPage}
            count={totalPages}
            onChange={handlePagination}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
                color="secondary"
              />
            )}
          /> 
        </Stack>
      )}
    </div>
  );
};

export default Perfumes;
