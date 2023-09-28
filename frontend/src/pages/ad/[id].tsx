import { Ad } from "@/types/ad.type";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdDetailComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      const res = await axios.get(`http://localhost:5000/ad/${id}`);
      setAd(res.data);
    };

    if (id) {
      fetchAd();
    }
  }, [id]);

  const handleEdit = () => {
    if (ad) {
      router.push(`/ad/edit/${ad.id}`);
    }
  };

  const handleClick = async () => {
    if (ad) {
      await axios.delete(`http://localhost:5000/ad/${ad.id}`);
      router.push("/");
    }
  };

  return (
    <>
      {!ad ? (
        <p>Loading</p>
      ) : (
        <>
          <h2 className="ad-details-title">{ad.title}</h2>
          <section className="ad-details">
            <div className="ad-details-image-container">
              <img className="ad-details-image" src={ad.picture} />
            </div>
            <div className="ad-details-info">
              <div className="ad-details-price">{ad.price} €</div>
              <div className="ad-details-description">{ad.description}</div>
              <hr className="separator" />
              <div className="ad-details-owner">
                Annoncée publiée par <b>{ad.owner.split("@")[0]}</b>{" "}
                {`${ad.createdAt.split("T")[0]} (${
                  ad.createdAt.split("T")[1].split(":")[0]
                }:${ad.createdAt.split("T")[1].split(":")[1]})`}
              </div>
              <Link
                href={`mailto:${ad.owner}`}
                className="button button-primary link-button"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                  stroke="currentcolor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
                </svg>
                Envoyer un email
              </Link>
            </div>
            <button className="button" onClick={handleEdit}>
              Edit l&apos;annonce
            </button>
            <button className="button" onClick={handleClick}>
              Supprimer l&apos;annonce
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default AdDetailComponent;
