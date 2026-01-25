import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Perfume } from "../../../lib/types/perfume";
import PerfumeService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { setChosenPerfume, setStore } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveChosenPerfume, retrieveStore } from "./selector";
import { CartItem } from "../../../lib/types/search";
import MemberService from "../../services/memberService";

const actionDispatch = (dispatch: any) => ({
  setStore: (data: Member) => dispatch(setStore(data)),
  setChosenPerfume: (data: Perfume) => dispatch(setChosenPerfume(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenPerfume,
  (chosenPerfume) => ({ chosenPerfume })
);
const storeRetriever = createSelector(
  retrieveStore,
  (store) => ({ store })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenPerfume(props: ChosenProductProps) {
  const { onAdd } = props;
  const { perfumeId } = useParams<{ perfumeId: string }>();
  const { setStore, setChosenPerfume } = actionDispatch(useDispatch());
  const { chosenPerfume } = useSelector(chosenProductRetriever);
  const { store } = useSelector(storeRetriever);

  const [selectedImg, setSelectedImg] = useState<string>("");

  useEffect(() => {
    if (!perfumeId) return;

    const perfume = new PerfumeService();
    perfume.getPerfume(perfumeId).then(data => {
      setChosenPerfume(data);
      if (data.perfumeImages.length > 0) {
        setSelectedImg(`${serverApi}/${data.perfumeImages[0]}`);
      }
    }).catch((err) => console.log(err));

    const member = new MemberService();
    member.getStore().then(data => setStore(data))
      .catch((err) => console.log(err));
  }, [perfumeId]);

  const perfume = chosenPerfume;

  if (!perfume) return <div>Loading perfume details...</div>;

  return (
    <div className="product-detail-container">
      <h1 className="title">PERFUME DETAIL</h1>
      <div className="product-main">
        <div className="product-image">
          <img src={selectedImg} alt="Main" className="main-img" />
          <div className="thumbnails">
            {perfume.perfumeImages.map((img, index) => (
              <img
                key={index}
                src={`${serverApi}/${img}`}
                alt={`thumb-${index}`}
                className={`thumbnail ${selectedImg === `${serverApi}/${img}` ? "active" : ""}`}
                onClick={() => setSelectedImg(`${serverApi}/${img}`)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2>{perfume.perfumeName}</h2>
          <p className="collection">PERFUME COLLECTION</p>
          <p className="category">{perfume.perfumeCollection}</p>
          <p className="views">👁️ {perfume.perfumeViews} views</p>
          <p className="desc-title">PERFUME DESCRIPTION</p>
          <p className="desc">{perfume.perfumeDesc}</p>
          <p className="price">${perfume.perfumePrice.toLocaleString()}</p>
          <button
            className="add-btn"
            onClick={(e) => {
              onAdd({
                _id: perfume._id,
                quantity: 1,
                name: perfume.perfumeName,
                price: perfume.perfumePrice,
                image: perfume.perfumeImages?.[0] ?? "", // safer here
              });
              e.stopPropagation();
            }}
          >
            ADD TO BASKET
          </button>


        </div>
      </div>
    </div>
  );
}
