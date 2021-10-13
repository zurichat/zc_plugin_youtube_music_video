class Media:
    def __init__(self, media_id, name, url):
        self.media_id = media_id
        self.name = name
        self.url = url


class Member:
    def __init__(self, _id, userId, name, avatar, email, job):

        self._id = _id
        self.userId = userId
        self.name = name
        self.avatar = avatar
        self.email = email
        self.job = job


class Song:
    def __init__(
        self, title, _id, duration, albumCover, url, userId, addedBy, likedBy, time
    ):

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


class Room:
    def __init__(
        self, _id, room_name, description, room_image, private, room_url, memberId
    ):

        self._id = _id
        self.room_name = room_name
        self.description = description
        self.room_image = room_image
        self.private = private
        self.room_url = room_url
        self.memberId = memberId
