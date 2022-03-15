import { FEEDS, getFeed } from "../../lib/rss";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";

interface IFeedProps {
  feed: IFeed;
  feedItems: any;
}

let feedCategory: string;
const Feed = ({ feed, feedItems }: IFeedProps) => {
  const [category, setCategory] = useState<string>("sport");
  const router = useRouter();

  useEffect(() => {
    feedCategory = category;
  }, [category]);

  return (
    <div>
      <button type="button" onClick={() => router.push("/")}>
        Gå tilbake
      </button>
      <h1>
        {feed.title}, kategori {category}
      </h1>
      <div>
        {feedItems.map((item: any) => (
          <a href={item.link} key={item.link} target="_blank">
            <h1>{item.title}</h1>
            <p>{item.content.slice(0, 300)}...</p>
            <h3>{format(new Date(item.isoDate), "PPP")}</h3>
          </a>
        ))}
      </div>
    </div>
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
