import { useState, useEffect } from "react";
import { Category } from "@/types/category.type";
import axios from "axios";

const NewAd = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get<Category[]>(
        "http://localhost:5000/categories?terms="
      );
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
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
        <select name="category">
          {categories.map((category) => (
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
