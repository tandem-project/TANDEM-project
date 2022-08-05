#!
pip install pyyaml==5.1

# workaround: install old version of pytorch since detectron2 hasn't released packages for pyTorch 1.9
#!
pip install torch==1.8.0+cu101 torchvision==0.9.0+cu101 -f https://download.pytorch.org/whl/torch_stable.html

# install detectron2 that matches pytorch 1.8
#!
pip install detectron2 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cu101/torch1.8/index.html

# After installation you need to restart the runtime in runtime
#exit(0)
