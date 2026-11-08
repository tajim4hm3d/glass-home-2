# Glass Home 2.0

### A custom smart TV launcher and animated screensaver for Samsung Tizen

**Glass Home 2.0** is a personal smart TV interface developed for a Samsung television running Tizen. It brings together a custom home-screen dock, a remote-friendly settings experience, and an animated lo-fi screensaver with live information and personalised scene controls.

> **Portfolio showcase:** This repository documents the design and development of Glass Home 2.0. It intentionally does **not** contain the private production project, copyrighted third-party artwork, TV signing certificates, device identifiers, or personal configuration.

## Project at a glance

| | |
|---|---|
| **Project type** | Personal software development project |
| **Platform** | Samsung Smart TV / Tizen |
| **Languages** | JavaScript, HTML, CSS, Python (development scripts) |
| **Development tools** | Tizen Studio / CLI, Samsung Debug Bridge (SDB), Git, Chrome |
| **Status** | Built, deployed and tested on a physical Samsung TV |

## Key features

- **Custom home screen:** A responsive, TV-focused dock with shortcuts to entertainment apps and connected inputs, including a games console.
- **Dedicated settings:** Remote-navigable settings screens for wallpapers and screensaver preferences.
- **Nine lo-fi screensaver scenes:** A collection of themed backgrounds with scene-specific atmospheric effects, including rain and drifting autumn leaves.
- **Automatic and manual launch:** The screensaver activates after a configurable idle period or opens instantly from a shortcut in the home-screen dock.
- **True scene shuffle:** Randomised scene order, with previous-scene navigation and avoidance of immediate repeats across cycles.
- **Live information:** Large, living-room-readable clock, date, rotating quotes and weather information.
- **Remote controls:** Directional navigation, Samsung remote colour-key shortcuts, an INFO help overlay, and Back-to-home behaviour.
- **Personalisation:** Screensaver enable/disable, idle timeout, scene rotation interval, scene selection and display preferences.

## Engineering highlights

### 1. Designing for a TV, not a desktop
The interface uses remote-friendly focus and navigation patterns, clear visual hierarchy, and larger text designed to be read from across a room.

### 2. Building an animated screensaver without heavy dependencies
Scene changes use layered backgrounds and crossfades. Canvas-based effects add motion while keeping the interface lightweight for television hardware.

### 3. Managing state across screens
Browser local storage preserves choices such as selected scenes, idle timing, shuffle behaviour and visibility settings.

### 4. Debugging on real hardware
A key challenge was bridging the gap between a working Chrome preview and the television's older Tizen browser. The project was tested and refined on-device to resolve background rendering, remote-button behaviour and text readability.

### 5. Packaging and deployment
The project uses the Tizen command-line tools to build a signed `.wgt` application and Samsung Debug Bridge to install and launch it for testing.

## Screenshots / demo

Screenshots can be added here once captured from the finished interface. Suggested images:

1. **Home screen** — custom dock and wallpaper
2. **Screensaver** — animated scene with clock and weather
3. **Screensaver settings** — options and scene selection

> Add screenshots to the `screenshots/` directory, then replace the placeholders below with actual image links. Ensure screenshots do not expose personal information.

<!-- Example after adding images:
![Glass Home home screen](screenshots/home-screen.png)
![Lo-fi screensaver](screenshots/screensaver.png)
![Screensaver settings](screenshots/settings.png)
-->

## What I learned

- Developing interfaces for a remote-controlled, ten-foot user experience
- Accounting for browser and platform compatibility differences
- Diagnosing deployment issues using Tizen CLI and SDB
- Implementing client-side settings, idle-state behaviour and input handling
- Iterating from desktop prototype to a working physical-device installation

## Future ideas

- Expanded screen themes and animation options
- Additional appearance and accessibility controls
- Companion phone-based controls

## Notes

Glass Home 2.0 is an independent, unofficial personal project and is **not affiliated with Samsung**. Brand names mentioned here belong to their respective owners. It is not presented as a replacement for Samsung Smart Hub or as a way to remap system-reserved remote keys.

**Source-code availability:** This is a portfolio-only showcase. The full working source and private assets are intentionally excluded.
