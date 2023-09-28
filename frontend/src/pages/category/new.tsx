import axios from "axios";
import { useRouter } from "next/router";

const NewCategory = () => {
  const router = useRouter();

  const onCategorySubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault;

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    await axios.post("http://localhost:5000/categories", formJson);
    router.push("/");
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

export default NewCategory;
