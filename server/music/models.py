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


class Member:
    def __init__(self, _id, name, avatar):
        
        self._id = _id
        self.name = name
        self.avatar = avatar
          

class Room:
    def __init__(self, _id, room_name, description, room_image, type_of_room, room_url, user_id):

        self._id = _id
        self.room_name = room_name 
        self.description = description
        self.room_image = room_image
        self.type_of_room = type_of_room
        self.room_url = room_url
        self.user_id = user_id

        