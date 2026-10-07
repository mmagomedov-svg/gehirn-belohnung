# Gehirn und Belohnung (Gruppe 1, Informatik 5A)

Eine kleine Flask-App mit unserer Präsentation mit Video, Quiz und vier weiteren Unterseiten.

## Starten

    pip install flask
    python app.py

Dann im Browser öffnen: http://127.0.0.1:5000

## Seiten

| Adresse      | Inhalt                                             |
|--------------|----------------------------------------------------|
| /            | Präsentation (Vollbild mit F, Folien mit Pfeiltasten) |
| /video      | Motion-Graphics-Video mit Sprecherstimme           |
| /quiz       | Quiz mit sechs Fragen                              |
| /vorlesen    | Text zum Vorlesen                                  |
| /antworten   | Antworten fürs Arbeitsblatt                        |
| /erklaerung  | Einfach erklärt, mit Schaubildern                  |
| /quellen     | Alle Quellen zum Anklicken                         |

## Aufbau

- `app.py`: die Routen (eine Funktion pro Seite)
- `templates/base.html`: Kopf mit den Knöpfen, gilt für alle Seiten
- `templates/*.html`: der Inhalt jeder Seite
- `static/style.css`: das Aussehen
- `static/deck.js`: Folienwechsel, Vollbild, PowerPoint-Download
- `static/intro.mp4`, `static/intro.webm`, `static/intro.js`: das Video mit Sprecherstimme in zwei Formaten (der Browser nimmt das passende) und seine Steuerung
- `static/pptxgen.bundle.js`: Bibliothek PptxGenJS (MIT-Lizenz) für den PowerPoint-Download

Die Fotos kommen von Pexels und werden aus dem Internet geladen. Ohne Internet erscheinen an ihrer Stelle die Schaubilder.
