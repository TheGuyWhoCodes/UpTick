import psutil

for pid in psutil.pids():
	p = psutil.Process(pid)
	if p.name() == "apache2":
		print("it's runnnig")
