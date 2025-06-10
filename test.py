import sys
import requests


filename = input("filename=")
line = "http://localhost:3000"
output = open(filename,"w")
sys.stdout = output
print(line)
print()


print("testing getting the about")
print("-------------------------")
try:
    text = ""
    #getting details of team manager
    url = line + "/api/about/"
    data = requests.get(url)
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
    print("data.text="+data.text)
    print(data.json())
except Exception as e:
    print("problem")
    print(e)
print("")

print()
print("testing getting the report - 1")
print("------------------------------")
try:
    text = ""
    #getting the report
    url = line + "/api/report/?id=123123&year=2025&month=6"
    data = requests.get(url)
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
    print("data.text="+data.text)
    print(text)
except Exception as e:
    print("problem")
    print(e)
print("")


print()
print("testing adding cost item without date")
print("----------------------------------")
try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url,
                         json={'userid':123123, 'description':'milk 9','category':'food','sum':8})
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)
print("")

print()
print("testing adding cost item with date")
print("----------------------------------")
try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url,
                         json={'userid':123123, 'description':'shoes','category':'sport','sum':100,'date': '2025-06-15T10:00:00.000Z'})
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)
print("")

print()
print("testing trying adding cost item without description")
print("----------------------------------")
try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url,
                         json={'userid':123123,'category':'sport','sum':100})
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)
print("")

print()
print("testing trying adding cost item without category")
print("----------------------------------")
try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url,
                         json={'userid':123123, 'description':'shoes','sum':100})
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)
print("")

print()
print("testing adding cost item without sum")
print("----------------------------------")
try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url,
                         json={'userid':123123, 'description':'milk 9','category':'food'})
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)
print("")


print()
print("testing adding cost item without userid")
print("----------------------------------")
try:
    text = ""
    url = line + "/api/add/"
    data = requests.post(url,
                         json={'description':'milk 9','category':'food','sum':8})
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
except Exception as e:
    print("problem")
    print(e)
print("")



print()
print("testing getting the report - 2")
print("------------------------------")
try:
    text = ""
    #getting the report
    url = line + "/api/report/?id=123123&year=2025&month=6"
    data = requests.get(url)
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
    print("data.text="+data.text)
    print(text)
except Exception as e:
    print("problem")
    print(e)
print("")


print()
print("testing getting the user id")
print("------------------------------")
try:
    text = ""
    #getting the report
    url = line + "/api/users/123123"
    data = requests.get(url)
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
    print("data.text="+data.text)
    print(text)
except Exception as e:
    print("problem")
    print(e)
print("")


print()
print("testing a user number that is not in the database")
print("------------------------------")
try:
    text = ""
    #getting the report
    url = line + "/api/users/123"
    data = requests.get(url)
    print("url="+url)
    print("data.status_code="+str(data.status_code))
    print(data.content)
    print("data.text="+data.text)
    print(text)
except Exception as e:
    print("problem")
    print(e)
print("")
