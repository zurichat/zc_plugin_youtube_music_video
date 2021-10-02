class Media:
    def __init__(self, media_id, name, url):
        self.media_id = media_id
        self.name = name
        self.url = url


class Song:
    def __init__(self, title, _id, duration, albumcover, url, addedBy, likedBy):

        self._id = _id
        self.title = title
        self.duration = duration
        self.albumcover = albumcover
        self.url = url
        self.addedBy = addedBy
        self.likedBy = likedBy


class Comment:
    def __init__(self, _id, message, user_id, name, avatar, time):

        self._id = _id
        self.message = message
        self.user_id = user_id
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

        