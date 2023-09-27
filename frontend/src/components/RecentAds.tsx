import { useState, useEffect } from "react";
import AdCard from "./AdCard";
import axios from "axios";
import { Ad } from "@/types/ad.type";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/RecentAds.module.css";

const RecentAds = () => {
  const [totalPrice, setTotalePrice] = useState<number>(0);

  const [ads, setAds] = useState<Ad[]>([]);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const handleClickPrice = (price: number) => {
    setTotalePrice(totalPrice + price);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/ad?categoryId=${categoryId}`
        );
        setAds(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total Price: {totalPrice} €</p>
      <section className={styles.recentAds}>
        {ads.map((ad, index) => (
          <div key={index}>
            <AdCard
              imgUrl={ad.picture}
              price={ad.price}
              link={`/ad/${ad.id}`}
              title={ad.title}
            />

            <button
              className="button"
              onClick={() => handleClickPrice(ad.price)}
            >
              Add price to Total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
