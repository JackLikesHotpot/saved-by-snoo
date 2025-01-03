from flask import Flask, jsonify, request, redirect, session
from flask_session import Session
import process
import praw
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)

app.config['SESSION_TYPE'] = 'filesystem' 
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

CORS(app, supports_credentials=True, origins="http://localhost:3000")
Session(app)

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

@app.route('/api/auth_url', methods=['GET'])
def get_auth_url():
    auth_url = reddit.auth.url(['identity', 'read', 'history'], state='...', duration='permanent')
    return jsonify({'auth_url': auth_url})

# needed as auth_callback is being called by reddit key

@app.route('/auth_callback', methods=['GET'])
def auth_callback():
    code = request.args.get('code')
    reddit_code = reddit.auth.authorize(code)
    session['access_token'] = reddit_code
    username = reddit.user.me().name
    return redirect(f'http://localhost:3000/form?username={username}')

@app.route('/saved', methods=['GET'])
def saved():
    
    # access token just not working for some reason
    # access_token = session.get('access_token')
    # print(f"Access token retrieved: {access_token}")
    # if not access_token:
    #     return jsonify({'error': 'Unauthorized', 'redirect': '/'}, 401)

    nsfw = request.args.get('nsfw', default='false')
    preferences = []
    if nsfw.lower() == 'true':
        preferences.append('nsfw')
    data = process.search_saved(reddit=reddit, preferences=preferences)
    return jsonify(data)

# add page processing under here, rename too

@app.route('/api/submission', methods=['POST', 'GET'])
def submission():
    username = request.form.get('username')
    nsfw = request.form.get('nsfw', 'off')  

    print(f'Username: {username}')
    print(f'Include NSFW content: {nsfw}')
    
    response = {
        'status': 'success',
        'username': username,
        'nsfw': nsfw
    }
    
    return jsonify(response)

# need to work out if this is still being run or if not needed
if __name__ == '__main__':
    app.run(debug=True)
    
# pipenv run flask run --debug
