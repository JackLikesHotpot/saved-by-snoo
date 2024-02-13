from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html', name='jack')


@app.route('/about')
def about():
    return 'This is a Reddit s!'

# pipenv shell
# flask run --debug
