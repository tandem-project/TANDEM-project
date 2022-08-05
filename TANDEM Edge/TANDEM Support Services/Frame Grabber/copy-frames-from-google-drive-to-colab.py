import time

# START
start = time.time()

#2021-10-14-09_55_51
#2021-10-13-09_54_30
#2021-10-12-17_51_18
#2021-10-19-13_38_34

# *** Rainy Day ***
# *****************
#2021-10-14-09_18_39
#2021-10-14-09_55_51

# *** Departure ***
#2021-10-19-16_41_36
#2021-10-19-16_46_42
#2021-10-19-16_52_10
#2021-10-19-16_57_15
#2021-10-19-17_02_20
#2021-10-19-17_07_26
#2021-10-19-17_12_31
#2021-10-19-17_17_36
#2021-10-19-17_22_42
#2021-10-19-17_32_43
#2021-10-19-17_37_48

#2021-10-19-17_58_10
#2021-10-19-18_03_40

#2021-10-19-18_14_14
#2021-10-19-18_19_18
#2021-10-19-18_29_33
#2021-10-19-18_34_42
#2021-10-19-18_34_42
#2021-10-19-19_25_51

many_periods = [
                "2021-10-14-09_55_51",
             ]

DEST_FOLDER = "/content/parking-space/Videos/frames"

XX = 1     # Want to Copy all --> XX = 1

counter_my = 0

# Many X-minutes Time Frames
for nice_date in many_periods:

  too_many_frames = !ls -v /content/drive/MyDrive/ML-apps/parking-space-monitoring/Videos/frames/SmartCity-Cameras/{nice_date}/*.jpg
  #too_many_frames = !ls -v /content/drive/MyDrive/ML-apps/parking-space-monitoring/Videos/frames/{nice_date}/*.jpg
  print( "In Time Period ... %s ... = %d Frames " % (nice_date, len(too_many_frames) ))

  # *******************************************
  # ... How Many Frames to Copy ... Every XX
  # *******************************************
  counter = 0
  for single_frame in too_many_frames:
    #print( single_frame )

    if counter % XX == 0:
      # Save frame in Colab
      !cp {single_frame} {DEST_FOLDER}/frame{counter_my}.jpg
      counter_my += 1

    counter += 1

# How many files in FRAMES folder
num_frames = !ls -l {DEST_FOLDER}/*.jpg | wc -l
num_frames_str = str( num_frames )

print("Frames Ready for ML Processing = %s" % num_frames_str )

# FINISHED
end = time.time()
print( "Elapsed Time = %f" % (end-start) )
