/**
 * STEPS Housing Demo - Stage Logic
 */

let selectedOptionName = null;
let understandsProcess = false;

// Handle Step 1: Accommodation Selection with Inline Buttons
function selectOption(selectedId) {
    const cards = document.querySelectorAll('.option-card');
    
    cards.forEach(card => {
        // Reset card borders and active background
        card.classList.remove('option-selected');
        
        // Hide badge
        const badge = card.querySelector('.selected-badge');
        if (badge) {
            badge.classList.remove('opacity-100', 'scale-100');
            badge.classList.add('opacity-0', 'scale-90');
        }

        // Reset inline buttons to default state
        const btn = card.querySelector('.option-btn');
        if (btn) {
            btn.innerHTML = 'Choose';
            btn.className = 'option-btn w-full py-4 rounded-xl border-2 border-steps-main text-steps-main font-bold text-xl hover:bg-steps-main hover:text-white transition card-transition';
        }
    });

    // Apply active styles to the selected card
    const selectedCard = document.getElementById(selectedId);
    selectedCard.classList.add('option-selected');
    
    // Show badge
    const selectedBadge = selectedCard.querySelector('.selected-badge');
    if (selectedBadge) {
        selectedBadge.classList.remove('opacity-0', 'scale-90');
        selectedBadge.classList.add('opacity-100', 'scale-100');
    }

    // Update the button inside the selected card
    const activeBtn = selectedCard.querySelector('.option-btn');
    if (activeBtn) {
        activeBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> My Choice';
        activeBtn.className = 'option-btn w-full py-4 rounded-xl border-2 border-steps-main bg-steps-main text-white font-bold text-xl shadow-md card-transition';
    }

    selectedOptionName = selectedCard.querySelector('h3').innerText;
    showToast(`Choice saved: ${selectedOptionName}.`, "fa-check-circle");
}

// Handle Checkbox Toggle in Section 2
function toggleUnderstanding() {
    understandsProcess = !understandsProcess;
    const box = document.getElementById('understand-check');
    const icon = document.getElementById('understand-icon');
    
    if (understandsProcess) {
        box.classList.replace('border-slate-300', 'border-transparent');
        box.classList.add('checkbox-active');
        icon.classList.remove('opacity-0');
        showToast("Preference noted: You do not need to be contacted.", "fa-check-circle");
    } else {
        box.classList.replace('border-transparent', 'border-slate-300');
        box.classList.remove('checkbox-active');
        icon.classList.add('opacity-0');
    }
}

// Handle Step 3 Extras Click
function launchExtra(moduleName) {
    showToast(`Launching '${moduleName}' module...`, 'fa-arrow-right-to-bracket');
}

// Handle Custom Toast Notifications
let toastTimeout;
function showToast(message, iconClass = 'fa-circle-check') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toastMessage.textContent = message;
    toastIcon.className = `fa-solid ${iconClass} text-steps-main text-3xl`;

    toast.classList.remove('toast-enter');
    toast.classList.add('toast-active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('toast-active');
        toast.classList.add('toast-enter');
    }, 4500); 
}

// Chat Widget Toggle
let chatOpen = false;
function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    if (chatOpen) {
        chatWidget.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        chatWidget.classList.add('opacity-0', 'pointer-events-none', 'translate-y-12');
    } else {
        chatWidget.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-12');
        chatWidget.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    chatOpen = !chatOpen;
}

