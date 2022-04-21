#!/bin/bash
message="Deployed to Firebase Hosting *${GCLOUD_PROJECT}*"
curl -X POST https://api.telegram.org/bot5052806562:AAHRyAQsPi2LXpPyZ76Q1gnvbwasF1S4MPQ/sendMessage -d chat_id=1998514092 -d parse_mode=Markdown -d text="$message"