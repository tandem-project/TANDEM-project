from os import getcwd, chdir, listdir, walk, path, remove, rmdir

import time
from datetime import datetime

from create_classification_model import create_classification_model, deep_core

DELETE_PROCESSED_FRAMES = True
PREVIOUS_FRAME = ""

TIME_DIFF_SECS  = 2
TIME_DIFF_LARGE = 1200

##########################################################
#### Check that Folder with Unprocessed Frames Exists ####
##########################################################
def check_folder_exists():
    print(f"Current Working Directory --> {getcwd()}")

    try:
        chdir("../frames")
    except OSError as e:
        print("Failed to Enter FRAMES folder")

    print(f"Inside Unprocessed Frames Folder --> {getcwd()}")

################################################################################################
#### Read Folders List : Frames are Extracted into Multiple Folders based on Creation Time  ####
################################################################################################
def list_folders():
    #print(f"Inside List Frames --> {getcwd()}")
    
    frames_0 = listdir( getcwd() )
    #frames_1 = [x for x in frames_0]
    frames_1 = frames_0[:]
    #frames_1.sort(reverse=True)
    frames_1.sort(reverse=False)
    
    #print(f"Folders Inside Frames Parent Directory ... {[x for x in frames_1]}")
    print(f"Get First 3 Items from List ... {frames_1[:3]}")

    return frames_1[:]#3]

#####################################################################
#### Delete Video Safety Frame After Object Detection Processing ####
#####################################################################
def delete_processed_frameX(f):
    print(f"Ready to Delete Frame {f}")

    remove(f)
    
    return

##############################################################
#### Start Reading Frames for Object-Detection Processing #### 
##############################################################
def list_frames_inside_folder( folders_all ):
    global PREVIOUS_FRAME
    global TIME_DIFF_MSECS
    global TIME_DIFF_LARGE

    # CREATE CLASSIFICATION MODEL 
    create_classification_model()
    
    #old_frame = ""
    for f in folders_all:
        if path.isfile( f ):
            print(f"Found a File inside FRAMES Folder ... {f}")
            continue

        if f == "masked":
            print("Do Not Delete Files Inside MASKED Folder !")
            continue
            
        print( f"***** Ready to Handle Frames Inside Folder ... {f} *****" )

        space_walk = walk(f)
         
        #old_frame = ""
        for x in space_walk:
            
            dirpath = x[0]
            dirnames = x[1]

            filenames = x[2]
            #print(f"Before Sorting >> {filenames}")
            filenames.sort()
            #print(f"After Sorting  >> {filenames}")

            print( f"Number of Frames Found ... {len(filenames)}" )
            if ( len(filenames) == 0 ):
                # Empty folder - Delete the folder
                #rmdir(dirpath)
                print(f"Empty Directory Successfully Deleted ... {dirpath}")

            for n in filenames:#[-3:]:
                print( f" --> Old Frame = {PREVIOUS_FRAME} VS {n}")

                # Object-Detection in Frame-NN ... Masked-Frame is Stored && Detected Objects Labels are Published into a MQ 
                fullfilename = path.abspath( dirpath + "/" + n)
                #print(f"Ready to Process Frame ... {fullfilename}") 

                time_n  = n.split("_", 1)[1]
                time_n1 = time_n.rsplit(".", 1)[0]
                time_n2 = datetime.strptime(time_n1, "%Y-%m-%d_%H-%M-%S")
                
                """now00 = datetime.now()
                diff_n2_00 = int((time_n2-now00).total_seconds())

                print(f"Get NEW time from name = {time_n2} / NOW = {now00} / Difference = {diff_n2_00}")

                if (diff_n2_00 < 0) and (abs(diff_n2_00) > 300):
                    # 5 MINUTE Old frame
                    print(f">>>> Old frame will be deleted ... {n}")

                    delete_processed_frameX( fullfilename )
                  
                    continue"""
                
                if PREVIOUS_FRAME != "":
                    time_p  = PREVIOUS_FRAME.split("_", 1)[1]
                    time_p1 = time_p.rsplit(".", 1)[0]
                    time_p2 = datetime.strptime(time_p1, "%Y-%m-%d_%H-%M-%S")

                    #print(f"Get PREVIOUS time from name = {time_p2}")
                
                    if (time_n2 > time_p2):
                        td     = time_n2 - time_p2
                        #td_now = time_n2 - now00

                        td_secs = int(td.total_seconds())
                        #td_msecs00  = int(td_now.total_seconds()) * 1000
                        
                        #print(f"Time Difference = {td_secs} / from NOW = {td_msecs00} / Difference = {time_n2 - now00}")

                        if td_secs <= TIME_DIFF_SECS:
                            print(f"Do not handle very close frames ... {PREVIOUS_FRAME} VS {n} !!!")
                            delete_processed_frameX( fullfilename )
                            continue
                        elif (td_secs >= TIME_DIFF_LARGE):
                            print(f"Do not handle very far frames ... {PREVIOUS_FRAME} VS {n} !!!")
                            continue
                
                if PREVIOUS_FRAME >= n:
                    print(f"New Frame is Older or Same with  Previous ... ")
                    delete_processed_frameX( fullfilename )
                    continue
                    break

                #try:
                #time.sleep(8)
                finished = deep_core( fullfilename )
                #time.sleep(4)
                #except:
                #    print("Exception is Raised !")
                #    continue
                    
                if finished is True:
                    # Successful Object Detection in Images from Remote Security Cameras
                    PREVIOUS_FRAME = n

                    # tactic_finished_ml
                    if DELETE_PROCESSED_FRAMES is True:
                        try:
                            delete_processed_frameX( fullfilename )
                        except Exception as e:
                            print(f"Frame is Already Deleted ... {n}")

                #return

                # Continue with Next Frame - First Suspend Execution for Number of Secs (10 secs)
                #time.sleep(4)

    return

###################################################################################
####  STEP 1: Read Input Images = Consecutive Frames from Surveilance Cameras  ####
###################################################################################
def run_module_Gibraltar():
    print("Read Frames from Surveilance Cameras")

    # Check that folder with frames exists
    check_folder_exists()

    while True:
        frames_folders = list_folders()
        list_frames_inside_folder( frames_folders )

        print("Create Visualizations with LENS")

        #time.sleep(0.2)

    return

###########################################################################
#### Start Object-Detection using Trained Models : Detectron2 VS YOLO  ####
###########################################################################
if __name__ == "__main__":
    # First, read input images from surveilance cameras
    run_module_Gibraltar()
