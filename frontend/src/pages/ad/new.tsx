import { Category } from "@/types/category.type";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query Query {
    getCategories {
      name
      id
    }
  }
`;

const CREATE_AD = gql`
  mutation CreateCategory($ad: CreateAdInputType!) {
    createAd(ad: $ad) {
      id
      title
      price
      picture
      owner
      owner
      location
      description
    }
  }
`;

const NewAd = () => {
  const { data } = useQuery(GET_ALL_CATEGORIES);
  const router = useRouter();
  const [createAd] = useMutation(CREATE_AD);

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());

    createAd({
      variables: {
        ad: {
          ...formJson,
          price: parseInt(formJson.price as string),
          categoryId: parseInt(formJson.categoryId as string),
        },
      },
      onCompleted: () => router.push("/"),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Titre de l&apos;annonce
        <br />
        <input className="text-field" name="title" type="text" />
      </label>
      <br />

      <label>
        Prix de l&apos;annonce
        <br />
        <input className="text-field" name="price" type="number" />
      </label>
      <br />

      <label>
        Propriétaire de l&apos;annonce
        <br />
        <input className="text-field" name="owner" type="text" />
      </label>
      <br />

      <label>
        Image de l&apos;annonce
        <br />
        <input className="text-field" name="picture" type="url" />
      </label>
      <br />

      <label>
        Ville de l&apos;annonce
        <br />
        <input className="text-field" name="location" type="text" />
      </label>
      <br />

      <label>
        <select name="categoryId">
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
        <textarea className="text-field" name="description" />
      </label>
      <br />

      <button className="button">Ajouter</button>
    </form>
  );
};

export default NewAd;