// Mock Chat Logic
function sendMockQuery(queryText, typed = false) {
    const chatMessages = document.getElementById('chat-messages');
    const quickPrompts = document.getElementById('quick-prompts');
    
    if(quickPrompts) {
        quickPrompts.style.display = 'none';
    }

    const userMsgHTML = `
        <div class="flex gap-4 max-w-[90%] self-end flex-row-reverse">
            <div class="w-10 h-10 rounded-full bg-steps-blue flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">LB</div>
            <div class="bg-steps-navy text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-lg">
                ${queryText}
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', userMsgHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        let aiResponse = "";

        if (!typed && queryText.includes("rent reduction")) {
            aiResponse = `If you choose <strong>Stay Put</strong> or <strong>Stay with Family</strong>, you are entitled to a 30% rent reduction for the duration of the works under the UK Housing Ombudsman standard. However, if you choose <strong>Hotel Decant</strong>, there is no rent reduction, as STEPS Housing covers the full cost of the accommodation.`;
        } else if (!typed && queryText.includes("food allowance")) {
            aiResponse = `Of course! For <strong>Stay Put</strong>, the allowance is £25 per person, per day because you have no kitchen access. For <strong>Hotel Decant</strong>, the allowance is adjusted to £15 per person, per day because your hotel booking includes a complimentary breakfast.`;
        } else {
            // Anything typed (e.g. "I want more") - can't authorise, offer to book a call/meeting or escalate
            aiResponse = `I understand, and I'm sorry if the allowance doesn't feel like enough. I'm not able to authorise a change to your allowance myself, but your Housing Manager can review your circumstances with you.
                <p class="mt-3">You can use the <strong>Discuss with your Housing Manager</strong> options on this page, or I can set it up for you now:</p>
                <div class="flex flex-col gap-2 mt-4">
                    <button onclick="chatBook('call', 'Video')" class="text-left bg-white border-2 border-steps-main text-steps-navy font-semibold py-2 px-4 rounded-xl hover:bg-steps-main hover:text-white transition shadow-sm"><i class="fa-solid fa-video mr-2"></i>Book a video call with Sarah</button>
                    <button onclick="chatBook('visit')" class="text-left bg-white border-2 border-steps-main text-steps-navy font-semibold py-2 px-4 rounded-xl hover:bg-steps-main hover:text-white transition shadow-sm"><i class="fa-solid fa-handshake mr-2"></i>Book an in-person meeting with Dan</button>
                    <button onclick="escalateToContactCentre(this)" class="text-left bg-white border-2 border-steps-blue text-steps-navy font-semibold py-2 px-4 rounded-xl hover:bg-steps-blue hover:text-white transition shadow-sm"><i class="fa-solid fa-headset mr-2"></i>Talk to our Contact Centre now</button>
                </div>`;
        }

        const aiMsgHTML = `
            <div class="flex gap-4 max-w-[90%] opacity-0 transform translate-y-4 transition-all duration-500" id="latest-ai-msg">
                <div class="w-10 h-10 rounded-full bg-steps-main flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <i class="fa-solid fa-headset text-sm"></i>
                </div>
                <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm text-lg text-steps-navy leading-relaxed">
                    ${aiResponse}
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', aiMsgHTML);
        
        setTimeout(() => {
            const newMsg = document.getElementById('latest-ai-msg');
            newMsg.classList.remove('opacity-0', 'translate-y-4');
            newMsg.removeAttribute('id');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50);

    }, 800);
}
// Free-text chat input (Enter key or send button)
function sendTypedMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendMockQuery(schedEscape(text), true);
}

// Chat action: close the chat and open the booking modal
function chatBook(kind, mode) {
    if (chatOpen) toggleChat();
    openScheduler(kind, mode);
}

