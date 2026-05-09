export const categorizeDomain = (domain) => {
  const categories = {
    social: ['facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com', 'tiktok.com', 'reddit.com'],
    video: ['youtube.com', 'netflix.com', 'twitch.tv', 'hulu.com', 'primevideo.com'],
    productivity: ['github.com', 'stackoverflow.com', 'docs.google.com', 'notion.so', 'slack.com', 'trello.com'],
    shopping: ['amazon.com', 'ebay.com', 'walmart.com', 'target.com', 'etsy.com'],
    news: ['nytimes.com', 'cnn.com', 'bbc.com', 'theverge.com', 'techcrunch.com'],
    search: ['google.com', 'bing.com', 'duckduckgo.com', 'yahoo.com'],
  };

  for (const [category, domains] of Object.entries(categories)) {
    if (domains.some((d) => domain.includes(d))) {
      return category;
    }
  }

  return 'uncategorized';
};
