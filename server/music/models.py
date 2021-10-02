from dataclasses import dataclass, field
from django.utils import timezone
from music.utils.data_access import *


@dataclass
class MusicRoom:
    name: str
    created_by: str
    slug: str = ""
    users: dict = field(default_factory=dict)
    description: str = ""
    public: bool = True
    created_on: str = timezone.now().isoformat()

    def create(self):
        payload = {
            "name": self.name.lower(),
            "slug": self.slug,
            "created_by": self.created_by,
            "description": self.description,
            "public": self.public,
            "users": self.users,
            "created_on": self.created_on,
        }
        response = write_data(self.__class__.__name__.lower(), payload)
        return response

    def __str__(self):
        return str(self.name)


class Media:
    def __init__(self, media_id, name, url):
        self.media_id = media_id
        self.name = name
        self.url = url


class Song:
    def __init__(self, title, _id, duration, albumCover, url, userId, addedBy, likedBy, time):
        self._id = _id
        self.title = title
        self.duration = duration
        self.albumCover = albumCover
        self.url = url
        self.userId = userId
        self.addedBy = addedBy
        self.likedBy = likedBy
        self.time = time


class Comment:
    def __init__(self, _id, message, userId, name, avatar, time):
        self._id = _id
        self.message = message
        self.userId = userId
        self.name = name
        self.avatar = avatar
        self.time = time
