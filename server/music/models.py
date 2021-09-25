class Media:
    def __init__(self, media_id, name, url):
        self.media_id = media_id
        self.name = name
        self.url = url


class RoomUser:
    def __init__(self, _ids, name, avatar):
    
        self._ids = _ids
        self.name = name
        self.avatar = avatar


class Room:
    def __init__(self, _ids, room_name, description, type, members):

        self._ids = _ids
        self.room_name = room_name
        self.description = description
        self.type = type
        self.members = members

       
