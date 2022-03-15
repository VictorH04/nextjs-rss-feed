import Parser from "rss-parser";

export const FEEDS = [
    {
        slug: "vg-blogg",
        title: "VG Blogg",
        url: `http://www.vg.no/export/Alle/rdf.hbs?kat=`,
    },
];

export async function getFeed(feedUrl) {
    let parser = new Parser();

    let feed = await parser.parseURL(feedUrl);

    return feed;
}