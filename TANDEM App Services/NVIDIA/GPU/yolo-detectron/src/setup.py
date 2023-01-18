#!/usr/bin/env python

from setuptools import setup

setup(
    name="manage_frames_preinf",
    version="0.0.1",
    packages=[],
    install_requires=["opencv-python", "pika>=1.2.0", "influxdb>=5.3.1", "influxdb-client>=1.27.0", "redis==4.3.4", "prometheus-client>=0.14.1"],
    data_files=[("cfg", ["config/camera.cfg"])],
    entry_points={
      "console_scripts": [
        "smart-grab=camera4me.main:main_grab",
        "file-watchdog=camera4me.space_protector:run_watchdog",
        "polite-messenger=camera4me.messenger:__main_mq_client__",
        "influxdb-caller=camera4me.influxdb_main:__influx_main__",
        "system-monitoring=datadrill.central_platform:platform_22"
      ]
    }
)
