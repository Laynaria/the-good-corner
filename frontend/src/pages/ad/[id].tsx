import { Ad } from "@/types/ad.type";
import axios from "axios";
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

  return (
    <>
      {!ad ? (
        <p>Loading</p>
      ) : (
        <>
          <h1>{ad.title}</h1>
          <img src={ad.picture} />
          <p>{ad.price} €</p>
        </>
      )}
    </>
  );
};

export default AdDetailComponent;
