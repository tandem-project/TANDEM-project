import requests
from login import login
import argparse

def core_paas(core_paas):

	url = f"http://piedgecontroller.pi-edge-system:8080/piedge-connector/2.0.0/deployedPaas/{core_paas}"

	token = login()


	payload = ""
	headers = {
	'Authorization': f'Bearer {token}'
	}

	response = requests.request("GET", url, headers=headers, data=payload)
	
	# check if empty array
	if not response.json():
		while True:
			pass
	
parser = argparse.ArgumentParser(description='command line arguments for core paas.')

parser.add_argument('--core_paas', type=str)
args = parser.parse_args()

if __name__ == '__main__':
	core_paas(args.core_paas)
