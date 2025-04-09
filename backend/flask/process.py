import praw
import requests

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

# function to remove 404 images
def validate_images(images):
    for item in range(len(images)-1, -1, -1):
        try:
            response = requests.head(images[item]['url'])
            if response.status_code == 404:
                images.pop(item)
        except requests.RequestException:
            return False

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
            print(f'Process failed! Error encountered. {e} for URL: {item.url}')
            continue

    validate_images(output)
    return output
