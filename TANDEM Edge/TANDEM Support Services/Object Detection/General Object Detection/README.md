# First downloads model "name.pt" from Tandem Model Repo
# Then starts Object Detection server

```
sudo docker run -it --rm -e name="cans" -e http_proxy=http://icache.intracomtel.com:80/ -e https_proxy=http://icache.intracomtel.com:80/ karageorge/objdet:general bash
```
