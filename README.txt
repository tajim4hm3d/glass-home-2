Glass Home 2.0 — Combined Screensaver Upgrade
=============================================

This package changes TWO HTML pages and adds ONE JavaScript file.
It does NOT overwrite any image assets or touch the TV installation.

New features
- GREEN remote key: next scene
- YELLOW remote key: previous scene
- BLUE remote key: toggle weather
- INFO remote key: show controls
- Arrow Left/Right retained for Chrome/manual scene changes
- W / H keys for weather/help in Chrome
- Open-Meteo live temperature, condition and humidity (network required)
- Weather enable/disable and city selection via existing Settings interface
- Gentle extra pixel-style rain on scenes 01 and 03, drifting autumn leaves on 02, 04 and 05
- Existing scene settings, original animations and wallpapers remain intact

Installation (ONE command on your Mac after unzipping on your Desktop):

  cd ~/Developer/glass-home && python3 ~/Desktop/GlassHome-Complete-Update/install.py

Keep your local Chrome demo server running to preview.
Settings: http://127.0.0.1:18091/screensaver-settings.html
Preview: http://127.0.0.1:18091/lofi-rotation-preview.html

IMPORTANT
This is coded against the known pages from our conversation, not verified
against a copy of your actual complete project. The installer validates the
required sections and stops without editing if they differ. It creates a
timestamped backup folder of modified files in the project root.

Artwork 01–05 is NOT replaced by this installer because the generated artwork
was not faithful to your original scenes. The printed clocks remain in the
original images. Clean-up of those five images must be approved separately.

Weather requires the TV to allow outbound HTTPS. If not, it displays
'Weather unavailable' and the rest of the screensaver still functions.
