
import psutil
import json
data = {}
programsChecking = {"apache2", "netdata", "htop"}
for pid in psutil.pids():
        p = psutil.Process(pid)
        for p.name in programsChecking:
            data[p.name] = "true"

print "JSON" + " " + ''.join(data)
with open("/var/www/html/outfile.json", "w") as outfile:
        json.dump(data, outfile, ensure_ascii = True,
 sort_keys = True, indent = 4, separators=(',', ': '))
