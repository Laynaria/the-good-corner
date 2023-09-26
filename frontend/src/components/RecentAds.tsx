import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      title: "Table",
      price: 120,
      imgUrl: "/images/table.webp",
      link: "/ads/table",
    },
    {
      title: "Dame-jeanne",
      price: 75,
      imgUrl: "/images/dame-jeanne.webp",
      link: "/ads/dame-jeanne",
    },
    {
      title: "Vide-poche",
      price: 4,
      imgUrl: "/images/vide-poche.webp",
      link: "/ads/vide-poche",
    },
    {
      title: "Vaisselier",
      price: 900,
      imgUrl: "/images/vaisselier.webp",
      link: "/ads/vaisseliere",
    },
    {
      title: "Bougie",
      price: 8,
      imgUrl: "/images/bougie.webp",
      link: "/ads/bougie",
    },
    {
      title: "Porte-magazine",
      price: 45,
      imgUrl: "/images/porte-magazine.webp",
      link: "/ads/porte-magazine",
    },
  ];
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            imgUrl={ad.imgUrl}
            price={ad.price}
            link={ad.link}
            title={ad.title}
            key={ad.title}
          />
        ))}
      </section>
    </>
  );
};

export default RecentAds;
