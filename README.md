# YouTube Music-Video Plugin

![music image](./server/readme-image.jpg)

# Tech Stack

- Django
- React

# To Run Client (standalone)

    $ cd server/client
    $ yarn - to install dependencies if you haven't
    $ yarn start:standalone

server running on <a href='http://localhost:8080'>http://localhost:8080</a>

## Note to the Backend devs and to the DevOps

    Please build first before starting django server

# To Build

### Build the Client

    $ cd server/client
    $ yarn
    $ yarn build

### Build the single-spa root

    $ cd root
    $ yarn
    $ yarn build

# To Run Django Server

    $ cd server

    $ python -m venv venv - to create a virtual environment
    $ venv\scripts\activate

    $ pip install -r requirements/local.txt

    - Create .env file in config and put variables for Secret Key and Database (PostgreSQL) as created in sample.env file

    $ python manage.py makemigrations
    $ python manage.py migrate

    $ python manage.py runserver

Server running on <a href='http://localhost:8000'>http://localhost:8000</a>

API root available on <a href='http://localhost:8000/api/'>http://localhost:8000/api/</a>

Admin root available on <a href='http://localhost:8000/admin/'>http://localhost:8000/admin/</a>
