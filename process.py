import praw
import sys

def search_saved(reddit, preferences):
    saved_output = {}
    print(sum(1 for _ in reddit.user.me().saved(limit=25)), file=sys.stderr)
    for item in reddit.user.me().saved():
        if isinstance(item, praw.models.Submission) and not item.is_self:
            if 'nsfw' not in preferences and item.over_18:  # if you don't pick nsfw
                continue
            else:
                if item.url.endswith('png') or item.url.endswith('jpeg'):
                    saved_output[item.title] = [item.url, item.subreddit.display_name]
    return saved_output


# needs a regex to filter results