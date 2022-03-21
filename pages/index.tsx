import type { NextPage } from "next";
import Link from "next/link";
import styles from "/styles/Home.module.scss";
import { FEEDS } from "../lib/rss";

const Home: NextPage = () => {
  let category: string = "sport";
  return (
    <div className={styles.container}>
      <h1>Utforsk de ulike bloggene!</h1>
      <div>
        {FEEDS.map((feed: IFeed) => (
          <Link
            key={feed.slug}
            href={`/feeds/${feed.slug}?category=${category}`}
            passHref
          >
            <a>{feed.title}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
