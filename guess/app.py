from flask import Flask, render_template, session, jsonify, request
import string
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "fallback-secret")

LETTERS = list(string.ascii_lowercase)  # ['a'..'z']


def init_search():
    session['low'] = 0
    session['high'] = len(LETTERS) - 1
    session['history'] = []


def make_guess():
    low = session.get('low', 0)
    high = session.get('high', len(LETTERS) - 1)
    if low > high:
        return None
    mid = (low + high) // 2
    return {'index': mid, 'letter': LETTERS[mid]}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start():
    init_search()
    g = make_guess()
    return jsonify({
        'guess': g,
        'low': session['low'],
        'high': session['high'],
        'history': session['history']
    })


@app.route('/respond', methods=['POST'])
def respond():
    data = request.get_json() or {}
    action = data.get('action')  # 'higher', 'lower', 'correct'
    guess_index = data.get('guess_index')

    low = session.get('low', 0)
    high = session.get('high', len(LETTERS) - 1)
    history = session.get('history', [])

    # Safety: ensure indices are ints
    try:
        guess_index = int(guess_index)
    except Exception:
        return jsonify({'error': 'invalid guess index'}), 400

    # Record history
    history.append({
        'guess_index': guess_index,
        'guess': LETTERS[guess_index],
        'action': action
    })
    session['history'] = history

    if action == 'higher':
        low = guess_index + 1
    elif action == 'lower':
        high = guess_index - 1
    elif action == 'correct':
        return jsonify({
            'result': 'correct',
            'guess': LETTERS[guess_index],
            'history': history
        })
    else:
        return jsonify({'error': 'unknown action'}), 400

    session['low'] = low
    session['high'] = high

    if low > high:
        return jsonify({
            'result': 'inconsistent',
            'message': 'No letters left — was there inconsistent feedback?',
            'history': history
        })

    mid = (low + high) // 2
    session['last_guess'] = mid
    return jsonify({
        'guess': {'index': mid, 'letter': LETTERS[mid]},
        'low': low,
        'high': high,
        'history': history
    })


if __name__ == '__main__':
    app.run()

