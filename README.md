# YouTube Music-Video Plugin

![music image](https://scontent.fabb1-1.fna.fbcdn.net/v/t1.6435-9/p640x640/184205866_309950770525058_7072329262818108856_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_ohc=KxNw0YAjzh8AX_67s2d&_nc_ht=scontent.fabb1-1.fna&oh=e0bb8173d7cf9f75f82b00345dbbb987&oe=616AD4A8)

# Tech Stack

- Django
- React

# To Run Client

### Start the client

    $ cd server/client
    $ yarn - to install dependencies if you haven't
    $ yarn start

### Start the single-spa root

    $ cd root
    $ yarn - to install dependencies if you haven't
    $ yarn start

Client server running @ <a href='http://localhost:22672'>http://localhost:22672</a>

### Note to the frontend devs

    You don't need to start django server. Only start the client and single-spa root

## Note to the DevOps

    Build first before starting django server

# To Build

### Build the client

    $ cd server/client
    $ yarn
    $ yarn build

### Build the single-spa root

    $ cd root
    $ yarn
    $ yarn build

### Lint Frontend

    - cd into the frontend folder (server/client)

    `$ yarn lint`

# To Run Django Server

    $ cd server

    $ python -m venv venv - to create a virtual environment
    $ venv\scripts\activate

    $ pip install -r requirements/local.txt

    - Create .env file in config and put variables for Secret Key and Database (PostgreSQL) as created in sample.env file

    $ python manage.py makemigrations
    $ python manage.py migrate

    $ python manage.py runserver

### Note to the backend devs

    You don't need to start run yarn to check your endpoints.

Server running on <a href='http://localhost:8000'>http://localhost:8000/music</a>

<!-- API root available on <a href='http://localhost:8000/music/api/'>http://localhost:8000/music/api/</a>

Admin root available on <a href='http://localhost:8000/music/admin/'>http://localhost:8000/music/admin/</a> -->
