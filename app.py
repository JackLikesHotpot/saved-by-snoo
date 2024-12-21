from flask import Flask, jsonify, render_template, request, redirect, session, make_response
import process
import praw
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
app.secret_key = 'heeeeeeeesdsd2'
CORS(app)

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

@app.route('/auth_callback')
def auth_callback():
    code = request.args.get('code')
    try:
        session['access_token'] = reddit.auth.authorize(code)
        username = reddit.user.me().name
        return redirect(f'http://localhost:3000/form?username={username}')
    except Exception as e:
        print(f'Error: {e}')
        return redirect(f'http://localhost:3000/error')


@app.route('/profile')
def profile():
    access_token = session.get('access_token')
    if not access_token:
        return redirect('/')

    nsfw = request.args.get('nsfw')
    username = request.args.get('username')
    data = process.search_saved(reddit=reddit, preferences=[])
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
