import praw

def search_saved(reddit, preferences):
    saved_output = {}
    for item in reddit.user.me().saved(limit=int(preferences['limit'])):
        if isinstance(item, praw.models.Submission):
            if 'nsfw' not in preferences:  # if you don't pick nsfw
                # not working i think
                if not item.over_18:
                    saved_output[item.title] = item.url
    return saved_output


# needs a regex to filter results