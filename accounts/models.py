from django.db import models


# Song Model to store each song's data
class Songs(models.Model):
    title = models.CharField(max_length=100)
    artiste = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    media_thumbnail = models.URLField()
    media_url = models.URLField()
    likes = models.IntegerField(default=0)
    #lyric = models.TextField()
    #added_by = models.ForeignKey("User", related_name="added_by", on_delete=models.PROTECT)
    time_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("time_added",)

    def __str__(self):
        return f"{self.title} by {self.artiste}"

