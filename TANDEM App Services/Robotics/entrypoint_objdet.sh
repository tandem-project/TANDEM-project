export WEIGHTS_PATH="/weights/best_nano_3.pt"
gunicorn -w 4 -b 0.0.0.0:1821 --reload "app.main:create_app()"