python3 /app/get_model.py
gunicorn -w 4 -b 0.0.0.0:1821 --reload "app.main:create_app()"