from dataclasses import dataclass, field


@dataclass
class Song:  # for the songs

    _id: str
    plugin_id: str
    organization_id: str
    collection_name: str
    room_id: str
    title: str
    duration: str
    albumCover: str
    url: str
    time: int
    userId: str
    addedBy: str
    likedBy: list = field(default_factory=list)


@dataclass
class songLikeCount:

    songId: str
    userId: str


@dataclass
class Room:  # for the rooms

    _id: str
    plugin_id: str
    organization_id: str
    collection_name: str
    plugin_name: str
    room_name: str
    description: str
    created_by: str
    is_private: bool = False
    is_archived: bool = False
    memberId: dict = field(default_factory=dict)


@dataclass
class Comment:  # for the comments

    _id: str
    message: str
    time: int
    userId: str
    name: str
    avatar: str


@dataclass
class Emojis:  # for the emojis

    name: str
    emoji: str
    count: int


@dataclass
class Chat:  # for the chats

    _id: str
    plugin_id: str
    organization_id: str
    collection_name: str
    room_id: str
    username: str
    userId: str
    time: int
    imageUrl: str
    emojies: list = field(default_factory=list)
    richUiData: dict = field(default_factory=dict)


@dataclass
class Block:  # for the block

    depth: int
    key: str
    text: str
    type: str
    data: dict = field(default_factory=dict)
    entityRanges: list = field(default_factory=list)
    inlineStyleRanges: list = field(default_factory=list)


@dataclass
class UiData:  # for the uidata

    blocks: list = field(default_factory=list)
    entityMap: dict = field(default_factory=dict)