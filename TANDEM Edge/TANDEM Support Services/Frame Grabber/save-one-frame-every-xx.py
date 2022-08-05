# *************************
# DO I HAVE VIDEO OR FRAMES
# *************************
WORKING_WITH_VIDEOS = 0
WORKING_WITH_FRAMES = 1

MAIN_FOLDER = '/content/parking-space'
VIDEOS_FOLDER = MAIN_FOLDER + '/Videos'
OUTPUT_FRAMES_PATH = VIDEOS_FOLDER + '/frames'

FRAME_NAME = 'frame'

# *** IMPORTANT - How Many Frames to Save / Frame-Rate ***
ONE_FRAME_EACH = 24

!(if [ -d {OUTPUT_FRAMES_PATH} ]; then \
echo 'OUTPUT Directory Already EXISTS' && rm -rf {OUTPUT_FRAMES_PATH}/*.png; else \
echo 'OUTPUT Directory is MISSING'; fi)

all_video_files = !ls {VIDEOS_FOLDER}/*.mp4
# Α5 parking-space
#video_file = all_video_files[0]

# A7 parking-space
#video_file = all_video_files[1]

# A7 parking-space (b)
video_file = all_video_files[2]

print('Parking Space Video Found for Analysis ...' + video_file)

if WORKING_WITH_FRAMES == 1:
  # Do Not Run Frame Capture Code !
  print("Already have Frames - Do Not Run Frame Capture !")

  # Crop Image = Obtain ROI
  # -----------------------
  CROP_ROW = 10000
  CROP_COL = 15000

  print( 'Ready to Crop Image --> %d x %d' % (CROP_ROW , CROP_COL) )

  MAIN_FOLDER = '/content/parking-space'
  VIDEOS_FOLDER = MAIN_FOLDER + '/Videos'
  OUTPUT_FRAMES_PATH = VIDEOS_FOLDER + '/frames'

  # Read JPG Frames
  all_frames = !(ls {OUTPUT_FRAMES_PATH}/*.jpg)

  import cv2
  from skimage.color import rgb2gray
  from skimage.transform import resize
  from skimage.util import crop
  import matplotlib.pyplot as plt
  import math
  import time

  counter=0
  for single_frame in all_frames:
    gray = single_frame.replace("frame", "frame_gray")
    #print( gray )

    image = cv2.imread(single_frame)

    # STEP CROP : Extract a ROI
    #image_gray = rgb2gray( image[0:CROP_ROW, 0:CROP_COL] )
    image_gray = rgb2gray( image )

    if image.shape[1] > 640:
        tmp = resize( image_gray, (math.floor(640/image_gray.shape[1]*image_gray.shape[0]), 640), mode='constant')

    plt.imsave("parking-space/Videos/frames/framegray_%d.jpg" %counter, tmp, cmap=plt.cm.gray)
    counter += 1

    # The End of Frames Input
elif WORKING_WITH_VIDEOS is True:
  # Crop Image = Obtain ROI
  # -----------------------
  CROP_ROW = 10000
  CROP_COL = 15000

  print( 'Ready to Read and Crop Image --> %d x %d' % (CROP_ROW , CROP_COL) )

  import cv2
  from skimage.color import rgb2gray
  from skimage.transform import resize
  from skimage.util import crop
  import matplotlib.pyplot as plt
  import math
  import time

  count = 0
  success = True

  videocap = cv2.VideoCapture(video_file)

  start_t = time.time()
  while success:
    if ( count%one_frame_each == 0 ):
      success, image = videocap.read()

      if image is None:
        # Finished reading video - No more frames left
        break

      # STEP CROP : Extract a ROI
      image_gray = rgb2gray( image[0:CROP_ROW, 0:CROP_COL] )

      #image_gray = rgb2gray(image)

      #print( "ORI-Image-Shape = %d x %d" % (image.shape[0] , image.shape[1]) )

      if image.shape[1] > 640:
        tmp = resize(image_gray, (math.floor(640/image_gray.shape[1]*image_gray.shape[0]), 640), mode='constant')


      #print( "TMPimage-Shape-1 = %d" % tmp.shape[1] )

      #roi = tmp.copy()
      #B = crop(roi, ((50, 100), (50, 50), (0,0)), copy=False)


      plt.imsave("%s/%s%d.png" % (OUTPUT_FRAMES_PATH, FRAME_NAME, count), tmp, cmap=plt.cm.gray)
      #plt.imsave("%s/%s%d.png" % (OUTPUT_FRAMES_PATH, FRAME_NAME, count), roi, cmap=plt.cm.gray)

      print('*', end='')
    else:
      success, image = videocap.read()

    count += 1
  end_t = time.time()

  elapsed_time = end_t - start_t

  # Print Performance Statistics of Frames Extraction Procedure
  #  How Many && How Long
  num_frames = !(ls -l {OUTPUT_FRAMES_PATH}/*.png | wc -l)
  print("\nNumber of Frames Extracted (frameXXX.PNG) == " + num_frames[0] + '\n*** Elapsed Time = ' + str(elapsed_time) + ' (msecs) ***')
