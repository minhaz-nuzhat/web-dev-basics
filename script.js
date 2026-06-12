const clips = [
  {
    number: '01',
    nav: 'Hook',
    kicker: 'Why this matters',
    title: 'AI can build your interface.',
    subtitle: 'It will not guess your design intent.',
    body: 'These guidelines are your language for directing the model instead of hoping it reads your mind.',
    note: 'Open with this to frame principles as practical prompt inputs.',
    type: 'quote'
  },
  {
    number: '02',
    nav: 'Guidelines',
    kicker: 'Developer responsibility',
    title: 'Know the guideline, then tell the AI.',
    body: 'If your prompt only says build outcome x, you get generic structure. If your prompt includes design guidelines, you get direction.',
    note: 'Bridge clip before Don Norman principles.',
    type: 'terminal',
    code: 'bad prompt: build me a landing page\n\nbetter prompt:\n- mobile-first\n- clear affordance for CTA\n- visible signifiers\n- immediate feedback after submit'
  },
  {
    number: '03',
    nav: 'Affordance',
    kicker: 'Norman principle',
    title: 'Affordance',
    body: 'The design should suggest what actions are possible.',
    note: 'Visual: clearly clickable controls with tactile depth.',
    type: 'affordance'
  },
  {
    number: '04',
    nav: 'Signifiers',
    kicker: 'Norman principle',
    title: 'Signifiers',
    body: 'Visible cues should show where and how to act.',
    note: 'Visual: arrows, labels, and active cues point to actions.',
    type: 'signifiers'
  },
  {
    number: '05',
    nav: 'Constraints',
    kicker: 'Norman principle',
    title: 'Constraints',
    body: 'Good design limits wrong actions before mistakes happen.',
    note: 'Visual: disabled and locked states prevent invalid flow.',
    type: 'constraints'
  },
  {
    number: '06',
    nav: 'Mapping',
    kicker: 'Norman principle',
    title: 'Mapping',
    body: 'Controls should feel naturally connected to their outcomes.',
    note: 'Visual: control-to-result pairs animate in sync.',
    type: 'mapping'
  },
  {
    number: '07',
    nav: 'Feedback',
    kicker: 'Norman principle',
    title: 'Feedback',
    body: 'The system should immediately show what happened after action.',
    note: 'Visual: waiting and success states communicate system response.',
    type: 'feedback'
  },
  {
    number: '08',
    nav: 'Conceptual Model',
    kicker: 'Norman principle',
    title: 'Conceptual Model',
    body: 'The interface should match how the user thinks it works.',
    note: 'Visual: expected user path represented as a simple mental model.',
    type: 'model'
  },
  {
    number: '09',
    nav: 'Prompt Formula',
    kicker: 'Prompting with principles',
    title: 'Put principles directly in your prompt.',
    body: 'This is how you turn taste and UX intent into AI-readable instructions.',
    note: 'Record this clip while reading the formula aloud.',
    type: 'prompt'
  },
  {
    number: '10',
    nav: 'Closing',
    kicker: 'Your role',
    title: 'The AI is your teammate. You are the designer.',
    body: 'Guidelines are not theory here. They are the brief you hand to the model.',
    note: 'Strong final line before CTA.',
    type: 'manifesto'
  }
];

const clipList = document.getElementById('clipList');
const clipViewport = document.getElementById('clipViewport');
const clipCounter = document.getElementById('clipCounter');
const clipKicker = document.getElementById('clipKicker');
const clipTitle = document.getElementById('clipTitle');
const clipNote = document.getElementById('clipNote');

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const autoplayButton = document.getElementById('autoplayButton');

let activeIndex = 0;
let autoplayId = null;

function renderList() {
  clipList.innerHTML = clips
    .map((clip, index) => `
      <button class="clip-button ${index === activeIndex ? 'is-active' : ''}" data-index="${index}" type="button">
        <strong>${clip.number} ${clip.nav}</strong>
        <span>${clip.kicker}</span>
      </button>
    `)
    .join('');

  clipList.querySelectorAll('.clip-button').forEach((button) => {
    button.addEventListener('click', () => {
      setActiveClip(Number(button.dataset.index));
      stopAutoplay();
    });
  });
}

