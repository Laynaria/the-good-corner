import { Ad } from "@/types/ad.type";
import { useState, useEffect } from "react";
import { Category } from "@/types/category.type";
import axios from "axios";
import { useRouter } from "next/router";

const NewAd = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ad, setAd] = useState<Ad | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAd = async () => {
      const res = await axios.get(`http://localhost:5000/ad/${id}`);
      setAd(res.data);
      console.log(res.data);
    };

    if (id) {
      fetchAd();
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get<Category[]>(
        "http://localhost:5000/categories?terms="
      );
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const onFormChange = async (e: React.SyntheticEvent) => {
    const { name, value } = e.target;
    await setAd({ ...ad, [name]: value });
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    await axios.put(`http://localhost:5000/ad/${id}`, formJson);
    router.push(`/ad/${id}`);
  };

  return (
    <>
      {!ad ? (
        <p>Loading</p>
      ) : (
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
            <select
              name="category_id"
              value={ad.category.id}
              onChange={onFormChange}
            >
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
            <textarea
              className="text-field"
              name="description"
              value={ad.description}
              onChange={onFormChange}
            />
          </label>
          <br />

          <button className="button">Ajouter</button>
        </form>
      )}
    </>
  );
};

export default NewAd;
