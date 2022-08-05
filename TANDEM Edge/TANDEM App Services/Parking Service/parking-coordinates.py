HOST_FOLDER = '/content/drive/MyDrive/ML-apps/parking-space-monitoring/'
MAIN_FOLDER = '/content/parking-space'

FILE_EXTENSION ='csv'
#COORDS_FILE = 'intracom-a7.' + FILE_EXTENSION
#COORDS_FILE = 'intracom-a7_b.' + FILE_EXTENSION
COORDS_FILE = 'parking-slots-coords-A5.' + FILE_EXTENSION

# Copy COORDS file from GoogleDrive to LocalColab
# -----------------------------------------------
!cp {HOST_FOLDER}'/'{COORDS_FILE} {MAIN_FOLDER}

LOCAL_COORDS_FILE = "%s/%s" % (MAIN_FOLDER, COORDS_FILE)
#print( 'Local Parking-Space Coordinates File --> ' + LOCAL_COORDS_FILE )
!ls -l {LOCAL_COORDS_FILE}

import cv2
import csv
print(csv.__version__)

from google.colab.patches import cv2_imshow

MAIN_FOLDER = '/content/parking-space'
VIDEOS_FOLDER = MAIN_FOLDER + '/Videos'
#OUTPUT_FRAMES_PATH = VIDEOS_FOLDER + '/frames-all'
OUTPUT_FRAMES_PATH = VIDEOS_FOLDER + '/frames'

# Read Initial Image
#all_frames = !(ls {OUTPUT_FRAMES_PATH}/*.png)
all_frames = !(ls {OUTPUT_FRAMES_PATH}/*.jpg)

frame = all_frames[0]
img = cv2.imread(frame)

_radius = 2

all_parking_slots = []

with open( LOCAL_COORDS_FILE, 'r' ) as stream:
  csv_reader = csv.reader(stream, delimiter=',')
  line_count = 0

  for row in csv_reader:
    if line_count == 0:
      #print('Column names are: {' + " , ".join(row) )
      line_count += 1
    else:
      park_row = row[0]
      #print(park_row)

      slot = row[1]

      corner_01 = row[2]
      if 'None' not in corner_01:
        c01 = corner_01.split('-')
        corner_01_x = int( c01[0] )
        corner_01_y = int( c01[1] )

        if park_row == '99':
          image = cv2.circle(img, (corner_01_x, corner_01_y), radius=4, color=(255, 0, 0), thickness=-1)
        if park_row == '06':
          image = cv2.circle(img, (corner_01_x, corner_01_y), radius=4, color=(0, 255, 0), thickness=-1)
        if park_row == '05':
          image = cv2.circle(img, (corner_01_x, corner_01_y), radius=4, color=(0, 0, 255), thickness=-1)
        if park_row == '00':
          image = cv2.circle(img, (corner_01_x, corner_01_y), radius=4, color=(125, 125, 0), thickness=-1)
        else:
          image = cv2.circle(img, (corner_01_x, corner_01_y), radius=_radius, color=(255,255, 10), thickness=-1)

      corner_02 = row[3]
      if 'None' not in corner_02:
        c02 = corner_02.split('-')
        corner_02_x = int( c02[0] )
        corner_02_y = int( c02[1] )
        if park_row == '99':
          image = cv2.circle(img, (corner_02_x, corner_02_y), radius=4, color=(255, 0, 0), thickness=-1)
        if park_row == '06':
          image = cv2.circle(img, (corner_02_x, corner_02_y), radius=4, color=(0, 255, 0), thickness=-1)
        if park_row == '05':
          image = cv2.circle(img, (corner_02_x, corner_02_y), radius=4, color=(0, 0, 255), thickness=-1)
        if park_row == '00':
          image = cv2.circle(img, (corner_02_x, corner_02_y), radius=4, color=(125, 125, 0), thickness=-1)
        else:
          image = cv2.circle(img, (corner_02_x, corner_02_y), radius=_radius, color=(255,255, 10), thickness=-1)

      corner_03 = row[4]
      if 'None' not in corner_03:
        c03 = corner_03.split('-')
        corner_03_x = int( c03[0] )
        corner_03_y = int( c03[1] )
        if park_row == '99':
          image = cv2.circle(img, (corner_03_x, corner_03_y), radius=4, color=(255, 0, 0), thickness=-1)
        if park_row == '06':
          image = cv2.circle(img, (corner_03_x, corner_03_y), radius=4, color=(0, 255, 0), thickness=-1)
        if park_row == '05':
          image = cv2.circle(img, (corner_03_x, corner_03_y), radius=4, color=(0, 0, 255), thickness=-1)
        if park_row == '00':
          image = cv2.circle(img, (corner_03_x, corner_03_y), radius=4, color=(125, 125, 0), thickness=-1)
        else:
          image = cv2.circle(img, (corner_03_x, corner_03_y), radius=_radius, color=(255,255, 10), thickness=-1)

      corner_04 = row[5]
      if 'None' not in corner_04:
        c04 = corner_04.split('-')
        corner_04_x = int( c04[0] )
        corner_04_y = int( c04[1] )
        if park_row == '99':
          image = cv2.circle(img, (corner_04_x, corner_04_y), radius=4, color=(255, 0, 0), thickness=-1)
        if park_row == '06':
          image = cv2.circle(img, (corner_04_x, corner_04_y), radius=4, color=(0, 255, 0), thickness=-1)
        if park_row == '05':
          image = cv2.circle(img, (corner_04_x, corner_04_y), radius=4, color=(0, 0, 255), thickness=-1)
        if park_row == '00':
          image = cv2.circle(img, (corner_04_x, corner_04_y), radius=4, color=(125, 125, 0), thickness=-1)
        else:
          image = cv2.circle(img, (corner_04_x, corner_04_y), radius=_radius, color=(255,255, 10), thickness=-1)

      #print("Slot=%d , Corner-01=(%d / %d), Corner-02=%s, Corner-03=%s" % (int(slot), corner_01_x, corner_01_y, corner_02, corner_03))

      #image = cv2.circle(img, (114, 162), radius=6, color=(255,255, 10), thickness=-1)
      #image = cv2.circle(img, (114, 162), radius=6, color=(255,255, 10), thickness=-1)

      all_parking_slots.append( [park_row, slot, corner_01, corner_02, corner_03, corner_04] )

      line_count += 1

  cv2_imshow( image )
