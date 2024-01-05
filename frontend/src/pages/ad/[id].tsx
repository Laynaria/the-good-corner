import { Ad } from "@/types/ad.type";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const GET_ADD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      title
      price
      picture
      owner
      location
      id
      description
      createdAt
      user {
        id
      }
    }
  }
`;

const DELETE_ADD = gql`
  mutation Mutation($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

const AdDetailComponent = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; role: string }>({
    id: 0,
    role: "",
  });
  const { id } = router.query;
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload: any = jwtDecode(token);
      setUser(payload);
    }
  }, []);

  const [getAd, { loading, error }] = useLazyQuery(GET_ADD_BY_ID, {
    variables: {
      getAdByIdId: Number(id),
    },
    onCompleted: (data: { getAdById: Ad }) => {
      setAd(data.getAdById);
    },
  });
  const [deleteAd] = useMutation(DELETE_ADD);

  useEffect(() => {
    if (id) {
      getAd();
    }
  }, [getAd, id]); // have to see if it doesn't loop, but that was a correction from eslint to add getAd in dependencies

  const handleEdit = () => {
    if (ad) {
      router.push(`/ad/edit/${ad.id}`);
    }
  };

  const handleDelete = () => {
    deleteAd({
      variables: {
        deleteAdId: Number(id),
      },
      onCompleted: () => router.push("/"),
    });
  };

  if (loading || !ad) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
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
            Annoncée publiée par <b>{ad.owner.split("@")[0]}</b> à {ad.location}{" "}
            {`le ${ad.createdAt.split("T")[0]} (${
              ad.createdAt.split("T")[1].split(":")[0]
            }:${ad.createdAt.split("T")[1].split(":")[1]})`}{" "}
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
        {ad.user.id === user.id || user.role === "ADMIN" ? (
          <>
            <button className="button" onClick={handleEdit}>
              Edit l&apos;annonce
            </button>
            <button className="button" onClick={handleDelete}>
              Supprimer l&apos;annonce
            </button>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default AdDetailComponent;
