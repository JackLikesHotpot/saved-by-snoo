import praw

def search_saved(reddit, preferences):
    output = []
    index = 0
    try:
        for item in reddit.user.me().saved(limit=None):
            # check if each submission in saved is a submission and isn't a text post
            if isinstance(item, praw.models.Submission) and not item.is_self:
                # skip if 'nsfw' was marked and the item is over_18
                if 'nsfw' not in preferences and item.over_18:
                    continue
                else:
                    if item.url.endswith('png') or item.url.endswith('jpeg') or item.url.endswith('jpg'):
                        output.append({
                            "title": item.title,
                            "url": item.url, 
                            "subreddit": item.subreddit.display_name,
                            "nsfw": item.over_18,
                            "index": index})
            index += 1
    except Exception as e:
        print('Process failed! Error encountered {e}')

    return output

# needs a regex to filter results
