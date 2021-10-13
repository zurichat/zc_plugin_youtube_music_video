from dataclasses import dataclass, field

@dataclass
class Media:

    media_id: str
    name: str
    url: str


@dataclass
class Member:

    _id: str
    userId: str
    name: str
    avatar: str
    email: str
    job: str


@dataclass
class Song:

    _id: str
    title: str
    duration: str
    albumCover: str
    url: str
    userId: dict = field(default_factory=dict)
    addedBy: dict = field(default_factory=dict)
    likedBy: dict = field(default_factory=dict)
    time: dict = int


@dataclass
class Room:

    _id: str
    room_name: str
    description: str
    private: bool = False
    memberId: dict = field(default_factory=dict)


@dataclass
class Comment:

    _id: str
    message: str
    userId: dict = field(default_factory=dict)
    name: dict = field(default_factory=dict)
    avatar: dict = field(default_factory=dict)
    time: dict = int
