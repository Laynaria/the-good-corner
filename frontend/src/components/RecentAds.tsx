import { useState } from "react";
import AdCard from "./AdCard";
import { Ad } from "@/types/ad.type";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/RecentAds.module.css";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_ADS = gql`
  query Query($categoryId: Float, $terms: String) {
    getAllAd(categoryId: $categoryId, terms: $terms) {
      price
      title
      picture
      owner
      location
      description
      id
      createdAt
    }
  }
`;

const RecentAds = () => {
  const [totalPrice, setTotalePrice] = useState<number>(0);

  const [ads, setAds] = useState<Ad[]>([]);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const terms = searchParams.get("terms") ?? "";

  const { loading, error } = useQuery(GET_ALL_ADS, {
    variables: {
      categoryId: categoryId !== "" ? parseInt(categoryId as string) : null,
      terms,
    },
    onCompleted: (data) => {
      setAds(data.getAllAd);
    },
  });

  const handleClickPrice = (price: number) => {
    setTotalePrice(totalPrice + price);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

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
