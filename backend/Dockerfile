FROM python:3.10

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install --no-cache-dir pipenv && pipenv install --deploy --ignore-pipfile

COPY . .

EXPOSE 5000

ENV FLASK_APP=app.py

ENV FLASK_ENV=development

CMD ["pipenv", "run", "flask", "run", "--host=0.0.0.0"]
