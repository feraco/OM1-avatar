# OM1 Avatar

A modern React-based frontend application that provides the user interface and avatar display system for OM1 robotics software. This application features interactive Rive animations and serves as the primary visual interface for OM1 robotic systems.

## Overview

OM1 Avatar is built with React, TypeScript, and Vite, delivering a responsive and engaging user interface for robotics applications. The application showcases animated avatars and provides a seamless frontend experience for OM1 robotics software interaction.


## Production

To run the application in production mode, use Docker Compose:

```bash
docker-compose up -d
```

Install `unclutter` on your system to hide the mouse cursor after a period of inactivity:

```bash
sudo apt install unclutter
```

Add the script to `/usr/local/bin/start-kiosk.sh` and make it executable:

```bash
#!/bin/bash

unclutter -display :0 -idle 0.1 -root &

HOST=localhost
PORT=4173

# Wait for Docker service to listen
while ! nc -z $HOST $PORT; do
  echo "Waiting for $HOST:$PORT..."
  sleep 0.1
done

exec chromium --kiosk http://$HOST:$PORT --disable-infobars --noerrdialogs
```

Make the script executable:

```bash
chmod +x /usr/local/bin/start-kiosk.sh
```

Add the script to `/etc/systemd/system/kiosk.service` to launch the kiosk mode automatically on boot.

```bash
# /etc/systemd/system/kiosk.service
[Unit]
Description=Kiosk Browser
After=graphical.target docker.service
Requires=docker.service

[Service]
Environment=DISPLAY=:0
ExecStart=/usr/local/bin/start-kiosk.sh
Restart=always
User=openmind

[Install]
WantedBy=graphical.target
```

Enable and start the kiosk service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable kiosk.service
sudo systemctl start kiosk.service
```

> Note: To stop the kiosk service, use `sudo systemctl stop kiosk.service`.

## License

This project is licensed under the terms specified in the LICENSE file.

---

**Note**: This frontend application is designed to work in conjunction with OM1 robotics backend systems and hardware components.
