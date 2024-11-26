import os
import json


script_dir = os.path.dirname(os.path.abspath(__file__))
IPS_PATH = os.path.join(script_dir, "ip-ranges.json")
NGINX_CONF_PATH = os.path.join(script_dir, "..", "nginx", "nginx.conf")

with open(IPS_PATH, "r") as file:
    json_ips = json.load(file)


with open(NGINX_CONF_PATH, "r") as file:
    nginx_conf_lines = file.readlines()


START_INDEX = None
END_INDEX = None


for i, lines in enumerate(nginx_conf_lines):
    if 'AWS_API_GATEWAY_IPS_START' in lines.strip():
        START_INDEX = i
    elif 'AWS_API_GATEWAY_IPS_END' in lines.strip():
        END_INDEX = i


if START_INDEX is not None and END_INDEX is not None:
    del nginx_conf_lines[START_INDEX+1:END_INDEX]

for dict_ip in json_ips["prefixes"]:
    if dict_ip["region"] == "us-east-1" and dict_ip["service"] == "API_GATEWAY":
        nginx_conf_lines.insert(START_INDEX+1,f"        allow {dict_ip['ip_prefix']};\n")


with open(NGINX_CONF_PATH, "w") as file:
    file.writelines(nginx_conf_lines)

