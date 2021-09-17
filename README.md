# YouTube Music-Video Plugin

![music image](./server/readme-image.jpg)

# Tech Stack

- Django
- React

# To Run Client (standalone)

    $ cd server
    $ cd client
    $ yarn - to install dependencies if you haven't
    $ yarn start:standalone

# To Build

### Build the Client

    $ cd server
    $ cd client
    $ yarn
    $ yarn build

### Build the single-spa root

    $ cd root
    $ yarn
    $ yarn build

### Run your python runserver

    $ cd server

    $ python -m venv venv - to create a virtual environment
    $ venv\scripts\activate

    $ pip install -r requirements/local.txt

    - Create .env file in config and put variables for Secret Key and Database (PostgreSQL) as created in sample.env file

    $ python manage.py makemigrations
    $ python manage.py migrate

    $ python manage.py runserver
