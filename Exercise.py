def string_length(mystring):
    if type(mystring) == int:
        return "Sorry, Integer Values Are Not Allowed"
    elif type(mystring) == float:
        return len(string(mystring))
    else:
        return len(mystring)
print(string_length(34.4))
