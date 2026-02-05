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
  <section className="gold-soft-perfumes gold-detail">
    <header className="gold-soft-header">
      <span>Maison de Parfum</span>
      <h2>{perfume.perfumeName}</h2>
    </header>

    <div className="gold-detail-main">
      <div className="gold-detail-images">
        <div className="gold-detail-main-img">
          <img src={selectedImg} alt={perfume.perfumeName} />
        </div>

        <div className="gold-detail-thumbs">
          {perfume.perfumeImages.map((img, index) => {
            const src = `${serverApi}/${img}`;
            return (
              <div
                key={index}
                className={`gold-detail-thumb ${
                  selectedImg === src ? "active" : ""
                }`}
                onClick={() => setSelectedImg(src)}
              >
                <img src={src} alt={`thumb-${index}`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="gold-detail-info">
        <p className="gold-detail-collection">Perfume Collection</p>
        <h3>{perfume.perfumeCollection}</h3>

        <p className="gold-detail-views">👁 {perfume.perfumeViews} views</p>

        <p className="gold-detail-desc-title">Description</p>
        <p className="gold-detail-desc">{perfume.perfumeDesc}</p>

        <p className="gold-detail-price">
          ${perfume.perfumePrice.toLocaleString()}
        </p>

        <button
          className="gold-soft-add gold-detail-add"
          onClick={(e) => {
            e.stopPropagation();
            onAdd({
              _id: perfume._id,
              quantity: 1,
              name: perfume.perfumeName,
              price: perfume.perfumePrice,
              image: perfume.perfumeImages?.[0] ?? "",
            });
          }}
        >
          ADD TO card
        </button>
      </div>
    </div>
  </section>
);
}
