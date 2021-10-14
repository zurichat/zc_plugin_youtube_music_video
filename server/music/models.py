from dataclasses import dataclass, field


@dataclass
class Member:  # for the users

    _id: str
    userId: str
    name: str
    avatar: str
    email: str
    job: str


@dataclass
class Song:  # for the songs

    _id: str
    title: str
    duration: str
    albumCover: str
    url: str
    time: int
    userId: dict = field(default_factory=dict)
    addedBy: dict = field(default_factory=dict)
    likedBy: dict = field(default_factory=dict)


@dataclass
class Room:  # for the rooms

    _id: str
    room_name: str
    description: str
    private: bool = False
    memberId: dict = field(default_factory=dict)


@dataclass
class Comment:  # for the comments

    _id: str
    message: str
    time: int
    userId: dict = field(default_factory=dict)
    name: dict = field(default_factory=dict)
    avatar: dict = field(default_factory=dict)
