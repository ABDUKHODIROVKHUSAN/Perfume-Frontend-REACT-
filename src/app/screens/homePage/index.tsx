import React, { useEffect } from "react";
import "../../../css/home.css";

import { setPopularPerfumes, setComingSoon } from "./slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { Perfume } from "../../../lib/types/perfume";
import PerfumeService from "../../services/ProductService";
import PopularPerfumes from "./PerfumeAds";
import Statistics from "./statistics";
import Rooms from "./perfumes";
import ClientReview from "./clientReview";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularPerfumes: (data: Perfume[]) => dispatch(setPopularPerfumes(data)),
  setComingSoon: (data: Perfume[]) => dispatch(setComingSoon(data)),
});

export default function HomePage() {
  const { setPopularPerfumes, setComingSoon } = actionDispatch(useDispatch());

  useEffect(() => {
    const perfumeService = new PerfumeService();

    perfumeService
    .getPerfumes({
        page: 1,
        limit: 4,
        order: "perfumePrice",
    })
        .then(data => {
            console.log("data passed here", data);

            setPopularPerfumes(data);
        })
        .catch((err) => { throw err })


    // Fetch coming soon perfumes sorted by date or status
    
    perfumeService.getComingSoon(4)
    .then((data) => {
      setComingSoon(data);  // Redux action to store coming soon perfumes
    })
    .catch(err => {
      console.error("Error fetching coming soon perfumes:", err);
    });
  }, [setPopularPerfumes, setComingSoon]);

  return (
    <div className={"homepage"}>
      <Statistics />
      <Rooms />
      <PopularPerfumes />
      <ClientReview />
    </div>
  );
}
