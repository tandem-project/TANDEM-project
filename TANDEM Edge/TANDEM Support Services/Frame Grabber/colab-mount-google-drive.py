from google.colab import drive
drive.mount('/content/drive/')

# Make a temporary directory in Google colab
!mkdir -p /content/parking-space/Videos/frames >> /dev/null
!mkdir -p /content/parking-space/Videos/frames-all >> /dev/null

#Copy Video stored in Google Drive to COLAB
#!cp /content/drive/My\ Drive/ML-apps/parking-space-monitoring/Videos/*.mp4 parking-space/Videos/

# Copy frames from GoogleDrive to Colab
#!cp /content/drive/MyDrive/ML-apps/parking-space-monitoring/Videos/frames/SmartCity-Cameras/2021-10-13-08_52_46/*.jpg parking-space/Videos/frames-all/
#!cp parking-space/Videos/frames/frame*.jpg /content/drive/MyDrive/ML-apps/parking-space-monitoring/Videos/frames/results01/

#!mkdir -p /content/parking-space/Videos/frames-all
#!ls /content/parking-space/Videos/frames-all/
#!rm /content/parking-space/Videos/frames/*.jpg
#!ls -v /content/drive/MyDrive/ML-apps/parking-space-monitoring/Videos/frames/SmartCity-Cameras/2021-10-13-08_47_40/frame*

# Copy files from Colab to Drive
target_folder = "2021-10-14-09_55_51"
!cp parking-space/Videos/frames/masked*.jpg /content/drive/MyDrive/ML-apps/parking-space-monitoring/Videos/frames/SmartCity-Cameras/{target_folder}/

#!rm /content/parking-space/Videos/frames/*.jpg
