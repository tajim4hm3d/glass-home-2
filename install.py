#!/usr/bin/env python3
"""Glass Home 2.0 screensaver enhancement. Run in project root, backs up each changed file."""
from pathlib import Path
from datetime import datetime
import re, shutil, sys
root=Path.cwd()
app=root/'app'
rotation=app/'lofi-rotation-preview.html'
settings=app/'screensaver-settings.html'
if not rotation.exists() or not settings.exists():
    print('STOP: Run in ~/Developer/glass-home; required pages not found.');sys.exit(1)
version='gh-addon-complete-v1'
rotation_html=rotation.read_text()
settings_html=settings.read_text()
if version in rotation_html and version in settings_html:
    print('This update is already installed.');sys.exit(0)
if '</body>' not in rotation_html.lower() or '</body>' not in settings_html.lower():
    print('STOP: HTML pages have no closing body tag. No files changed.');sys.exit(1)
if 'gh-addon-complete-v1' in rotation_html or 'gh-addon-complete-v1' in settings_html:
    print('STOP: Update partially installed. Restore from the backup before retrying.');sys.exit(1)
addon_path=Path(__file__).parent
script_file=addon_path/'glasshome-addon.js'
if not script_file.exists():
    print('STOP: glasshome-addon.js missing.');sys.exit(1)
# Validate intended edit point before changing anything
if not re.search(r"title:\s*['\"]Choose scenes['\"]", settings_html):
    print('STOP: Choose scenes entry missing from settings page. No changes made.');sys.exit(1)
if not re.search(r'<body[^>]*>', rotation_html, flags=re.I):
    print('STOP: Screensaver HTML body missing. No changes made.');sys.exit(1)
# Preserve exact baseline folder. Backups are never overwritten.
backup_dir=root/('glasshome-addon-backup-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
backup_dir.mkdir()
for f in [rotation,settings]:
    target=backup_dir/f.relative_to(root)
    target.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(f,target)
# The settings page already has a remote-capable settings object and renderer.
# Inject new settings objects before its existing Choose scenes item.
extra="""    // gh-addon-complete-v1
    {
      title: 'Weather on screensaver',
      description: 'Show live local weather with the clock.',
      key: 'gh.lofi.weatherVisible',
      choices: [['1', 'Show'], ['0', 'Hide']],
      defaultValue: '1'
    },
    {
      title: 'Weather city',
      description: 'Choose the city for the weather forecast.',
      key: 'gh.lofi.weatherCity',
      choices: [
        ['London', 'London'],
        ['Birmingham', 'Birmingham'],
        ['Manchester', 'Manchester'],
        ['Leeds', 'Leeds'],
        ['Glasgow', 'Glasgow'],
        ['Edinburgh', 'Edinburgh'],
        ['Cardiff', 'Cardiff'],
        ['Bristol', 'Bristol'],
        ['Liverpool', 'Liverpool'],
        ['Nottingham', 'Nottingham']
      ],
      defaultValue: 'London'
    },
"""
settings_html=re.sub(r"(?=\s*\{\s*title:\s*['\"]Choose scenes['\"])", '\n'+extra,settings_html,count=1)
# Ensure extra inserted exactly once.
if settings_html.count('gh-addon-complete-v1')!=1:
    print('STOP: Could not insert weather settings. No changes made.');sys.exit(1)
addon_target=app/'js/glasshome-addon.js'
if addon_target.exists() and addon_target.read_bytes()!=script_file.read_bytes():
    shutil.copy2(addon_target,backup_dir/'glasshome-addon-old.js')
shutil.copy2(script_file,addon_target)
rotation_html=re.sub(r'</body>', '<script src="js/glasshome-addon.js"></script>\n</body>',rotation_html,count=1, flags=re.I)
# Tag ensures repeat runs don't reinject
rotation_html=rotation_html.replace('<script src="js/glasshome-addon.js"></script>', '<!-- gh-addon-complete-v1 -->\n<script src="js/glasshome-addon.js"></script>',1)
# Add Tizen network privilege/access without breaking other config settings; no source policy bypass.
config=root/'config.xml'
if not config.exists(): config=app/'config.xml'
if config.exists():
    c=config.read_text()
    newc=c
    if 'http://tizen.org/privilege/internet' not in newc:
        newc=newc.replace('</widget>', '  <tizen:privilege name="http://tizen.org/privilege/internet"/>\n</widget>')
    if 'origin="*"' not in newc and 'api.open-meteo.com' not in newc:
        newc=newc.replace('</widget>', '  <access origin="https://api.open-meteo.com" subdomains="true"/>\n  <access origin="https://geocoding-api.open-meteo.com" subdomains="true"/>\n</widget>')
    if newc!=c:
        shutil.copy2(config,backup_dir/config.relative_to(root))
        config.write_text(newc)
settings.write_text(settings_html)
rotation.write_text(rotation_html)
print('SUCCESS: Weather settings, remote scene switching, and additional effects installed.')
print('Backups:',backup_dir)
print('Preview: http://127.0.0.1:18091/lofi-rotation-preview.html')
print('Remote: GREEN next / YELLOW previous / BLUE weather on-off / INFO help / BACK exit')
print('In Chrome: Right/Left scenes, W weather, H help, Escape exit')
print('Not installed on TV yet. Review Chrome preview first.')
