from django.http import JsonResponse, HttpResponse
from django.views import View
from django.shortcuts import render


class PluginInfo(View):

    def get(self, request):
        data = {
            "plugin_name": "Youtube Music Video Plugin",
            "description": "This is a plugin that allows individuals in an organization to add music and video links from YouTube. These links are added to a shared playlist so that anyone in that organization can listen to or watch any of the shared videos or songs.",
            "plugin_structure": "Monolith",
            "team name": "Team Pythagoras",
            "plugin_url": "music.zuri.chat",
            "information_url": "music.zuri.chat/info",
            "sidebar_url": "music.zuri.chat/sidebar",
        }
        return JsonResponse(data)



def test_report(req):

    return render(req,"report/index.html")