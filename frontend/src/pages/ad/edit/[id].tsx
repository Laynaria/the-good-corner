import { Ad } from "@/types/ad.type";
import { useState, useEffect } from "react";
import { Category } from "@/types/category.type";
import { useRouter } from "next/router";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query Query {
    getCategories {
      name
      id
    }
  }
`;

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
      category {
        id
      }
    }
  }
`;

const EDIT_ADD = gql`
  mutation Mutation($ad: ModifyAdInputType!) {
    updateAd(ad: $ad) {
      category {
        id
      }
      title
      price
      picture
      owner
      location
      id
      description
      createdAt
    }
  }
`;

const NewAd = () => {
  const { data } = useQuery(GET_ALL_CATEGORIES);
  const [ad, setAd] = useState<Ad | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [editAd] = useMutation(EDIT_ADD);

  const [getAd, { loading, error }] = useLazyQuery(GET_ADD_BY_ID, {
    variables: {
      getAdByIdId: Number(id),
    },
    onCompleted: (data: { getAdById: Ad }) => {
      setAd(data.getAdById);
    },
  });

  useEffect(() => {
    if (id) {
      getAd();
    }
  }, [getAd, id]);

  const onFormChange = async (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      return setAd({
        ...ad,
        category: {
          //__typename : "Category",
          id: parseInt(value),
        },
      } as Ad);
    }

    await setAd({ ...ad, [name]: value } as Ad);

    // as Ad = ce sera forcément une Ad > fait moi confiance frère.
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());

    editAd({
      variables: {
        ad: {
          id: Number(id),
          title: formJson.title,
          price: parseInt(formJson.price as string),
          owner: formJson.owner,
          picture: formJson.picture,
          location: formJson.location,
          categoryId: parseInt(formJson.category as string),
          description: formJson.description,
        },
      },
      onCompleted: () => router.push(`/ad/${id}`),
    });
  };

  if (loading || !ad) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Titre de l&apos;annonce
        <br />
        <input
          className="text-field"
          name="title"
          type="text"
          value={ad.title}
          onChange={onFormChange}
        />
      </label>
      <br />

      <label>
        Prix de l&apos;annonce
        <br />
        <input
          className="text-field"
          name="price"
          type="number"
          value={ad.price}
          onChange={onFormChange}
        />
      </label>
      <br />

      <label>
        Propriétaire de l&apos;annonce
        <br />
        <input
          className="text-field"
          name="owner"
          type="text"
          value={ad.owner}
          onChange={onFormChange}
        />
      </label>
      <br />

      <label>
        Image de l&apos;annonce
        <br />
        <input
          className="text-field"
          name="picture"
          type="url"
          value={ad.picture}
          onChange={onFormChange}
        />
      </label>
      <br />

      <label>
        Ville de l&apos;annonce
        <br />
        <input
          className="text-field"
          name="location"
          type="text"
          value={ad.location}
          onChange={onFormChange}
        />
      </label>
      <br />

      <label>
        <select name="category" value={ad.category.id} onChange={onFormChange}>
          {data?.getCategories.map((category: Category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Description de l&apos;annonce
        <br />
        <textarea
          className="text-field"
          name="description"
          value={ad.description}
          onChange={onFormChange}
        />
      </label>
      <br />

      <button className="button">Editer</button>
    </form>
  );
};

export default NewAd;
