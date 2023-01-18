from os import getcwd, chdir, listdir, walk, path, remove

from create_classification_model import deep_core

DELETE_PROCESSED_FRAMES = True

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
    
    print(f"Folders Inside Frames Parent Directory ... {[x for x in frames_1]}")

    return frames_1

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
    for f in folders_all:
        if path.isfile( f ):
            print(f"Found a File inside FRAMES Folder ... {f}")
            continue

        if f == "masked":
            print("Do Not Delete Files Inside MASKED Folder !")
            continue
            
        print( f"Ready to Handle Frames Inside Folder ... {f}" )

        space_walk = walk(f)
         
        for x in space_walk:
            dirpath = x[0]
            dirnames = x[1]
            filenames = x[2]

            print( f"Number of Frames Found ... {len(filenames)}" )

            for n in filenames:
                # Object-Detection in Frame-NN ... Masked-Frame is Stored && Detected Objects Labels are Published into a MQ 
                fullfilename = path.abspath( dirpath + "/" + n)

                finished = deep_core( fullfilename )

                if finished is True:
                    # Successful Object Detection in Images from Remote Security Cameras

                    # tactic_finished_ml
                    if DELETE_PROCESSED_FRAMES is True:
                        try:
                            delete_processed_frameX( fullfilename )
                        except Exception as e:
                            print(f"Frame is Already Deleted ... {n}")

                #return

                # Continue with Next Frame

    return

###################################################################################
####  STEP 1: Read Input Images = Consecutive Frames from Surveilance Cameras  ####
###################################################################################
def run_module_Gibraltar():
    print("Read Frames from Surveilance Cameras")

    # Check that folder with frames exists
    check_folder_exists()

    frames_folders = list_folders()

    list_frames_inside_folder( frames_folders )

    return

###########################################################################
#### Start Object-Detection using Trained Models : Detectron2 VS YOLO  ####
###########################################################################
if __name__ == "__main__":
    # First, read input images from surveilance cameras
    run_module_Gibraltar()