// Chat action: hand the conversation over to the contact centre
function escalateToContactCentre(btn) {
    btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
    btn.classList.add('bg-steps-blue', 'text-white');
    const chatMessages = document.getElementById('chat-messages');
    setTimeout(() => {
        chatMessages.insertAdjacentHTML('beforeend', `
            <div class="flex gap-4 max-w-[90%]">
                <div class="w-10 h-10 rounded-full bg-steps-main flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    <i class="fa-solid fa-headset text-sm"></i>
                </div>
                <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm text-lg text-steps-navy leading-relaxed">
                    No problem. I'm transferring you to the <strong>STEPS Contact Centre</strong> now. I've shared our conversation, so you won't need to repeat yourself.
                    <p class="mt-3 text-base text-steps-blue"><i class="fa-solid fa-circle-notch fa-spin mr-2"></i>An advisor will join this chat shortly...</p>
                </div>
            </div>`);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
}

// Schedule Appointment Modal (Lightning Scheduler style) - shared by the Video/Phone Call and In Person buttons
const SCHED_SLOT_MINS = 30;
const SCHED_KINDS = {
    call: {
        title: 'Schedule VRA Call',
        resource: { name: 'Sarah', role: 'Regeneration Specialist', initials: 'S' },
        type: 'Kitchen Replacement – VRA Call',
        start: new Date(2026, 9, 26), // Monday 26th October 2026
        modeLabel: 'Appointment Mode',
        noun: 'call',
        booked: 'VRA call',
        modes: {
            Video: { icon: 'fa-video', review: 'Video call', note: '<i class="fa-solid fa-paper-plane mr-1"></i> A secure video link will be sent to you before the call.' },
            Phone: { icon: 'fa-phone', review: 'Phone call', note: '<i class="fa-solid fa-mobile-screen mr-1"></i> Sarah will call you on your registered phone number.' },
        },
    },
    visit: {
        title: 'Schedule In-Person Meeting',
        resource: { name: 'Dan', role: 'Housing Manager', initials: 'D' },
        type: 'Kitchen Replacement – In-Person Meeting',
        start: new Date(2026, 10, 16), // Monday 16th November 2026
        modeLabel: 'Meeting Location',
        noun: 'meeting',
        booked: 'In-person meeting',
        modes: {
            Home: { icon: 'fa-house', review: 'Home visit', note: '<i class="fa-solid fa-location-dot mr-1"></i> Dan will visit you at your home to talk through your options.' },
            Office: { icon: 'fa-building', review: 'STEPS Housing office', note: '<i class="fa-solid fa-location-dot mr-1"></i> Meet Dan at your local STEPS Housing office.' },
        },
    },
};
const sched = { kind: 'call', step: 0, weekOffset: 0, day: 0, slot: null, mode: 'Video', notes: '' };
const schedKind = () => SCHED_KINDS[sched.kind];

function schedWeekDays() {
    return [...Array(7)].map((_, i) => {
        const d = new Date(schedKind().start);
        d.setDate(d.getDate() + sched.weekOffset * 7 + i);
        return d;
    });
}

// Deterministic pseudo-random availability so the demo looks the same every run
function schedSeed(n) {
    const x = Math.sin(n) * 10000;
    return x - Math.floor(x);
}

// 30-minute slots, 9:00am - 5:00pm, weekdays only
function schedSlotsFor(d) {
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const out = [];
    for (let mins = 9 * 60; mins < 17 * 60; mins += SCHED_SLOT_MINS) {
        const key = d.getMonth() * 50000 + d.getDate() * 1000 + mins;
        out.push({ mins, avail: !weekend && schedSeed(key) > 0.4 });
    }
    return out;
}

function schedTime(mins) {
    const h = Math.floor(mins / 60), m = mins % 60;
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

function schedEscape(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function openScheduler(kind = 'call', mode = Object.keys(SCHED_KINDS[kind].modes)[0]) {
    Object.assign(sched, { kind, step: 0, weekOffset: 0, day: 0, slot: null, mode, notes: '' });
    document.getElementById('schedule-title').textContent = SCHED_KINDS[kind].title;
    const modal = document.getElementById('schedule-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    renderScheduler();
}

function closeScheduler() {
    const modal = document.getElementById('schedule-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeScheduler();
});

function schedSet(changes) {
    Object.assign(sched, changes);
    renderScheduler();
}

function schedulerBack() {
    schedSet({ step: 0 });
}

function schedulerNext() {
    if (sched.step === 0) {
        if (sched.slot !== null) schedSet({ step: 1 });
        return;
    }
    const d = schedWeekDays()[sched.day];
    const dateLabel = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    closeScheduler();
    const k = schedKind(), mode = k.modes[sched.mode];
    showToast(`${k.booked} (${mode.review.toLowerCase()}) booked with ${k.resource.name} on ${dateLabel} at ${schedTime(sched.slot)}.`, mode.icon);
}

function renderScheduler() {
    const panel = document.getElementById('schedule-panel');
    panel.innerHTML = sched.step === 0 ? schedDateTimeHTML() : schedReviewHTML();

    const back = document.getElementById('schedule-back');
    const next = document.getElementById('schedule-next');
    const hint = document.getElementById('schedule-hint');
    back.style.visibility = sched.step ? 'visible' : 'hidden';
    next.textContent = sched.step ? 'Confirm Appointment' : 'Next';
    next.disabled = sched.step === 0 && sched.slot === null;
    hint.textContent = sched.step
        ? 'Please check your appointment details'
        : (sched.slot === null ? 'Select an available time slot to continue' : '30 minute slot selected');
}

function schedDateTimeHTML() {
    const days = schedWeekDays();
    const slots = schedSlotsFor(days[sched.day]);
    const monthLabel = days[0].toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const k = schedKind();
    const groups = [['Morning', s => s.mins < 12 * 60], ['Afternoon', s => s.mins >= 12 * 60]];

    return `
    <div class="grid lg:grid-cols-[300px_1fr] gap-8">
        <aside class="space-y-6">
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p class="text-sm font-bold uppercase tracking-wide text-slate-500 mb-2">Appointment</p>
                <p class="font-bold text-steps-navy text-xl leading-snug">${k.type}</p>
                <p class="text-base text-steps-blue mb-5"><i class="fa-regular fa-clock mr-1"></i> ${SCHED_SLOT_MINS} minutes</p>
                <p class="text-sm font-bold uppercase tracking-wide text-slate-500 mb-2">With</p>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-steps-navy text-white flex items-center justify-center font-bold text-lg">${k.resource.initials}</div>
                    <div>
                        <p class="font-bold text-steps-navy leading-tight">${k.resource.name}</p>
                        <p class="text-base text-steps-blue leading-tight">${k.resource.role}</p>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-sm font-bold uppercase tracking-wide text-slate-500 mb-2">${k.modeLabel}</p>
                <div class="grid grid-cols-2 rounded-xl border-2 border-slate-300 overflow-hidden">
                    ${Object.entries(k.modes).map(([m, { icon }]) => `
                    <button onclick="schedSet({ mode: '${m}' })" class="py-3 font-bold transition ${sched.mode === m ? 'bg-steps-main text-white' : 'bg-white text-steps-navy hover:bg-slate-50'}">
                        <i class="fa-solid ${icon} mr-2"></i>${m}
                    </button>`).join('')}
                </div>
                <p class="text-base text-steps-blue mt-3">
                    ${k.modes[sched.mode].note}
                </p>
            </div>
        </aside>

        <div>
            <div class="flex items-center justify-between mb-5">
                <h3 class="text-2xl font-bold text-steps-navy">Select a date and time</h3>
                <div class="flex items-center gap-3">
                    <button ${sched.weekOffset ? '' : 'disabled'} onclick="schedSet({ weekOffset: sched.weekOffset - 1, day: 0, slot: null })" aria-label="Previous week" class="w-10 h-10 rounded-lg border-2 border-slate-300 text-steps-navy hover:border-steps-main disabled:text-slate-300 disabled:hover:border-slate-300 transition"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="font-bold text-steps-navy min-w-[10rem] text-center">${monthLabel}</span>
                    <button onclick="schedSet({ weekOffset: sched.weekOffset + 1, day: 0, slot: null })" aria-label="Next week" class="w-10 h-10 rounded-lg border-2 border-slate-300 text-steps-navy hover:border-steps-main transition"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>

            <div class="grid grid-cols-7 gap-2 mb-6">
                ${days.map((d, i) => {
                    const n = schedSlotsFor(d).filter(s => s.avail).length;
                    const sel = i === sched.day;
                    const cls = sel ? 'border-steps-main bg-steps-main text-white shadow-md'
                        : n ? 'border-slate-300 bg-white text-steps-navy hover:border-steps-main'
                        : 'border-slate-100 bg-slate-100 text-slate-300 cursor-not-allowed';
                    return `
                    <button ${n ? '' : 'disabled'} onclick="schedSet({ day: ${i}, slot: null })" class="rounded-xl border-2 py-3 text-center transition ${cls}">
                        <div class="text-xs uppercase font-semibold">${d.toLocaleDateString('en-GB', { weekday: 'short' })}</div>
                        <div class="text-2xl font-extrabold">${d.getDate()}</div>
                        <div class="text-xs ${sel ? 'text-white/80' : 'text-slate-500'}">${n ? n + ' slots' : '—'}</div>
                    </button>`;
                }).join('')}
            </div>

            ${groups.map(([label, inGroup]) => `
            <p class="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">${label}</p>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                ${slots.filter(inGroup).map(s => {
                    const sel = sched.slot === s.mins;
                    const cls = sel ? 'bg-steps-main border-steps-main text-white shadow-md'
                        : s.avail ? 'border-steps-blue text-steps-blue bg-white hover:bg-blue-50'
                        : 'border-slate-100 bg-slate-100 text-slate-300 line-through cursor-not-allowed';
                    return `<button ${s.avail ? '' : 'disabled'} onclick="schedSet({ slot: ${s.mins} })" class="py-3 rounded-xl border-2 text-base font-bold transition ${cls}">${schedTime(s.mins)}</button>`;
                }).join('')}
            </div>`).join('')}
        </div>
    </div>`;
}

function schedReviewHTML() {
    const d = schedWeekDays()[sched.day];
    const k = schedKind(), mode = k.modes[sched.mode];
    const rows = [
        ['Appointment', `${k.type} (${SCHED_SLOT_MINS} min)`],
        ['Date', d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
        ['Time', `${schedTime(sched.slot)} – ${schedTime(sched.slot + SCHED_SLOT_MINS)}`],
        ['With', `${k.resource.name} – ${k.resource.role}`],
        [k.modeLabel, `<i class="fa-solid ${mode.icon} mr-2 text-steps-main"></i>${mode.review}`],
    ];

    return `
    <h3 class="text-2xl font-bold text-steps-navy mb-6">Review appointment details</h3>
    <div class="grid lg:grid-cols-2 gap-8">
        <dl class="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            ${rows.map(([k, v]) => `
            <div class="grid grid-cols-[170px_1fr] px-5 py-4">
                <dt class="text-slate-500">${k}</dt>
                <dd class="font-bold text-steps-navy">${v}</dd>
            </div>`).join('')}
        </dl>
        <div>
            <label for="schedule-notes" class="font-bold text-steps-navy block mb-2">Anything ${k.resource.name} should know before the ${k.noun}?</label>
            <textarea id="schedule-notes" oninput="sched.notes = this.value" rows="5" class="w-full rounded-xl border-2 border-slate-300 p-4 text-lg text-steps-navy focus:outline-none focus:border-steps-main transition" placeholder="e.g. questions about the decant options or accessibility needs">${schedEscape(sched.notes)}</textarea>
            <label class="flex items-center gap-3 mt-4 text-steps-navy">
                <input type="checkbox" checked class="w-5 h-5 accent-[#FF5C5C]">
                Send confirmation email to lauren.bailey@example.com
            </label>
            <label class="flex items-center gap-3 mt-3 text-steps-navy">
                <input type="checkbox" checked class="w-5 h-5 accent-[#FF5C5C]">
                <span>Send confirmation by <i class="fa-brands fa-whatsapp text-[#25D366]"></i> WhatsApp / text to 07551 131138</span>
            </label>
        </div>
    </div>`;
}
