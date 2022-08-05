#!rm parking-space/Videos/frames-all/masked*.png
#!rm parking-space/Videos/frames/masked*.jpg

import cv2
from skimage.color import rgb2gray
from skimage.transform import resize
from skimage.util import crop
import matplotlib.pyplot as plt
import math
import time

OUTPUT_FRAMES_PATH = 'parking-space/Videos/frames-all'
FRAME_NAME = 'frame'
count = 0
success = True

videocap = cv2.VideoCapture(video_file)

one_frame_each = 2

start_t = time.time()
while success:
  if ( count%one_frame_each == 0 ):
    success, image = videocap.read()

    if image is None:
      # Finished reading video - No more frames left
      break

    image_gray = rgb2gray( image )

    if image.shape[1] > 640:
      tmp = resize(image_gray, (math.floor(640/image_gray.shape[1]*image_gray.shape[0]), 640), mode='constant')

    plt.imsave("%s/%s%d.png" % (OUTPUT_FRAMES_PATH, FRAME_NAME, count), tmp, cmap=plt.cm.gray)
    print( 'Finished saving frame-%d' % count )
  else:
    success, image = videocap.read()

  count += 1

end_t = time.time()

elapsed_time = end_t - start_t

# Print Performance Statistics of Frames Extraction Procedure
#  How Many && How Long
num_frames = !(ls -l {OUTPUT_FRAMES_PATH}/*.png | wc -l)
print("\nNumber of Frames Extracted (frameXXX.PNG) == " + num_frames[0] + '\n*** Elapsed Time = ' + str(elapsed_time) + ' (msecs) ***')
