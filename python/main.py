import psutil
import json
data = {}
pidName = {}

for pid in psutil.pids():
        p = psutil.Process(pid)
        if p.name() == "apache2":
                print("apache is running!")
                data["apache"] = "true"
        if p.name() == "netdata":
                print("netdata is running!")
                data["netdata"] = "true"

print "JSON" + ''.join(data)
with open("/var/www/html/output.json", "w") as outfile:
        json.dump(data, outfile, ensure_ascii = True,
 sort_keys = True, indent = 4, separators=(',', ': '))
