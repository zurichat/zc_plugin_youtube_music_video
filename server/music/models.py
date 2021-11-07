from dataclasses import dataclass, field


@dataclass
class Song:  # for the songs

    _id: str
    title: str
    duration: str
    albumCover: str
    url: str
    time: int
    userId: str
    addedBy: str
    likedBy: dict = field(default_factory=dict)


@dataclass
class songLikeCount:

    songId: str
    userId: str


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
    userId: str
    name: str
    avatar: str
