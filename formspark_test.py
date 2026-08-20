import urllib.request, urllib.parse
url="https://submit-form.com/x3S9Ik1SZ"
data=urllib.parse.urlencode({"name":"Test","email":"test@example.com","phone":"123456","service":"Residential","message":"Hello"}).encode("utf-8")
req=urllib.request.Request(url, data=data, method="POST")
req.add_header("Content-Type", "application/x-www-form-urlencoded")
try:
    resp=urllib.request.urlopen(req, timeout=15)
    print("STATUS", resp.status)
    print(resp.read().decode("utf-8", errors="replace"))
except Exception as e:
    print("ERROR", repr(e))

