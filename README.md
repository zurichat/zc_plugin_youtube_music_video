# YouTube Music-Video Plugin

> ## Table of contents

- [Overview](#overview)
- [Project Features](#project-features)
- [Technologies](#technologies)
- [Repo Setup](#repo-setup)
- [Setting up the project](#setting-up-the-project)
  - [Frontend](#frontend)
    - [Build the client](#build-the-client)
    - [Build the single-spa root](#build-the-single-spa-root)
    - [Start the client](#start-the-client)
    - [Start the single-spa root](#start-the-single-spa-root)
    - [Lint the Frontend](#lint-the-frontend)
    - [Running Tests and generating test coverage report](#running-tests-and-generating-test-coverage-report)
  - [Backend](#backend)
    - [Run the Django Server](#run-the-django-server)
    - [Pre-commit and lint the Backend](#pre-commit-and-lint-the-backend)
- [Links to the project](#links-to-the-project)
- [Status](#status)
- [Contributing to the project](#contributing-to-the-project)

#

> ## Overview

<p align="justify">
ZuriChat is an open source workspace app that provides the opportunity for people to network, collaborate, educate and learn remotely. It allows people to take their classroom everywhere, make learning fun, stay engaged and inspired with the virtual lounge and games.

One of its unique features are the variety of plugins designed to add functionalities such as tracking company expenses, sending information fast and smoothly, managing files and integrating tools all with ZuriChat.

This project is focused on the ZuriChat music plugin.

</p>

![site image](https://drive.google.com/uc?export=view&id=1OinCY56dOGcG6DvliWAhznSj4d7gA4_H)

#

> ## Project Features
>
The YouTube music plugin allows the users in the organization to add and play Youtube links.You can also chat in real time with other members of the organization.

- Add and Play Youtube music and videos.

- Chat in realtime in the music room.

- Song search and filter options.

- Like and unlike songs.

</p>

#

> ## Technologies

<p align="justify">
*Note: This project was setup and developed on a system running Windows 10. The stacks used for the project include:
</p>

| <b><u>Stack</u></b>          | <b><u>Usage</u></b>   |
| :--------------------------- | :-------------------- |
| **`Python 3.9`**             | Programming language. |
| **`React JS`**               | Frontend              |
| **`MongoDB`**                | External Database     |
| **` Django Rest framework`** | APIs.                 |

#

> ## Repo Setup

<p align="justify">
To setup the repo, first fork the Zurichat YouTube Music, then clone the forked repository to create a copy on the local machine.
</p>

    $ git clone git@github.com:pauline-banye/music_video.git

<p align="justify">
Change directory to the cloned repo and set the original Zurichat repository as the "upstream" and your forked repository as the "origin" using gitbash.
</p>

    $ git remote add upstream git@github.com:zurichat/zc_plugin_youtube_music_video.git

#

> ## Setting up the project

<p align="justify">
The first step requires the download and installation of Python 3.9 and a check to confirm that pip and the necessary dependencies are properly installed.
</p>

<p align="justify">
After the installation of the Python program, setup the project environment with pip and virtualenv in the command prompt, powershell or gitbash terminal. Virtualenv helps to create an isolated Python environment containing all the packages necessary for the project.
</p>

\*Note:

- This project was setup using the gitbash terminal. Some of the commands used do not work with command prompt or powershell.

* If a "pip command not found error" is encountered, download get-pip.py and run `phython get-pip.py` to install it.

###

    $ pip install virtualenv

Navigate to the cloned local project folder. Create a virtual environment folder and activate the environment by running the following commands in the gitbash terminal.

###

    $ python -m venv venv
    $ source venv/scripts/activate

<p align="justify">
Once the virtual environment is active, the next step is the Django installation. Django is an open source Python web application framework thats helps with the rapid development of secure websites.
</p>

###

    $ (venv) pip install django

<p align="justify">
After installing Django, install Django REST framework in the gitbash terminal. The Django REST framework is a flexible toolkit for building Web based APIs. The REST framework was used for the creation of APIs, serialization and the authentication process for this project.
</p>

###

    $ (venv) pip install djangorestframework

Install all the necessary dependencies for the project. A few of them are listed below.

| <b><u>Modules</u></b>     | <b><u>Usage</u></b>           |
| :------------------------ | :---------------------------- |
| **`django-cors-headers`** | Cross Origin Resource Sharing |
| **`gunicorn`**            | WSGI HTTP server              |
| **`whitenoise`**          | Static files                  |
| **`Markdown`**            | Markup language               |
| **`django-environ`**      | Environment configuration     |

An exhaustive list can be found in the requirements.txt file included in this project. The modules can be 'batch installed' using the `pip install -r requirements.txt` command.

### Frontend

- #### Build the client

      $ cd server/client
      $ yarn
      $ yarn build

- #### Build the single-spa root

      $ cd root
      $ yarn
      $ yarn build

- #### Start the client

      $ cd server/client
      $ yarn
      $ yarn start

- #### Start the single-spa root

      $ cd root
      $ yarn
      $ yarn start

      - Frontend devs: You don't need to start django server. Only start the client and single-spa root to view your edits.

- #### Lint the Frontend

      - cd into the frontend folder (server/client)

      $ yarn lint --fix (or yarn lint --fix . to fix all files)

- #### Running Tests and generating test coverage report

      - cd into the frontend folder (server/client)

      $ yarn test

      - To view coverage report : inside test-coverage/icov-report there's an
      index.html file, open this file in a browser to view coverage report.

#

### Backend

- #### Run the Django Server

      $ cd server

      - Create .env file in config and specify variables for Secret Key and system environment using the sample.env file

      $ python manage.py runserver

- #### Pre-commit and lint the Backend

      $ cd server
      $ pre-commit run (or pre-commit run --all-files to check all files)

      - Backend devs: You don't need to run yarn start to test your endpoints.

#

### Note to the DevOps

- Build first before starting django server

#

> ## Links to the project
>
 Local server: <a href='<http://localhost:22672/music>'>http://localhost:22672/music</a>

Zurichat Staging site: <a href='<http://staging.zuri.chat/music>'>http://staging.zuri.chat/music</a>

Zurichat main site: <a href='<http://zuri.chat/music>'>http://zuri.chat/music</a>

Live site: <a href='<http://music.zuri.chat/music>'>http://music.zuri.chat/music</a>

#

> ## Status
>
This project is a work in progress and is currently under development.

#

> ## Contributing to the project

If you find something worth contributing, please fork the repo, make a pull request and add valid and well-reasoned explanations about your changes or comments.

Before adding a pull request, please note:

- It should be inviting and clear.
- Any additions should be relevant.
- It should be easy to contribute to.
- Urls marked **\*** are temporarily unavailable. Don't delete it without confirming that it has permanently expired.

This repository is not meant to contain everything. Only good quality verified information.

All **`suggestions`** are welcome!

> ###### Readme created by Pauline Banye
