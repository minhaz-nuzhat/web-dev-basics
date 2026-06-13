const clips = [
  {
    number: '01',
    nav: 'Intro',
    kicker: 'Identity frame',
    title: 'Nuzhat Minhaz',
    subtitle: 'Product @ Apps & agents<br>Platform Observability',
    body: 'Microsoft CoreAI, Developer Division',
    note: 'Use as your opening personal credibility card.',
    type: 'intro'
  },
  {
    number: '02',
    nav: 'Generated',
    kicker: 'What AI gives by default',
    title: 'Generated',
    body: 'Fast output, low context, repetitive patterns.',
    note: 'Animate as mechanical, repeated sections.',
    type: 'generated'
  },
  {
    number: '03',
    nav: 'Designed',
    kicker: 'What planning changes',
    title: 'Designed + Planned',
    body: 'Intentional hierarchy, constraints, and interaction logic.',
    note: 'Animate as rhythm, contrast, and structure.',
    type: 'planned'
  },
  {
    number: '04',
    nav: 'Norman List',
    kicker: 'The holy grail',
    title: "Don Norman's Principles",
    body: '',
    note: 'Use this as your principle index card.',
    type: 'norman-list'
  },
  {
    number: '05',
    nav: 'Affordance',
    kicker: 'Norman principle',
    title: 'Affordance',
    body: 'The design should suggest what actions are possible.',
    note: 'Raised CTA vs plain text example.',
    type: 'affordance'
  },
  {
    number: '06',
    nav: 'Signifiers',
    kicker: 'Norman principle',
    title: 'Signifiers',
    body: 'Visible cues should show where and how to act.',
    note: 'Labels and arrows should reduce guessing.',
    type: 'signifiers'
  },
  {
    number: '07',
    nav: 'Constraints',
    kicker: 'Norman principle',
    title: 'Constraints',
    body: 'Good design limits wrong actions before mistakes happen.',
    note: 'Invalid email and disabled submit pattern.',
    type: 'constraints'
  },
  {
    number: '08',
    nav: 'Mapping',
    kicker: 'Norman principle',
    title: 'Mapping',
    body: 'Controls should feel naturally connected to outcomes.',
    note: 'Slider direction should match visible result.',
    type: 'mapping'
  },
  {
    number: '09',
    nav: 'Feedback',
    kicker: 'Norman principle',
    title: 'Feedback',
    body: 'The system should immediately show what happened after action.',
    note: 'Uploading state then success confirmation.',
    type: 'feedback'
  },
  {
    number: '10',
    nav: 'Conceptual Model',
    kicker: 'Norman principle',
    title: 'Conceptual Model',
    body: 'The interface should match how users think it works.',
    note: 'User vocabulary should match IA labels.',
    type: 'model'
  },
  {
    number: '11',
    nav: 'Foundations',
    kicker: 'Design foundations',
    title: 'Core Design Foundations',
    body: '',
    note: 'List card only, not individual screens.',
    type: 'foundations-list'
  },
  {
    number: '12',
    nav: 'More Standards',
    kicker: 'UI/UX practice',
    title: 'And this is only the start.',
    body: 'building from scratch requires elite ball knowledge of many more standards, principles, heuristics to build systems that are usable and scalable.',
    note: 'Bridge line into deeper content / next reel.',
    type: 'standards-line'
  },
  {
    number: '13',
    nav: 'User Needs',
    kicker: 'Poster study',
    title: 'Start with user needs',
    note: 'Poster study',
    type: 'poster',
    poster: 'user-needs'
  },
  {
    number: '14',
    nav: 'Do Less',
    kicker: 'Poster study',
    title: 'Do less',
    note: 'Poster study',
    type: 'poster',
    poster: 'do-less'
  },
  {
    number: '15',
    nav: 'Data',
    kicker: 'Poster study',
    title: 'Design with data',
    note: 'Poster study',
    type: 'poster',
    poster: 'data'
  },
  {
    number: '16',
    nav: 'Simple',
    kicker: 'Poster study',
    title: 'Make it simple',
    note: 'Poster study',
    type: 'poster',
    poster: 'simple'
  },
  {
    number: '17',
    nav: 'Iterate',
    kicker: 'Poster study',
    title: 'Iterate again',
    note: 'Poster study',
    type: 'poster',
    poster: 'iterate'
  },
  {
    number: '18',
    nav: 'Everyone',
    kicker: 'Poster study',
    title: 'This is for everyone',
    note: 'Poster study',
    type: 'poster',
    poster: 'everyone'
  },
  {
    number: '19',
    nav: 'Context',
    kicker: 'Poster study',
    title: 'Understand context',
    note: 'Poster study',
    type: 'poster',
    poster: 'context'
  },
  {
    number: '20',
    nav: 'Services',
    kicker: 'Poster study',
    title: 'Build digital services',
    note: 'Poster study',
    type: 'poster',
    poster: 'services'
  },
  {
    number: '21',
    nav: 'Consistent',
    kicker: 'Poster study',
    title: 'Be consistent',
    note: 'Poster study',
    type: 'poster',
    poster: 'consistent'
  },
  {
    number: '22',
    nav: 'Open',
    kicker: 'Poster study',
    title: 'Make things open',
    note: 'Poster study',
    type: 'poster',
    poster: 'open'
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

function renderPoster(clip) {
  if (clip.poster === 'user-needs') {
    return `
      <section class="poster poster-user-needs">
        <div class="poster-user-needs-stack">
          <div class="poster-pill poster-pill-start">Start</div>
          <div class="poster-word-stack poster-word-stack-cutout">
            <span>with</span>
            <span>user</span>
            <span>needs</span>
          </div>
        </div>
      </section>
    `;
  }

  if (clip.poster === 'do-less') {
    return `
      <section class="poster poster-do-less">
        <div class="poster-check-column">
          <div class="do-less-icon"><span class="mark-left"></span><span class="mark-right"></span><span class="mark-check"></span></div>
          <div class="do-less-icon"><span class="mark-left"></span><span class="mark-right"></span><span class="mark-check"></span></div>
          <div class="do-less-icon"><span class="mark-left"></span><span class="mark-right"></span><span class="mark-check"></span></div>
          <div class="do-less-icon"><span class="mark-left"></span><span class="mark-right"></span><span class="mark-check"></span></div>
          <div class="do-less-icon"><span class="mark-left"></span><span class="mark-right"></span><span class="mark-check"></span></div>
        </div>
        <div class="poster-do-less-text"><span>Do</span><strong>less</strong></div>
      </section>
    `;
  }

  if (clip.poster === 'data') {
    return `
      <section class="poster poster-data">
        <div class="poster-highlight">Design</div>
        <div class="poster-line">with</div>
        <div class="data-word data-zigzag">
          <span class="data-node node-d">d</span>
          <span class="data-node node-a1">a</span>
          <span class="data-node node-t">t</span>
          <span class="data-node node-a2">a</span>
          <i class="data-link link-1"></i>
          <i class="data-link link-2"></i>
          <i class="data-link link-3"></i>
        </div>
      </section>
    `;
  }

  if (clip.poster === 'simple') {
    return `
      <section class="poster poster-simple">
        <div class="simple-top">Do the</div>
        <div class="simple-strike">difficult</div>
        <div class="simple-strike">complicated</div>
        <div class="simple-strong">hard work</div>
        <div class="simple-mid">to make it</div>
        <div class="simple-accent">simple</div>
      </section>
    `;
  }

  if (clip.poster === 'iterate') {
    return `
      <section class="poster poster-iterate">
        <div class="iterate-stack">
          <span>Iterate.</span>
          <span>Iterate.</span>
          <span>Iterate.</span>
          <span>Iterate.</span>
          <span>Iterate.</span>
          <span>Iterate.</span>
        </div>
        <div class="iterate-end">Then<br><em>iterate again</em></div>
      </section>
    `;
  }

  if (clip.poster === 'everyone') {
    return `
      <section class="poster poster-everyone">
        <div class="poster-highlight large">This<br>is for</div>
        <div class="everyone-grid">
          <span class="everyone-one one-a">one</span>
          <span class="everyone-one one-b">one</span>
          <span class="everyone-one one-c">one</span>
        </div>
        <div class="poster-accent-line poster-accent-line-everyone">everyone</div>
      </section>
    `;
  }

  if (clip.poster === 'context') {
    return `
      <section class="poster poster-context">
        <div class="context-top">Under-</div>
        <div class="context-mid">stand</div>
        <div class="context-bottom">context</div>
      </section>
    `;
  }

  if (clip.poster === 'services') {
    return `
      <section class="poster poster-services">
        <div class="services-top">Build</div>
        <div class="services-accent">digital<br>services</div>
        <div class="services-bottom">not web-<br>sites</div>
        <svg viewBox="0 0 260 84" class="services-line" aria-hidden="true">
          <path d="M12 48 C 38 22, 70 68, 98 44 S 150 24, 178 50 S 218 74, 248 46" />
        </svg>
      </section>
    `;
  }

  if (clip.poster === 'consistent') {
    return `
      <section class="poster poster-consistent">
        <div class="poster-highlight">Be<br>consistent</div>
        <div class="consistent-mirror"><span>not</span><span>uniform</span></div>
      </section>
    `;
  }

  if (clip.poster === 'open') {
    return `
      <section class="poster poster-open">
        <div class="open-line open-line-top">
          <span>M</span><span class="block accent"></span><span>ke</span>
        </div>
        <div class="open-line">
          <span>thin</span><span class="block accent tall"></span><span>s</span>
        </div>
        <div class="open-line">
          <span>open;</span>
        </div>
        <div class="open-line dark-line">
          <span>It m</span><span class="block dark"></span><span>kes</span>
        </div>
        <div class="open-line dark-line">
          <span>thin</span><span class="block dark tall"></span><span>s</span>
        </div>
        <div class="open-line dark-line">
          <span>better</span>
        </div>
      </section>
    `;
  }

  return '';
}

function renderType(clip) {
  if (clip.type === 'intro') {
    return `
      <div class="stack">
        <article class="terminal-card intro-card">
          <div class="terminal-card-top"><span></span><span></span><span></span></div>
          <div class="intro-lines">
            <h3>Curent Focus</h3>
            <p>products that shape how developers ship, monitor, diagnose, and scale responsibly.</p>
          </div>
        </article>
      </div>
    `;
  }

  if (clip.type === 'generated') {
    return `
      <div class="stack">
        <div class="shape-board generated-board">
          <div class="gen-strip"></div>
          <div class="gen-strip"></div>
          <div class="gen-strip"></div>
          <div class="gen-strip"></div>
          <div class="gen-strip"></div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'planned') {
    return `
      <div class="stack">
        <div class="shape-board planned-board">
          <div class="plan-hero"></div>
          <div class="plan-grid">
            <span></span><span></span><span></span>
          </div>
          <div class="plan-line"></div>
        </div>
      </div>
    `;
  }

  if (clip.type === 'norman-list') {
    return `
      <div class="stack">
        <div class="definition-grid">
          <div class="definition-card"><strong>Affordance</strong><p>possible action</p></div>
          <div class="definition-card"><strong>Signifiers</strong><p>visible cues</p></div>
          <div class="definition-card"><strong>Constraints</strong><p>prevent errors</p></div>
          <div class="definition-card"><strong>Mapping</strong><p>control to result</p></div>
          <div class="definition-card"><strong>Feedback</strong><p>system response</p></div>
          <div class="definition-card"><strong>Conceptual Model</strong><p>mental alignment</p></div>
        </div>
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

  if (clip.type === 'foundations-list') {
    return `
      <div class="stack">
        <div class="terminal-card">
          <div class="terminal-card-top"><span></span><span></span><span></span></div>
          <pre>Design foundations:
- Hierarchy
- Contrast
- Alignment
- Proximity
- White space
- Consistency
- Typography
- Color
- Accessibility
- Responsive design</pre>
        </div>
      </div>
    `;
  }

  if (clip.type === 'standards-line') {
    return `
      <div class="stack">
        <article class="definition-grid">
          <div class="definition-card"><strong>Also in practice</strong><p>Heuristics</p></div>
          <div class="definition-card"><strong>Also in practice</strong><p>Accessibility standards</p></div>
          <div class="definition-card"><strong>Also in practice</strong><p>Pattern libraries</p></div>
          <div class="definition-card"><strong>Also in practice</strong><p>Platform guidelines</p></div>
        </article>
      </div>
    `;
  }

  return '';
}

function animatePosterSequence() {
  const poster = clipViewport.querySelector('.poster');
  if (!poster) {
    return;
  }

  const sequenceSelectors = [
    '.poster-pill-start',
    '.poster-word-stack span',
    '.do-less-icon',
    '.poster-do-less-text span',
    '.poster-do-less-text strong',
    '.poster-highlight',
    '.poster-line',
    '.data-node',
    '.data-link',
    '.simple-top',
    '.simple-strike',
    '.simple-strong',
    '.simple-mid',
    '.simple-accent',
    '.iterate-stack span',
    '.iterate-end',
    '.everyone-one',
    '.poster-accent-line',
    '.context-top',
    '.context-mid',
    '.context-bottom',
    '.services-top',
    '.services-accent',
    '.services-bottom',
    '.services-line',
    '.consistent-mirror span',
    '.open-line'
  ];

  const orderedElements = [];
  sequenceSelectors.forEach((selector) => {
    poster.querySelectorAll(selector).forEach((element) => {
      orderedElements.push(element);
    });
  });

  const uniqueElements = [...new Set(orderedElements)];
  uniqueElements.forEach((element, index) => {
    element.animate(
      [
        { opacity: 0 },
        { opacity: 1 }
      ],
      {
        duration: 340,
        delay: index * 95,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both'
      }
    );
  });
}

function renderClip(index) {
  const clip = clips[index];

  if (clip.type === 'poster') {
    clipViewport.innerHTML = `
      <article class="clip-scene scene-poster scene-${clip.poster}">
        <div class="scene-frame poster-frame">
          ${renderPoster(clip)}
        </div>
      </article>
    `;
  } else {
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
  }

  if (clip.type === 'poster') {
    animatePosterSequence();
  }

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