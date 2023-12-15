import os, shutil, tarfile

name = str(os.getenv('name'))

weights = name +'.pt'
weights_zip = name+'.zip'

token = 'my-private-token'
project_id = '77'
url = f"https://colab-repo.intracom-telecom.com/api/v4/projects/77/repository/archive/?path=obj_detection_trained_models/{name}.pt"
# a = os.system(f'curl --output {weights_zip} --header "PRIVATE-TOKEN: {token}" --header "User-Agent: Firefox/58.0" --noproxy "*" "{url}"')
a = os.system(f'curl --output {weights_zip} --header "PRIVATE-TOKEN: {token}" --header "User-Agent: Firefox/58.0" "{url}"')

file_obj = tarfile.open(weights_zip,"r")
extracted_dir = 'temp'
file = file_obj.extractall(extracted_dir)

for dirpath, dirnames, filenames in os.walk(extracted_dir):
    for filename in [f for f in filenames if f.endswith(".pt")]:
        path = os.path.join(dirpath,filename)
        os.rename(path,'./'+filename)
        os.remove('./'+weights_zip)
        shutil.rmtree('./'+extracted_dir)
