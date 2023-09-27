import { Category } from "@/types/category.type";
import Link from "next/link";

type CategoryProps = {
  category: Category;
  max: number;
};

const Category = ({ category, max }: CategoryProps) => {
  return (
    <>
      <Link href={`/${category.id}`} className="category-navigation-link">
        {category.name}
      </Link>
      {max !== category.id ? "•" : ""}
    </>
  );
};

export default Category;
