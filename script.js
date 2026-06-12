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
    body: 'A raised "Book a call" button communicates clickability better than plain text in body copy.',
    note: 'Concrete cue: button depth + contrast signals action.',
    type: 'affordance'
  },
  {
    number: '04',
    nav: 'Signifiers',
    kicker: 'Norman principle',
    title: 'Signifiers',
    body: 'A label like "Primary CTA" plus an arrow cue removes guessing about where to click next.',
    note: 'Concrete cue: labels + arrows + highlighted target.',
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
    body: 'When a slider moves right and the card grows, users instantly understand control-to-result mapping.',
    note: 'Concrete cue: direction of control matches visible outcome.',
    type: 'mapping'
  },
  {
    number: '07',
    nav: 'Feedback',
    kicker: 'Norman principle',
    title: 'Feedback',
    body: 'After submit, show "Uploading..." then "Saved successfully" so users never wonder if action worked.',
    note: 'Concrete cue: loading state followed by success confirmation.',
    type: 'feedback'
  },
  {
    number: '08',
    nav: 'Conceptual Model',
    kicker: 'Norman principle',
    title: 'Conceptual Model',
    body: 'If users look for "Pricing" but nav says "Monetization matrix," their mental model breaks.',
    note: 'Concrete cue: use user vocabulary in labels and IA.',
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
        <article class="question-strip"><span class="question-digit">A</span><div><strong>What can I do here?</strong><p>Shape language implies interaction possibilities.</p></div></article>
        <div class="hybrid-grid">
          <div class="shape-board affordance-board">
            <div class="shape shape-square affordance-main"></div>
            <div class="shape shape-pill affordance-pill"></div>
            <div class="shape shape-circle affordance-dot"></div>
            <div class="shape shape-rect affordance-rail"></div>
          </div>
          <div class="principle-ui">
            <div class="ui-card raised"><span>Book a call</span><b>●</b></div>
            <div class="ui-card flat"><span>Plain text label</span><b>·</b></div>
            <p class="ui-note">Raised and contrasted controls communicate clickability.</p>
          </div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'signifiers') {
    return `
      <div class="stack motion-signifiers">
        <article class="question-strip"><span class="question-digit">S</span><div><strong>Where do I click?</strong><p>Cues point attention to intended action zones.</p></div></article>
        <div class="hybrid-grid">
          <div class="shape-board signifier-board">
            <div class="shape shape-ring signifier-target"></div>
            <div class="shape-arrow arrow-a"></div>
            <div class="shape-arrow arrow-b"></div>
            <div class="shape shape-pill signifier-label"></div>
          </div>
          <div class="principle-ui">
            <div class="ui-row"><span class="ui-tag">Primary CTA</span><span class="ui-arrow">→</span></div>
            <div class="ui-row"><span class="ui-tag">Next section</span><span class="ui-arrow">→</span></div>
            <p class="ui-note">Labels and arrows remove ambiguity about next action.</p>
          </div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'constraints') {
    return `
      <div class="stack motion-constraints">
        <article class="question-strip"><span class="question-digit">C</span><div><strong>What is blocked?</strong><p>Boundaries prevent invalid moves.</p></div></article>
        <div class="hybrid-grid">
          <div class="shape-board constraints-board">
            <div class="shape-cell open"></div>
            <div class="shape-cell blocked"></div>
            <div class="shape-cell open"></div>
            <div class="shape-cell locked"></div>
            <div class="shape-cell blocked"></div>
            <div class="shape-cell open"></div>
            <div class="shape-cell open"></div>
            <div class="shape-cell locked"></div>
            <div class="shape-cell open"></div>
          </div>
          <div class="principle-ui">
            <div class="form-line invalid">Email format invalid</div>
            <div class="form-line valid">Password meets policy</div>
            <button class="ui-submit" type="button" disabled>Submit disabled</button>
            <p class="ui-note">Invalid states block progression before user error spreads.</p>
          </div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'mapping') {
    return `
      <div class="stack">
        <article class="question-strip"><span class="question-digit">M</span><div><strong>Control to outcome</strong><p>Movement in one region maps to another.</p></div></article>
        <div class="hybrid-grid">
          <div class="shape-board mapping-board">
            <div class="mapping-node source"></div>
            <div class="mapping-link"></div>
            <div class="mapping-node target"></div>
            <div class="mapping-node source"></div>
            <div class="mapping-link"></div>
            <div class="mapping-node target"></div>
          </div>
          <div class="principle-ui">
            <div class="mapping-ui-row"><span>Slider left</span><div class="mapping-ui-bar"><i></i></div><span>Card shrinks</span></div>
            <div class="mapping-ui-row"><span>Slider right</span><div class="mapping-ui-bar"><i></i></div><span>Card grows</span></div>
            <p class="ui-note">Users should predict outcome from control direction.</p>
          </div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'feedback') {
    return `
      <div class="stack motion-feedback">
        <article class="question-strip"><span class="question-digit">F</span><div><strong>What happened?</strong><p>System state should visibly change after action.</p></div></article>
        <div class="hybrid-grid">
          <div class="shape-board feedback-board">
            <div class="feedback-orb wait"></div>
            <div class="feedback-orb active"></div>
            <div class="feedback-orb done"></div>
            <div class="feedback-bar"></div>
          </div>
          <div class="principle-ui">
            <div class="status-chip running">Uploading...</div>
            <div class="status-chip success">Saved successfully</div>
            <div class="status-chip quiet">No response = confusion</div>
            <p class="ui-note">Always acknowledge action with explicit system response.</p>
          </div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'model') {
    return `
      <div class="stack">
        <article class="question-strip"><span class="question-digit">CM</span><div><strong>Mental model alignment</strong><p>User expectation and system behavior should overlap.</p></div></article>
        <div class="hybrid-grid">
          <div class="shape-board model-board">
            <div class="model-circle user"></div>
            <div class="model-circle system"></div>
            <div class="model-overlap"></div>
            <div class="model-path"></div>
          </div>
          <div class="principle-ui">
            <div class="expectation-row"><strong>User expects</strong><span>Pricing</span></div>
            <div class="expectation-row mismatch"><strong>System label</strong><span>Monetization matrix</span></div>
            <div class="expectation-row"><strong>Aligned label</strong><span>Pricing</span></div>
            <p class="ui-note">Naming and IA should match user vocabulary.</p>
          </div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'prompt') {
    return `
      <div class="stack">
        <article class="terminal-card">
          <div class="terminal-card-top"><span></span><span></span><span></span></div>
          <pre>Build a mobile-first landing page for founders.

Use design principles:
- Affordance: clickable CTA shapes
- Signifiers: directional cues
- Constraints: invalid states blocked
- Mapping: controls map to outcome
- Feedback: immediate state response
- Conceptual model: expected IA labels

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
