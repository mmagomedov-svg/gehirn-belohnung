# Gehirn und Belohnung (Gruppe 1, Informatik 5A)

Unsere Präsentation „Wie unser Gehirn auf Belohnung reagiert“ als Webseite: Folien mit Vollbild, ein Video mit Sprecherstimme und Unterseiten für Sprechtext, Arbeitsblatt-Antworten, Erklärung und Quellen.

## Die Webseite (läuft direkt auf GitHub Pages)

Die Seiten liegen als fertige HTML-Dateien im Hauptordner. Jede Seite hat ihre eigene Adresse, wie bei einer Flask-App:

| Adresse       | Inhalt                                                |
|---------------|-------------------------------------------------------|
| `/`           | Präsentation (Vollbild mit F, Folien mit Pfeiltasten) |
| `/video/`     | Motion-Graphics-Video mit Sprecherstimme              |
| `/vorlesen/`  | Text zum Vorlesen, auch zu den Schaubildern           |
| `/antworten/` | Antworten fürs Arbeitsblatt                           |
| `/erklaerung/`| Einfach erklärt, mit Schaubildern                     |
| `/quellen/`   | Alle Quellen zum Anklicken                            |

GitHub Pages einschalten: Settings → Pages → Branch `main`, Ordner `/ (root)` → Save.
Danach ist die Seite unter `https://mmagomedov-svg.github.io/gehirn-belohnung/` erreichbar.

## Die Flask-Fassung

Dieselbe Seite als Flask-App liegt im Ordner `flask_app`. Die HTML-Dateien oben wurden aus ihren Vorlagen erzeugt.

    cd flask_app
    pip install flask
    python app.py

Dann im Browser öffnen: http://127.0.0.1:5000

## Aufbau

- `index.html`, `video/`, `vorlesen/`, …: die fertigen Seiten für GitHub Pages
- `static/`: Aussehen (`style.css`), Skripte (`deck.js`, `intro.js`), das Video in zwei Formaten und PptxGenJS (MIT-Lizenz) für den PowerPoint-Download
- `flask_app/app.py`: die Routen der Flask-Fassung (eine Funktion pro Seite)
- `flask_app/templates/`: die Vorlagen; `base.html` enthält den Kopf mit den Knöpfen

Die Fotos kommen von Pexels und werden aus dem Internet geladen. Ohne Internet erscheinen an ihrer Stelle die Schaubilder. Die Sprecherstimme im Video ist eine KI-Stimme von ElevenLabs.
