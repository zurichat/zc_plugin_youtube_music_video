> # Zc_plugin_youtube_music_video

> ## Table of contents
* [Project Overview](#project-overview)
* [Target Audience](#target-audience)
* [Goals of the project](#goals-of-the-project)
* [Project Features](#project-features)
* [Technologies for Backend](#technologies-for-backend)
* [Backend Team To-do list](#backend-team-to-do-list)
* [Backend Repo Setup](#backend-repo-setup)
* [Setting up the project](#setup)
* [Backend Deliverables](#backend-deliverables)
* [Status](#status)
* [Contributing to the project](#contributing-to-the-project)
* [HNGI Contributors](#pjt-56-contributors)
* [Contact](#contact)
#
>## Project Overview
<p align="justify">
Zuri Chat Plugin Music Video is a plugin for Zuri Chat(a slack clone) that enables users to majorly listen to music and watch videos in a music room or channel.The music room can serve as a get away room for all users on Zuri Chat. T
</p> 


<p align="justify">

## Project Features
Below are some wow features in the music room:-
1. Create/Delete a Playlist
2. Make Playlist public for all Zuri chat users
3. Rate a playlist
4. Add songs to liked songs
5. Add songs and videos to a general library
6. See the most rated playlist by users.
7. Skip/repeat/shuffle/pause
8. Add songs and videos to favorite playlist
9. Share a playlist
</p> 

<p align="justify">
The backend for this project is hosted on 
</p>

#
> ## Target Audience
Zuri Chat targets everyone that needs a platform for team collaboration to solve problems faster, streamline communication and drive innovation with custom integrations
Zuri Chat Plugin Music Video target's every Zuri Chat user #
> ## Goals of the project
- To provide music as a means of entertainment for our users 
- Allow users to listen to music without having to leave the Zuri chat environment.
- To create a seamless and effective music room solution
- To create a new and relaxing feature for collaborative tools
#
> ## Technologies

<p align="justify">
*Note: This project was setup and developed on a system running Windows 10. The stacks used for the project backend include:
</p>


| <b><u>Stack</u></b> | <b><u>Usage</u></b> |
| :---         | :---         |
| **`Python 3.9`** | Programming language. |
| **`Django`** | General backend |
| **`DBML`** | Datamodels |
| **` Django Rest framework`** | APIs. |
| **`Django Rest Auth`** | Authentication. |
| **`Mongodb`** | Database. |


#
> ## Backend Team To-do list

- Create the data models.

- API Setup.

- Database and repo setup.

- User testing.

- Authentication controls.

- Documentation of the backend process.

- Troubleshoot and debug the project.


#
> ## Backend Repo Setup

<p align="justify">
To setup the repo, first fork and clone the zc_plugin_youtube_music_video repository to create a copy on the local machine.
</p>

```bash
# git clone https://github.com/zurichat/zc_plugin_youtube_music_video.git
```
<p align="justify">
Change directory to the cloned repo and set the original zc_plugin_youtube_music_video repository as the "upstream" and the forked  zc_plugin_youtube_music_video repository as the "origin" using gitbash.
</p>

```bash
# git remote add upstream git@github.com:zurichat/ zc_plugin_youtube_music_video
```
Edit the readme.md file, add it to git to track changes and create the first commit.

```bash
$ git commit -m "updated readme.md"
[main a4c9702] updated readme.md
1 file changed, 197 insertions(+), 2 deletions(-)
rewrite README.md (100%)
```


Using `git push origin main`, push the commit to the remote origin repository (the forked Zuriteam  zc_plugin_youtube_music_video). 

Finally, initiate a pull request to push the edits to the upstream repository. 

#
> ## Setting up the project
<p align="justify">
The first step requires the download and installation of Python 3.9 and a check to confirm that pip and the necessary dependencies are properly installed.
</p>

<p align="justify">
After the installation of the Python program, setup the project environment with pip and virtualenv in the command prompt, powershell or gitbash terminal. Virtualenv helps to create an isolated Python environment containing all the packages necessary for the project.
</p>

*Note: 
- This project was setup using the gitbash terminal. Some of the commands used do not work with command prompt or powershell.
- If a "pip command not found error" is encountered, download get-pip.py and run `python get-pip.py` to install it. 

```bash
# pip install virtualenv
```

Navigate to the cloned local school-scout-be-pjt-56 project folder and run `virtualenv folder-name` to create a virtual environment folder.

Activate the environment by running the following command in the gitbash terminal.


```bash
# source folder-name/scripts/activate
```

<p align="justify">
Once the virtual environment is active, the next step is the Django installation. Django is an open source Python web application framework thats helps with the rapid development of secure websites.
</p>

```bash
# (venv) pip install django
```
<p align="justify">
After installing Django, install Django REST framework in the gitbash terminal. The Django REST framework is a flexible toolkit for building Web based APIs. The REST framework was used for the creation of APIs, serialization and the authentication process for this project.
</p>
 
```bash
# (venv) pip install djangorestframework
```
Install all the necessary dependencies for the project. A few of them are listed below.

| <b><u>Modules</u></b> | <b><u>Usage</u></b> |
| :---         | :---         |
| **`django-cors-headers`** | Cross Origin Resource Sharing |
| **`gunicorn`** | WSGI HTTP server |
| **`psycopg2`** | PostgreSQL database adapter |
| **`requests-oauthlib`** | Authentication support for requests |
| **`whitenoise`** | Static files |
| **`chardet`** | Encoding detector |
| **`Markdown`** | Markup language |
| **`django-environ`** | Environment configuration |


An exhaustive list can be found in the requirements.txt file included in this project. The modules can be 'batch installed' using the  `pip install -r requirements.txt` command.


> ## Status
This project is in progress. 

#
> ## Contributing to the project

If you find something worth contributing, please fork the repo, make a pull request and add valid and well-reasoned explanations about your changes or comments.

Please note:

- `It should be inviting and clear.`

- `Any additions should be relevant.`

- `It should be easy to contribute to.`

Urls marked **\*** are temporarily unavailable. Don't delete it without confirming that it has permanently expired.

Before adding a pull request, please remember:

```bash
This repository is not meant to contain everything. Only good quality verified information.
```

All **`suggestions`** are welcome!

#
> ## HNGI8 Contributors

This project exists thanks to all the Pythagoras team members who contributed to making this a success.
#
> Readme created by Kehinde-Osems Omotolani

