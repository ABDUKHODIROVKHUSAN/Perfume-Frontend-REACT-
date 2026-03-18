import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PerfumeService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { setChosenPerfume, setStore } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveChosenPerfume } from "./selector";
import { CartItem } from "../../../lib/types/search";
import MemberService from "../../services/memberService";

const chosenProductRetriever = createSelector(
  retrieveChosenPerfume,
  (chosenPerfume) => ({ chosenPerfume })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenPerfume(props: ChosenProductProps) {
  const { onAdd } = props;
  const { perfumeId } = useParams<{ perfumeId: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { chosenPerfume } = useSelector(chosenProductRetriever);

  const [selectedImg, setSelectedImg] = useState<string>("");

  useEffect(() => {
    if (!perfumeId) return;

    const perfume = new PerfumeService();
    perfume.getPerfume(perfumeId).then(data => {
      dispatch(setChosenPerfume(data));
      if (data.perfumeImages.length > 0) {
        setSelectedImg(`${serverApi}/${data.perfumeImages[0]}`);
      }
    }).catch((err) => console.log(err));

    const member = new MemberService();
    member.getStore().then(data => dispatch(setStore(data)))
      .catch((err) => console.log(err));
  }, [perfumeId, dispatch]);

  const perfume = chosenPerfume;

  if (!perfume) return <div>Loading perfume details...</div>;

  const safeMeta = perfume as unknown as Record<string, unknown>;
  const perfumeBrand =
    (typeof safeMeta.perfumeBrand === "string" && safeMeta.perfumeBrand) ||
    (typeof safeMeta.PerfumeBrand === "string" && safeMeta.PerfumeBrand) ||
    "Signature";
  const perfumeSize =
    (typeof safeMeta.perfumeSize === "string" && safeMeta.perfumeSize) ||
    "Standard";
  const perfumeDesc = perfume.perfumeDesc || "";

  const fragranceNotes = {
    top: ["Bergamot", "Black Pepper", "Cardamom"],
    heart: ["Jasmine", "Patchouli", "Leather"],
    base: ["Amber", "Musk", "Vetiver"],
  };

  const intensity =
    perfume.perfumePrice >= 220 ? "Very Strong" : perfume.perfumePrice >= 150 ? "Strong" : "Moderate";
  const longevity =
    perfumeSize === "Large" ? "12+ hours" : perfumeSize === "Medium" ? "8+ hours" : "6+ hours";
  const sillage = perfume.perfumeViews >= 6 ? "Very Strong" : "Strong";

  const aboutBullets = perfumeDesc
    .split(".")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="gold-soft-perfumes gold-detail clean-detail">
      <div className="gold-detail-main clean-detail-main">
        <div className="gold-detail-images">
          <div className="gold-detail-main-img clean-main-img">
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

        <div className="gold-detail-info clean-detail-info">
          <p className="gold-detail-kicker">{perfumeBrand}</p>
          <h2 className="gold-detail-title">{perfume.perfumeName}</h2>
          <p className="gold-detail-sub">{String(perfume.perfumeCollection)}</p>
          <div className="gold-detail-ledger">
            <div>
              <span>Edition</span>
              <p>{perfumeSize}</p>
            </div>
            <div>
              <span>Views</span>
              <p>{perfume.perfumeViews}</p>
            </div>
            <div>
              <span>Occasion</span>
              <p>Evening / Signature</p>
            </div>
          </div>

          <div className="gold-note-section">
            <h4>Fragrance Notes</h4>
            <div className="gold-note-group">
              <span>Top Notes</span>
              <div className="gold-note-chips">
                {fragranceNotes.top.map((note) => (
                  <em key={note}>{note}</em>
                ))}
              </div>
            </div>
            <div className="gold-note-group">
              <span>Heart Notes</span>
              <div className="gold-note-chips">
                {fragranceNotes.heart.map((note) => (
                  <em key={note}>{note}</em>
                ))}
              </div>
            </div>
            <div className="gold-note-group">
              <span>Base Notes</span>
              <div className="gold-note-chips">
                {fragranceNotes.base.map((note) => (
                  <em key={note}>{note}</em>
                ))}
              </div>
            </div>
          </div>

          <div className="gold-detail-specs">
            <div>
              <span>Intensity</span>
              <p>{intensity}</p>
            </div>
            <div>
              <span>Longevity</span>
              <p>{longevity}</p>
            </div>
            <div>
              <span>Sillage</span>
              <p>{sillage}</p>
            </div>
          </div>

          <button
            className="gold-detail-primary-btn"
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
            Add to Cart
          </button>

          <div className="gold-detail-service-row">
            <span>Free Shipping</span>
            <span>Free Returns</span>
            <span>Samples Included</span>
          </div>

          <div className="gold-detail-about">
            <h4>About This Fragrance</h4>
            <ul>
              {aboutBullets.length > 0 ? (
                aboutBullets.map((line) => <li key={line}>{line}</li>)
              ) : (
                <>
                  <li>Crafted in small batches with quality ingredients.</li>
                  <li>Designed for everyday elegance and confidence.</li>
                  <li>Balanced profile with lasting character.</li>
                </>
              )}
            </ul>
          </div>

          <div className="gold-detail-foot">
            <p className="gold-detail-price">${perfume.perfumePrice.toLocaleString()}</p>
            <button
              className="gold-detail-back"
              onClick={() => history.push("/perfumes")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
