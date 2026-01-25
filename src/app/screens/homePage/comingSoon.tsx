import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../../lib/config";
import { Perfume } from "../../../lib/types/perfume";


const ComingSoonPerfumes = () => {
  const [Perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch coming soon Perfumes from backend
    axios
      .get(`${serverApi}/perfume/coming?limit=4`)
      .then((response) => {
        setPerfumes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load Perfumes.");
        setLoading(false);
        console.error("Error fetching coming soon Perfumes:", err);
      });
  }, []);

  if (loading) {
    return <div>Loading Perfumes...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bsp-section">
      <h2 className="bsp-title">Coming Soon ...</h2>
      <div className="bsp-products">
        {Perfumes.map((Perfume) => (
          <div className="bsp-card" key={Perfume._id}>
            <img
              src={`${serverApi}/${Perfume.perfumeImages[0]}`}
              alt={Perfume.perfumeName}
              className="bsp-img"
            />
            <h4 className="bsp-name">{Perfume.perfumeName}</h4>
            <p className="bsp-price">${Perfume.perfumePrice}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComingSoonPerfumes;
