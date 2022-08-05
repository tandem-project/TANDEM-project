# Check pyTorch version
import torch, torchvision
print(torch.__version__, torch.cuda.is_available())
print(torchvision.__version__)
assert torch.__version__ .startswith("1.8.0")
