from flask import Flask, render_template, request, redirect, session
import reddit
import praw
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = 'heeeeeeeesdsd2'

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
redirect_uri = os.getenv('REDIRECT_URI')
user_agent = os.getenv('USER_AGENT')

reddit = praw.Reddit(
    client_id=client_id,
    client_secret=client_secret,
    user_agent=user_agent,
    redirect_uri=redirect_uri
)

def search_saved(reddit):
    saved_output = {}

    for item in reddit.user.me().saved(limit=10):
        if not item.over_18:
            saved_output[item.title] = item.url
    return saved_output


@app.route('/')
def home():
    # Generate OAuth2 URL for authentication
    auth_url = reddit.auth.url(['identity', 'read'], state='...', duration='permanent')
    return render_template('index.html', auth_url=auth_url)


@app.route('/auth_callback')
def auth_callback():
    code = request.args.get('code')
    access_token = reddit.auth.authorize(code)
    # Store access token securely
    session['access_token'] = access_token
    return redirect('/profile')


@app.route('/profile')
def profile():
    access_token = session.get('access_token')
    if not access_token:
        return redirect('/')

    # Use the access token to make authenticated requests
    user = reddit.user.me()
    return f"Logged in as: {user.name}"


if __name__ == '__main__':
    app.run(debug=True)
# pipenv shell
# flask run --debug
