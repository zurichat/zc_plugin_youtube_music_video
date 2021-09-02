<h1 align="center">YouTube Music Player Plugin using Django and React</h1>

- Integration of Django and React

### Backend

- Django REST framework for a powerful API✔
- Django ORM for interacting with the database✔
- PostgreSQL✔

## How to Run locally 🚀

    - Install Dependencies after creating and activating virtual environement

### To create python virtual environment

        python -m venv <name_of_virtualenv>

        <name_of_virtualenv>\scripts\activate

        $ pip install -r requirements/local.txt

    - Create .env file in config and put variables for Secret Key and Database (PostgreSQL) as created in sample.env file


        $ python manage.py makemigrations
        $ python manage.py migrate

    - Install dependencies in frontend app using following commands in separate terminal
    - First make sure you have installed Node.js, I used v15.10.0 while developing this setup. For More info https://nodejs.org/en/
    - In another terminal CD into frontend directory
    - Then run following commands in the frontend directory where the package.json file is located

        $ yarn
        $ yarn dev

    - After that you should keep running this terminal as this is automatically compiling the react.js code in single file main.js
    - Then Run the following command in previous terminal to load frontend react app on django server

        $ python manage.py runserver

- React app available at `http://localhost:8000/`
- API root available at `http://localhost:8000/api/`
- Admin available at `http://localhost:8000/admin/`
