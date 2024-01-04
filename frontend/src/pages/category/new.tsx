import isAdmin from "@/components/secure/isAdmin";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: CreateCategoryInputType!) {
    createCategory(category: $category) {
      name
      id
    }
  }
`;

const NewCategory = () => {
  const router = useRouter();
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const onCategorySubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());

    createCategory({
      variables: {
        category: {
          ...formJson,
        },
      },
      onCompleted: () => router.push("/"),
    });
  };

  return (
    <form onSubmit={onCategorySubmit}>
      <label>
        Titre de la catégorie
        <br />
        <input className="text-field" name="name" type="text" />
      </label>

      <button className="button">Ajouter</button>
    </form>
  );
};

export default isAdmin(NewCategory);
