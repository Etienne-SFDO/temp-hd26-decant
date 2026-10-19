# STEPS Housing – Kitchen Replacement (Decant) Demo

A static HTML/JS demo of a tenant portal page for **Lauren Bailey**, a STEPS Housing tenant whose kitchen is being replaced. It shows accommodation (decant) options, a "Quick Answers" chat assistant, and Lightning Scheduler-style booking for a VRA video call or an in-person meeting.

No build step, no dependencies to install.

## Run it locally

**Option 1 – just open it**

1. Clone or download this repo (GitHub → **Code** → **Download ZIP**, then unzip).
2. Double-click `index.html` to open it in Chrome, Edge, Safari or Firefox.

**Option 2 – local web server (recommended for presenting)**

```bash
git clone https://github.com/Etienne-SFDO/temp-hd26-decant.git
cd temp-hd26-decant
python3 -m http.server 8000
```

Then browse to <http://localhost:8000>.

> **Internet required:** the page loads Tailwind CSS, the Inter font and Font Awesome icons from public CDNs. Without a connection the layout and icons will not render correctly.

## Demo script

1. **Quick Answers → Chat with us** – click *"Why is the food allowance less for the hotel?"* for the canned answer.
2. **Type anything** in the chat box (e.g. *"I want more"*) and press Enter. The assistant explains it can't authorise a change and offers:
   - **Book a video call with Sarah** (opens the VRA Call scheduler)
   - **Book an in-person meeting with Dan** (opens the In-Person scheduler)
   - **Talk to our Contact Centre now** (simulated hand-off)
3. **Discuss with your Housing Manager**:
   - **Video Call** → *Schedule VRA Call* with Sarah, Regeneration Specialist. Week starts Mon 26 Oct 2026, 30-minute slots, Video/Phone mode.
   - **In Person** → *Schedule In-Person Meeting* with Dan, Housing Manager. Week starts Mon 16 Nov 2026, 30-minute slots, Home visit/Office.
   - Review screen → **Confirm Appointment** shows a confirmation toast.

All data is mocked in the browser; nothing is sent anywhere. Slot availability is pseudo-random but deterministic, so the demo looks the same every run.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page layout (Tailwind via CDN) and the scheduler modal shell |
| `app.js` | Interactivity: option cards, toasts, chat assistant, scheduler logic |
| `style.css` | Small custom styles (animations, scrollbar, selected states) |
| `STEPS-*.png`, `Steps_Icons_List.png` | STEPS brand logos, colour palette and icon reference |
| `examples/` | Reference designs the scheduler was based on (not used by the page) |

## Customising

Scheduler settings (dates, people, titles, modes) live in `SCHED_KINDS` near the scheduler section of `app.js`. Chat replies are in `sendMockQuery()` in the same file.

Brand colours (`steps-main` #FF5C5C, `steps-blue` #48607A, `steps-navy` #001C30) are defined in the Tailwind config at the top of `index.html`.