function renderType(clip) {
  if (clip.type === 'terminal') {
    return `
      <div class="stack">
        <article class="terminal-card">
          <div class="terminal-card-top"><span></span><span></span><span></span></div>
          <pre>${clip.code}</pre>
        </article>
      </div>
    `;
  }

  if (clip.type === 'affordance') {
    return `
      <div class="stack motion-affordance">
        <article class="question-strip"><span class="question-digit">A</span><div><strong>What can I do here?</strong><p>Make actions feel clickable or draggable by design.</p></div></article>
        <div class="affordance-stack">
          <div class="affordance-button"><span>Book a call</span><span class="dot"></span></div>
          <div class="affordance-button"><span>Open case study</span><span class="dot"></span></div>
          <div class="affordance-button"><span>Play demo</span><span class="dot"></span></div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'signifiers') {
    return `
      <div class="stack motion-signifiers">
        <article class="question-strip"><span class="question-digit">S</span><div><strong>Where do I click?</strong><p>Labels, arrows, and cues remove guessing.</p></div></article>
        <div class="signifier-stack">
          <div class="signifier-mark">Primary CTA label</div>
          <div class="signifier-mark">Hover cue + arrow</div>
          <div class="signifier-mark">Section jump indicator</div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'constraints') {
    return `
      <div class="stack motion-constraints">
        <article class="constraint-grid">
          <div class="constraint-item"><strong>Valid email</strong><p>name@domain.com</p></div>
          <div class="constraint-item disabled"><strong>Submit</strong><p>Disabled until form valid</p></div>
          <div class="constraint-item locked"><strong>Password policy</strong><p>8+ chars + symbol required</p></div>
          <div class="constraint-item"><strong>Date picker</strong><p>Blocks past dates</p></div>
        </article>
      </div>
    `;
  }

  if (clip.type === 'mapping') {
    return `
      <div class="stack">
        <article class="mapping-grid">
          <div class="mapping-row"><strong>Opacity</strong><span class="mapping-line"></span><span class="mapping-knob"></span></div>
          <div class="mapping-row"><strong>Card size</strong><span class="mapping-line"></span><span class="mapping-knob"></span></div>
          <div class="mapping-row"><strong>Volume</strong><span class="mapping-line"></span><span class="mapping-knob"></span></div>
          <div class="mapping-row"><strong>Theme</strong><span class="mapping-line"></span><span class="mapping-knob"></span></div>
        </article>
      </div>
    `;
  }

  if (clip.type === 'feedback') {
    return `
      <div class="stack motion-feedback">
        <article class="feedback-grid">
          <div class="feedback-row waiting"><strong>Upload in progress</strong><p>System is processing your action.</p><span class="feedback-pill run">Running</span></div>
          <div class="feedback-row success"><strong>Saved successfully</strong><p>User gets immediate confirmation.</p><span class="feedback-pill ok">Success</span></div>
        </article>
      </div>
    `;
  }

  if (clip.type === 'model') {
    return `
      <div class="stack">
        <article class="model-grid">
          <div class="model-step"><strong>User intent</strong><p>Find pricing fast</p></div>
          <div class="model-step"><strong>Expected action</strong><p>Tap pricing in nav</p></div>
          <div class="model-step"><strong>System behavior</strong><p>Jump to clear pricing table</p></div>
          <div class="model-step"><strong>Mental alignment</strong><p>No surprise, no confusion</p></div>
        </article>
      </div>
    `;
  }

  if (clip.type === 'prompt') {
    return `
      <div class="stack">
        <article class="terminal-card">
          <div class="terminal-card-top"><span></span><span></span><span></span></div>
          <pre>Build a mobile-first landing page for founders.

Use these design constraints:
- Affordance: CTA buttons must look clickable
- Signifiers: arrows + labels for all actions
- Constraints: disable submit on invalid inputs
- Mapping: controls map clearly to effects
- Feedback: success/error states on every action
- Conceptual model: nav labels match user expectations

No code yet. Return UX plan first.</pre>
        </article>
        <div class="prompt-grid">
          <div class="prompt-chip"><strong>Tell it who</strong><p>Target user + intent</p></div>
          <div class="prompt-chip"><strong>Tell it what</strong><p>Desired behavior and states</p></div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'manifesto') {
    return `
      <div class="stack">
        <article class="definition-grid">
          <div class="definition-card"><strong>Guidelines</strong><p>Not decoration. Direction.</p></div>
          <div class="definition-card"><strong>Prompt quality</strong><p>Comes from your system thinking.</p></div>
          <div class="definition-card"><strong>Role</strong><p>Developer as designer + editor.</p></div>
          <div class="definition-card"><strong>Outcome</strong><p>Less generic. More intentional.</p></div>
        </article>
      </div>
    `;
  }

  return '';
}

function renderClip(index) {
  const clip = clips[index];

  clipViewport.innerHTML = `
    <article class="clip-scene scene-${clip.type}">
      <div class="signal-column"></div>
      <div class="scene-frame">
        <header class="scene-top">
          <p class="scene-index">${clip.number}</p>
          <p class="scene-kicker">${clip.kicker}</p>
        </header>

        <section class="scene-main">
          <h2 class="scene-title">${clip.title}</h2>
          ${clip.subtitle ? `<p class="scene-subtitle">${clip.subtitle}</p>` : ''}
          ${clip.body ? `<p class="scene-body">${clip.body}</p>` : ''}
          ${renderType(clip)}
        </section>

        <footer>
          <p class="scene-footnote">${clip.note}</p>
        </footer>
      </div>
    </article>
  `;

  clipCounter.textContent = `${clip.number} / ${String(clips.length).padStart(2, '0')}`;
  clipKicker.textContent = clip.kicker;
  clipTitle.textContent = clip.title;
  clipNote.textContent = clip.note;
}

function setActiveClip(index) {
  activeIndex = (index + clips.length) % clips.length;
  renderList();
  renderClip(activeIndex);
}

function nextClip() {
  setActiveClip(activeIndex + 1);
}

function prevClip() {
  setActiveClip(activeIndex - 1);
}

function stopAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId);
    autoplayId = null;
    autoplayButton.textContent = 'Autoplay';
    autoplayButton.classList.remove('control-button-primary');
  }
}

function toggleAutoplay() {
  if (autoplayId) {
    stopAutoplay();
    return;
  }

  autoplayId = setInterval(nextClip, 4500);
  autoplayButton.textContent = 'Stop';
  autoplayButton.classList.add('control-button-primary');
}

prevButton.addEventListener('click', () => {
  prevClip();
  stopAutoplay();
});

nextButton.addEventListener('click', () => {
  nextClip();
  stopAutoplay();
});

autoplayButton.addEventListener('click', toggleAutoplay);

setActiveClip(0);
