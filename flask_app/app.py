"""Gehirn und Belohnung – Präsentation von Gruppe 1 als kleine Flask-App.

Starten (im Ordner flask_app):
    pip install flask
    python app.py
Dann im Browser öffnen: http://127.0.0.1:5000
"""
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static", static_url_path="/static")   # static/ liegt eine Ebene höher

# Knöpfe oben auf jeder Seite: (Name der Funktion unten, Text auf dem Knopf)
NAV = [
    ("praesentation", "Präsentation"),
    ("video", "Video"),
    ("vorlesen", "Text zum Vorlesen"),
    ("antworten", "Arbeitsblatt-Antworten"),
    ("erklaerung", "Einfach erklärt"),
    ("quellen", "Quellen"),
]


@app.context_processor
def knoepfe():
    """Macht die Liste der Knöpfe in allen Vorlagen verfügbar."""
    return {"nav": NAV}


@app.route("/")
def praesentation():
    return render_template("praesentation.html", active="praesentation")


@app.route("/video")
def video():
    return render_template("video.html", active="video")


@app.route("/vorlesen")
def vorlesen():
    return render_template("vorlesen.html", active="vorlesen")


@app.route("/antworten")
def antworten():
    return render_template("antworten.html", active="antworten")


@app.route("/erklaerung")
def erklaerung():
    return render_template("erklaerung.html", active="erklaerung")


@app.route("/quellen")
def quellen():
    return render_template("quellen.html", active="quellen")


if __name__ == "__main__":
    app.run(debug=True)
