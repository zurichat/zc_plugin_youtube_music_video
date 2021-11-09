import schema
from dataStorage import *
from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()


@app.post(
    "/api/v1/org/{org_id}/rooms/{room_id}",
    status_code=status.HTTP_200_OK,
    response_model=schema.Music,
    responses={
        404: {"model": schema.MessageError},
        424: {"model": schema.MessageError},
        302: {"model": schema.MessageError},
    },
)
async def add_member_to_room(
    org_id: str,
    room_id: str,
    room: schema.Music,
):
    room_id = room.room_id
    member_ids = room.memberId
    helper = DataStorage()
    helper.organization_id = org_id
    music_room = helper.read("musicroom", {"_id": room_id})
    if music_room and music_room.get("status_code", None) is None:
        users_id = music_room.get("memberId")
        new_members = list(set(member_ids).difference(set(users_id)))
        list(map(lambda x: users_id.append(x), new_members))
        if new_members:
            response = helper.update("musicroom", room_id, {"memberId": users_id})
            if response.get("status") == 200:
                response_output = {
                    "event": "add_users_to_room",
                    "message": response.get("message"),
                    "data": {
                        "room_id": room.room_id,
                        "new_member_ids": new_members,
                        "action": "user/users added successfully",
                    },
                }
                try:
                    for new_member_id in new_members:
                        music_data = {
                            "room_image": "https://svgshare.com/i/aXm.svg",
                            "room_url": f"/music/{room_id}",
                        }

                        sidebar_data = {
                            "event": "sidebar_update",
                            #                                "plugin_id": settings.PLUGIN_ID,
                            "data": {
                                "name": "Music Plugin",
                                "description": "User joins the music room",
                                "group_name": "Music",
                                "category": "Entertainment",
                                "show_group": True,
                                "button_url": "/music",
                                "public_rooms": [music_data],
                                "joined_rooms": [music_data],
                            },
                        }

                        channel = f"{org_id}_{new_member_id}_sidebar"
                        centrifugo_data = centrifugo_publish(channel, sidebar_data)

                    if centrifugo_data and centrifugo_data.get("status_code") == 200:
                        return response_output
                    else:
                        return JSONResponse(
                            content={
                                "message": "User/users added but centrifugo not available"
                            },
                            status_code=status.HTTP_424_FAILED_DEPENDENCY,
                        )
                except Exception:
                    return JSONResponse(
                        content={"message": "centrifugo server not available"},
                        status_code=status.HTTP_424_FAILED_DEPENDENCY,
                    )
            return JSONResponse(
                content={"message": "User/users not added"},
                status_code=status.HTTP_424_FAILED_DEPENDENCY,
            )
        return JSONResponse(
            content={"message": "Member/members already in room"},
            status_code=status.HTTP_302_FOUND,
        )
    return JSONResponse(
        content={"message": "Data not available on ZC core"},
        status_code=status.HTTP_424_FAILED_DEPENDENCY,
    )
