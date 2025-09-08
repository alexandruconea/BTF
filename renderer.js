const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const npcList = document.getElementById('npc-list');
    const infoText = document.getElementById('info-text');
    const fitText = document.getElementById('fit-text');
    const copyBtn = document.getElementById('copy-btn');

    const fits = [
        ["Angel Cartel", `
Use Occult and keep at 6k

FIT:
[Nergal, ♦ Angel Cartel]
Centii A-Type Small Armor Repairer
Overdrive Injector System II
True Sansha Multispectrum Energized Membrane
Centum A-Type Explosive Energized Membrane

Coreli A-Type 1MN Afterburner
Federation Navy Stasis Webifier
Federation Navy Stasis Webifier

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Blood", `
Use Occult and orbit at 2k

FIT:
[Nergal, ♦ Blood]
Navy Micro Auxiliary Power Core
Centii A-Type Small Armor Repairer
Entropic Radiation Sink II
Centum A-Type EM Energized Membrane

'Censer' Medium Cap Battery
Federation Navy Stasis Webifier
Federation Navy Stasis Webifier

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Enyo", `
Use Occult and orbit at 6k

FIT:
[Nergal, ♦ Enyo / Orbit]
Centii A-Type Small Armor Repairer
Entropic Radiation Sink II
Entropic Radiation Sink II
Centus X-Type Kinetic Armor Hardener

Coreli A-Type 1MN Afterburner
Federation Navy Stasis Webifier
Republic Fleet Small Cap Battery

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Guristas", `
Use Occult and approach with MWD active, wait 2 cycles and then overburn the MWD
As soon as you are in range stop the overburn and use Warp Scrambler.

Be careful to not burn the modules.
If anything goes wrong, look for the mission beacon, orbit it and close the client.
Wait 5 min and then login.

FIT:
[Nergal, ♦ Guristas]
Centii A-Type Small Armor Repairer
Overdrive Injector System II
Overdrive Injector System II
Centus X-Type Kinetic Armor Hardener

Coreli A-Type 5MN Microwarpdrive
True Sansha Warp Scrambler
Republic Fleet Small Cap Battery

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Hawk", `
Approach one logi and use Baryon, then approach Hawk and kill it with Occult

FIT:
[Nergal, ♦ Hawk / Logi]
Centii A-Type Small Armor Repairer
Entropic Radiation Sink II
Centus C-Type Kinetic Armor Hardener
Centus X-Type Kinetic Armor Hardener

Coreli A-Type 1MN Afterburner
Federation Navy Stasis Webifier
Republic Fleet Small Cap Battery

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Jaguar", `
Orbit at 6.5k and use Occult

FIT:
[Nergal, ♦ Jaguar]
Centii A-Type Small Armor Repairer
Capacitor Power Relay II
Centus C-Type Explosive Armor Hardener
Entropic Radiation Sink II

Coreli A-Type 1MN Afterburner
Federation Navy Stasis Webifier
Federation Navy Stasis Webifier

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Sansha", `
Approach and use Baryon

FIT:
[Nergal, ♦ Sansha]
Centii A-Type Small Armor Repairer
Centus C-Type EM Armor Hardener
Entropic Radiation Sink II
Entropic Radiation Sink II

Target Painter II
Shadow Serpentis Tracking Computer
Republic Fleet Small Cap Battery

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Serpentis", `
Approach and use Baryon

FIT:
[Nergal, ♦ Serpentis]
Centii A-Type Small Armor Repairer
Entropic Radiation Sink II
Centus C-Type Kinetic Armor Hardener
Centus X-Type Kinetic Armor Hardener

Federation Navy Stasis Webifier
Federation Navy Stasis Webifier
Republic Fleet Small Cap Battery

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `],
        ["Vengeance", `
Orbit at 2k and use Occult

FIT:
[Nergal, ♦ Vengeance]
Centii A-Type Small Armor Repairer
Centus C-Type EM Armor Hardener
Entropic Radiation Sink II
Entropic Radiation Sink II

Coreli A-Type 1MN Afterburner
Federation Navy Stasis Webifier
Republic Fleet Small Cap Battery

Veles Light Entropic Disintegrator

Small Auxiliary Nano Pump II
Small Capacitor Control Circuit II
  `]
    ];

    // Populăm lista NPC
    fits.forEach(([name, text]) => {
        const li = document.createElement('li');
        li.textContent = name;
        li.addEventListener('click', () => {
            document.querySelectorAll('#npc-list li').forEach(el => el.classList.remove('selected'));
            li.classList.add('selected');

            const parts = text.split("FIT:");
            const info = parts[0].trim();
            const fit = parts[1] ? parts[1].trim() : "";

            infoText.textContent = info;
            fitText.value = fit;
        });
        npcList.appendChild(li);
    });

    if (npcList.firstChild) npcList.firstChild.click();

    // Copy button
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(fitText.value).then(() => {
            copyBtn.textContent = "✅ Copied!";
            setTimeout(() => copyBtn.textContent = "📋", 1500);
        });
    });

    // Butoane custom minimize și close
    document.getElementById('minimize').addEventListener('click', () => {
        ipcRenderer.send('window-minimize');
    });

    document.getElementById('close').addEventListener('click', () => {
        ipcRenderer.send('window-close');
    });
});
