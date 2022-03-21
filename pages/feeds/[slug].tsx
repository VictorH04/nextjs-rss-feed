import { FEEDS, getFeed } from "../../lib/rss";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import styles from "../../styles/Feed.module.scss";

interface IFeedProps {
  feed: IFeed;
  feedItems: any;
}

let feedCategory: string;
const Feed = ({ feed, feedItems }: IFeedProps) => {
  const router = useRouter();

  return (
    <section className={styles.feedPage}>
      <div className={styles.feedWrap}>
        <button type="button" onClick={() => router.back()}>
          Gå tilbake
        </button>
        <h1>{feed.title}, sport</h1>
        <div className={styles.feedPageCards}>
          {feedItems.map((item: any) => (
            <a
              className={styles.feedPageCard}
              href={item.link}
              key={item.link}
              target="_blank"
            >
              <h1>{item.title}</h1>
              <p>{item.content.slice(0, 300)}...</p>
              <h3>{format(new Date(item.isoDate), "PPP")}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: FEEDS.map((feed) => ({ params: { slug: feed.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const feed = FEEDS.find((feed: IFeed) => feed.slug === params.slug);
  const detailedFeed = await getFeed(feed?.url.concat(feedCategory));

  return {
    props: {
      feed,
      feedItems: detailedFeed.items,
    },
    revalidate: 5,
  };
};

export default Feed;
