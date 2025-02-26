import praw
import re

def get_saved_image(item, index):
    return {
    "title": item.title,
    "url": item.url, 
    "subreddit": item.subreddit.display_name,
    "nsfw": item.over_18,
    "score": item.score,
    "date": item.created_utc,
    "index": index,
    "type": "Image"
}

def get_saved_gallery(item, index):
    media_id = item.gallery_data['items'][0]['media_id']
    url = f'https://i.redd.it/{media_id}.jpg'
    return {
        "title": item.title,
        "url": url, 
        "subreddit": item.subreddit.display_name,
        "nsfw": item.over_18,
        "score": item.score,
        "date": item.created_utc,
        "index": index,
        "type": "Gallery"
    }

def get_saved_video(item, index):
    url = item.preview["images"][0]["source"]["url"]
    return {
        "title": item.title,
        "url": url, 
        "subreddit": item.subreddit.display_name,
        "nsfw": item.over_18,
        "score": item.score,
        "date": item.created_utc,
        "index": index,
        "type": "Video"
    }

def search_saved(reddit, preferences):
    output = []
    index = 0
    for item in reddit.user.me().saved(limit=None):
        try:
            # check if each submission in saved is a submission and isn't a text post
            if isinstance(item, praw.models.Submission) and not item.is_self:
                # skip if 'nsfw' was marked and the item is over_18
                if 'nsfw' not in preferences and item.over_18:
                    continue
                elif item.url.endswith('png') or item.url.endswith('jpeg') or item.url.endswith('jpg'):
                    output.append(get_saved_image(item, index))
                    
                 # check to avoid deleted galleries
                elif item.url.startswith('https://www.reddit.com/gallery') and hasattr(item, "gallery_data"):
                    output.append(get_saved_gallery(item, index))

                elif item.url.startswith('https://v.redd.it') and hasattr(item, "preview"):
                    output.append(get_saved_video(item, index))
                    
            index += 1
        except Exception as e:
            print(f'Process failed! Error encountered. {e}')
            continue

    return output
