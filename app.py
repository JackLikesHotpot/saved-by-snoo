from flask import Flask, render_template, request, redirect, session
import process
import praw
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = 'heeeeeeeesdsd2'


def initialize():
    client_id = os.getenv('CLIENT_ID')
    client_secret = os.getenv('CLIENT_SECRET')
    redirect_uri = os.getenv('REDIRECT_URI')
    user_agent = os.getenv('USER_AGENT')

    return praw.Reddit(
        client_id=client_id,
        client_secret=client_secret,
        user_agent=user_agent,
        redirect_uri=redirect_uri
    )


reddit = initialize()


@app.route('/')
def home():
    # Generate OAuth2 URL for authentication
    auth_url = reddit.auth.url(['identity', 'read', 'history'], state='...', duration='permanent')
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

    return render_template('form.html', user=user)


@app.route('/submission', methods=['GET', 'POST'])
def submission():
    if request.method == 'POST':
        # print(request.form)
        saved_output = process.search_saved(reddit=reddit, preferences=request.form)
    return render_template('output.html', output=saved_output)


if __name__ == '__main__':
    app.run(debug=True)
# pipenv shell
# flask run --debug
