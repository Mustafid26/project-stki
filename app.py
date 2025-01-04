from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
from flask import Flask, send_from_directory

app = Flask(__name__)

# Load  vectorizer, model
vectorizer = joblib.load('vectorizer.pkl')
model = joblib.load('reff_model.pkl')

data = pd.read_json('katalagu-indonesia-2000an.json')
data['title'] = data['lyrics'].apply(lambda x: x.get('title', 'Unknown') if isinstance(x, dict) else 'Unknown')
data['artist'] = data['lyrics'].apply(lambda x: x.get('artist', 'Unknown') if isinstance(x, dict) else 'Unknown')

@app.route('/src/<path:filename>')
def serve_static(filename):
    return send_from_directory('src', filename)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search-reff', methods=['POST'])
def search_reff():
    query = request.json['query']
    query_vector = vectorizer.transform([query])
    distances, indices = model.kneighbors(query_vector)
    
    results = []
    for idx in indices[0]:
        song = data.iloc[idx]
        results.append({"judul": song['title'], "artist": song['artist']})
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
