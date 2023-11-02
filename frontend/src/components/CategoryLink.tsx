import { Category } from "@/types/category.type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CategoryProps = {
  category: Category;
  max: number;
};

const CategoryLink = ({ category, max }: CategoryProps) => {
  const searchParams = useSearchParams();
  const terms = searchParams.get("terms") ?? "";
  return (
    <>
      <Link
        href={`/?category=${category.id}&terms=${terms}`}
        className="category-navigation-link"
      >
        {category.name}
      </Link>
      {max !== category.id ? "•" : ""}
    </>
  );
};

export default CategoryLink;
