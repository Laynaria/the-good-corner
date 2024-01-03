import RecentAds from "@/components/RecentAds";
import isLogged from "@/components/secure/isLogged";
import styles from "@/styles/Home.module.css";

function Home() {
  return (
    <>
      <RecentAds />
    </>
  );
}

export default isLogged(Home);