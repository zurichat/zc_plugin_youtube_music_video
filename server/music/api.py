
# class SidebarView(GenericAPIView):
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):

#         org_id = request.GET.get("org", None)
#         user_id = request.GET.get("user", None)
#         room = settings.ROOM_COLLECTION
#         plugin_id = settings.PLUGIN_ID
#         roomid = settings.ROOM_ID
#         token = verify_token

#         pub_room = get_room_info()

#         # subscription_channel: org_id_memberid_sidebar
#         if request.GET.get("org") and request.GET.get("user"):

#             subscription_channel = "{org_id}_{user_id}_sidebar"
#             #sidebar_update = "currentWorkspace_userInfo_sidebar"
#             sidebar_update_payload = {
#                 "event": "sidebar_update",
#                 "plugin_id": "music.zuri.chat",
#                 "data": {
#                     "name": "Music Plugin",
#                     "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
#                     "plugin_id": plugin_id,
#                     "organisation_id": org_id,
#                     "room_id": roomid,
#                     "user_id": user_id,
#                     "category": "entertainment",
#                     "group_name": "music",
#                     "show_group": False,
#                     "button_url": f"/music/{org_id}/{roomid}",
#                     "public_rooms": [pub_room],
#                     # "starred" : [],
#                     "joined_rooms": [pub_room],
                   
    
#                 },
#             }
#             # centrifugo_post(sidebar_update_payload, subscription_channel)
#             # return Response(sidebar_update_payload)

#             url = "https://api.zuri.chat/sidebar?org={org_id}&user={user_id}"

#             # http://127.0.0.1:8000/sidebar?org=61695d8bb2cc8a9af4833d46&user=61695d8bb2cc8a9af4833d47
#             r = requests.get(url)
#             # print(r.status_code)

#             if r.status_code == 200:
#                 # public_url = f"https://api.zuri.chat/data/read/{org_id}/{plugin_id}/{room}/{roomid}"

#                 # r = requests.get(public_url)
#                 publish_to_sidebar(plugin_id, user_id, {"event": "sidebar_update", "data": pub_room})

#                 centrifugo_post(sidebar_update_payload, subscription_channel)
#                 return Response(r)

#             else:
#                 centrifugo_post(sidebar_update_payload, subscription_channel)

#                 return Response(
#                     {
#                         "event": "sidebar_update",
#                         "name": "Music Plugin",
#                         "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
#                         "plugin_id": plugin_id,
#                         "organisation_id": org_id,
#                         "room_id": roomid,
#                         "user_id": user_id,
#                         "group_name": [],
#                         "show_group": False,
#                         "category": "entertainment",
#                         "public_rooms": [pub_room],
#                         "joined_rooms": [pub_room],
                        
#                     }
#                 )
#         else:
#             centrifugo_post(sidebar_update_payload, subscription_channel)

#             return JsonResponse(
#                 {
#                     "name": "Music Plugin",
#                     "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
#                     "plugin_id": plugin_id,
#                     "organisation_id": org_id,
#                     "room_id": roomid,
#                     "user_id": user_id,
#                     "group_name": [],
#                     "show_group": False,
#                     "category": "entertainment",
#                     "public_rooms": [pub_room],
#                     "joined_rooms": [pub_room],
#                 }
#             )

#     def is_valid(param):
#         return param != "" and param is not None



                   