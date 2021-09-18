<h1 align="center">YouTube Music Player Plugin</h1>

# Stack: Django and React + Typescript

## Backend

- Django REST framework for a powerful API✔
- Django ORM for interacting with the database✔
- PostgreSQL✔

## Frontend: Core Libraries

- Redux (ReduxToolkit)
- Styled-components
- React-Player

## How to Run locally 🚀

### Note: You do not need to start the backend server to work on the frontend.

### For Frontend

    cd frontend
    yarn - to install dependencies if you've not installed them before
    yarn start

### For Backend

    python -m venv venv - to create a virtual environment
    venv\scripts\activate
    pip install -r requirements/local.txt

    - Create .env file in config and put variables for Secret Key and Database (PostgreSQL) as created in sample.env file


    $ python manage.py makemigrations
    $ python manage.py migrate

    $ python manage.py runserver

- React app available at `http://localhost:8000/`
