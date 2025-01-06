import praw

def search_saved(reddit, preferences):
    output = []
    for item in reddit.user.me().saved(limit=None):
        if isinstance(item, praw.models.Submission) and not item.is_self:
            if 'nsfw' not in preferences and item.over_18:
                continue
            else:
                if item.url.endswith('png') or item.url.endswith('jpeg') or item.url.endswith('jpg'):
                    output.append({
                        "title": item.title,
                        "url": item.url, 
                        "subreddit": item.subreddit.display_name})

    return output

# needs a regex to filter results
