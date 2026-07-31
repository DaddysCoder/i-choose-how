/* Router, session state, and screen rendering */
(function () {
  "use strict";

  var state = createState();
  var historyStack = [];
  var els = {};

  function createState() {
    return {
      screen: "welcome",
      topic: null,
      mode: "read",
      choice: null,
      questions: [],
      agreementCardIndex: 0,
      explainVariant: null,
      safetyNote: null,
      focusQuestionId: null
    };
  }

  function resetState(keepScreen) {
    ICH.Speech.stop();
    state = createState();
    if (keepScreen) state.screen = keepScreen;
    historyStack = [];
  }

  function $(id) {
    return document.getElementById(id);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function iconImg(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.width = 48;
    img.height = 48;
    return img;
  }

  function go(screen, options) {
    options = options || {};
    ICH.Speech.stop();
    if (!options.replace && state.screen && state.screen !== screen) {
      historyStack.push({
        screen: state.screen,
        agreementCardIndex: state.agreementCardIndex,
        explainVariant: state.explainVariant,
        safetyNote: state.safetyNote
      });
    }
    state.screen = screen;
    if (options.resetExplain) state.explainVariant = null;
    if (options.safetyNote !== undefined) state.safetyNote = options.safetyNote;
    render();
  }

  function goBack() {
    ICH.Speech.stop();
    if (!historyStack.length) {
      if (state.screen !== "welcome") {
        resetState("welcome");
        render();
      }
      return;
    }
    var prev = historyStack.pop();
    state.screen = prev.screen;
    state.agreementCardIndex = prev.agreementCardIndex;
    state.explainVariant = prev.explainVariant;
    state.safetyNote = prev.safetyNote;
    render();
  }

  function home() {
    resetState("welcome");
    render();
  }

  function startAgain() {
    resetState("welcome");
    render();
  }

  function setMode(mode) {
    state.mode = mode;
    ICH.Speech.stop();
    updateModeTabs();
    ICH.Modes.applyChrome(els.root, state.mode);
    render();
  }

  function updateModeTabs() {
    var tabs = document.querySelectorAll(".mode-tab");
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-mode") === state.mode;
      tab.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function showToolbar(show) {
    els.toolbar.hidden = !show;
  }

  function setProgress(progress) {
    if (!progress) {
      els.progress.hidden = true;
      els.progress.textContent = "";
      return;
    }
    els.progress.hidden = false;
    els.progress.textContent =
      "Step " + progress.current + " of " + progress.total;
  }

  function showDecisionFooter(show) {
    /* Boundary line stays visible; `show` kept for call-site compatibility */
    els.footer.hidden = false;
  }

  function explainBlock(variants, speakParts) {
    var wrap = el("div", "explain-actions");
    var label = el("p", null, "Explain another way");
    wrap.appendChild(label);

    var presets = [
      { id: "shorter", label: "Make it shorter" },
      { id: "example", label: "Give me an example" },
      { id: "steps", label: "Show the steps" }
    ];

    presets.forEach(function (p) {
      var btn = el("button", "btn btn-secondary", p.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", state.explainVariant === p.id ? "true" : "false");
      btn.addEventListener("click", function () {
        state.explainVariant = state.explainVariant === p.id ? null : p.id;
        render();
      });
      wrap.appendChild(btn);
    });

    var shouldAsk = el("button", "btn btn-text", "Should I agree?");
    shouldAsk.type = "button";
    shouldAsk.addEventListener("click", function () {
      state.explainVariant = "cannot";
      render();
    });
    wrap.appendChild(shouldAsk);

    if (state.explainVariant) {
      var panel = el("div", "explain-panel");
      panel.setAttribute("aria-live", "polite");
      if (state.explainVariant === "cannot") {
        panel.appendChild(el("p", null, ICH.CANNOT_DECIDE));
      } else if (state.explainVariant === "steps") {
        panel.appendChild(el("p", null, "Steps:"));
        var ol = el("ol", "steps");
        (variants.steps || []).forEach(function (step) {
          ol.appendChild(el("li", null, step));
        });
        panel.appendChild(ol);
        if (speakParts) speakParts.push((variants.steps || []).join(". "));
      } else if (state.explainVariant === "shorter") {
        panel.appendChild(el("p", null, variants.shorter));
        if (speakParts) speakParts.push(variants.shorter);
      } else if (state.explainVariant === "example") {
        panel.appendChild(el("p", null, variants.example));
        if (speakParts) speakParts.push(variants.example);
      }
      wrap.appendChild(panel);
    }

    return wrap;
  }

  function modeExtras(speakText) {
    var frag = document.createDocumentFragment();
    if (state.mode === "supporter") {
      frag.appendChild(ICH.Modes.renderSupporterPanel());
    }
    if (state.mode === "listen") {
      frag.appendChild(ICH.Modes.renderListenControls(speakText));
    }
    return frag;
  }

  function safetyRow(onPick) {
    var row = el("div", "stack");
    [
      { id: "not_sure", label: "I am not sure" },
      { id: "help", label: "I want help" },
      { id: "more_time", label: "I want more time" }
    ].forEach(function (item) {
      var btn = el("button", "btn btn-choice", item.label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        onPick(item.id);
      });
      row.appendChild(btn);
    });
    return row;
  }

  /* ---------- Screens ---------- */

  function screenWelcome() {
    var c = ICH.CONTENT.welcome;
    var root = el("div", "stack");

    var wordmark = document.createElement("img");
    wordmark.className = "welcome-wordmark";
    wordmark.src = c.wordmark;
    wordmark.alt = c.title + ". " + c.tagline;
    root.appendChild(wordmark);

    var title = el("h1", "visually-hidden", c.title);
    root.appendChild(title);

    var tagline = el("p", "visually-hidden");
    tagline.textContent = c.tagline;
    root.appendChild(tagline);
    root.appendChild(el("p", null, c.body));

    var start = el("button", "btn btn-primary", "Start");
    start.type = "button";
    start.addEventListener("click", function () {
      go("chooseTopic");
    });

    var what = el("button", "btn btn-secondary", "What is this?");
    what.type = "button";
    what.addEventListener("click", function () {
      go("whatIsThis");
    });

    root.appendChild(start);
    root.appendChild(what);
    return { node: root, progress: null, toolbar: false, decision: true };
  }

  function screenWhatIsThis() {
    var c = ICH.CONTENT.whatIsThis;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));
    c.body.forEach(function (p) {
      root.appendChild(el("p", null, p));
    });
    var back = el("button", "btn btn-primary", "Back to welcome");
    back.type = "button";
    back.addEventListener("click", function () {
      goBack();
    });
    root.appendChild(back);
    return { node: root, progress: null, toolbar: false, decision: false };
  }

  function screenChooseTopic() {
    var c = ICH.CONTENT.chooseTopic;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.body));

    Object.keys(ICH.TOPICS).forEach(function (key) {
      var t = ICH.TOPICS[key];
      var card = el("button", "topic-card");
      card.type = "button";
      card.appendChild(el("div", "card-title", t.title));
      card.appendChild(el("p", "card-desc", t.description));
      card.addEventListener("click", function () {
        state.topic = t.id;
        state.choice = null;
        state.questions = [];
        state.agreementCardIndex = 0;
        go("chooseHow");
      });
      root.appendChild(card);
    });

    return { node: root, progress: null, toolbar: false, decision: false };
  }

  function screenChooseHow() {
    var c = ICH.CONTENT.chooseHow;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.body));

    c.options.forEach(function (opt) {
      var card = el("button", "topic-card");
      card.type = "button";
      card.appendChild(el("div", "card-title", opt.label));
      card.appendChild(el("p", "card-desc", opt.desc));
      card.addEventListener("click", function () {
        state.mode = opt.id;
        updateModeTabs();
        if (state.topic === "consent") go("consentScenario");
        else go("agreementScenario");
      });
      root.appendChild(card);
    });

    return { node: root, progress: null, toolbar: false, decision: false };
  }

  function screenConsentScenario() {
    var c = ICH.CONTENT.consentScenario;
    var speak = [c.title, c.body];
    var root = el("div", "stack");
    if (state.mode === "show") root.classList.add("show-mode");

    root.appendChild(el("h1", null, c.title));
    var row = el("div", "icon-row");
    row.appendChild(iconImg(c.icon, "People talking"));
    var meta = el("div");
    meta.appendChild(el("p", "lead", c.org));
    meta.appendChild(el("p", null, "Participant: " + c.person));
    row.appendChild(meta);
    root.appendChild(row);
    root.appendChild(el("p", null, c.body));
    root.appendChild(modeExtras(ICH.Modes.getSpeakableText(speak)));
    root.appendChild(explainBlock(c.explain, speak));

    var cta = el("button", "btn btn-primary", c.cta);
    cta.type = "button";
    cta.addEventListener("click", function () {
      state.explainVariant = null;
      go("consentMeaning");
    });
    root.appendChild(cta);
    root.appendChild(safetyRow(function (id) {
      go("safety", { safetyNote: id });
    }));

    return { node: root, progress: c.progress, toolbar: true, decision: false };
  }

  function screenConsentMeaning() {
    var c = ICH.CONTENT.consentMeaning;
    var speak = [c.title, c.body];
    var root = el("div", "stack");

    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.body));

    if (state.mode === "show") {
      c.showPoints.forEach(function (pt) {
        var card = el("div", "show-card");
        var row = el("div", "icon-row");
        row.appendChild(iconImg(pt.icon, pt.label));
        var text = el("div");
        text.appendChild(el("h3", null, pt.label));
        text.appendChild(el("p", null, pt.text));
        row.appendChild(text);
        card.appendChild(row);
        root.appendChild(card);
        speak.push(pt.label + ". " + pt.text);
      });
    }

    root.appendChild(modeExtras(ICH.Modes.getSpeakableText(speak)));
    root.appendChild(explainBlock(c.explain, speak));

    var next = el("button", "btn btn-primary", "Continue");
    next.type = "button";
    next.addEventListener("click", function () {
      state.explainVariant = null;
      go("consentChoices");
    });
    root.appendChild(next);
    root.appendChild(safetyRow(function (id) {
      go("safety", { safetyNote: id });
    }));

    return { node: root, progress: c.progress, toolbar: true, decision: false };
  }

  function screenConsentChoices() {
    var c = ICH.CONTENT.consentChoices;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.body));
    if (state.mode === "supporter") root.appendChild(ICH.Modes.renderSupporterPanel());

    c.choices.forEach(function (choice) {
      var btn = el("button", "btn btn-choice", choice.label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        state.choice = choice.id;
        if (choice.id === "understand") {
          go("consentQuestions");
        } else {
          go("safety", { safetyNote: choice.id });
        }
      });
      root.appendChild(btn);
    });

    return { node: root, progress: c.progress, toolbar: true, decision: true };
  }

  function toggleQuestion(question, content) {
    var id = question.id;
    var selected = state.questions.indexOf(id) !== -1;
    var noneId = content.noneYetId;

    if (selected) {
      state.questions = state.questions.filter(function (qid) {
        return qid !== id;
      });
      return;
    }

    if (question.exclusive || id === noneId) {
      state.questions = [id];
      return;
    }

    state.questions = state.questions.filter(function (qid) {
      return qid !== noneId;
    });
    state.questions.push(id);
  }

  function renderQuestionBuilder(content, summaryScreen) {
    var root = el("div", "stack");
    root.appendChild(el("h1", null, content.title));
    root.appendChild(el("p", null, content.body));
    if (state.mode === "supporter") root.appendChild(ICH.Modes.renderSupporterPanel());

    var list = el("ul", "question-builder");
    list.setAttribute("role", "group");
    list.setAttribute("aria-label", content.title);

    content.questions.forEach(function (q) {
      var li = document.createElement("li");
      var pressed = state.questions.indexOf(q.id) !== -1;
      var btn = el("button", "question-option");
      btn.type = "button";
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      btn.setAttribute("data-question-id", q.id);

      var mark = el("span", "question-state", pressed ? "☑" : "☐");
      mark.setAttribute("aria-hidden", "true");
      var label = el("span", "question-label", q.label);
      btn.appendChild(mark);
      btn.appendChild(label);

      btn.addEventListener("click", function () {
        toggleQuestion(q, content);
        state.focusQuestionId = q.id;
        render();
      });

      li.appendChild(btn);
      list.appendChild(li);
    });
    root.appendChild(list);

    var next = el("button", "btn btn-primary", "See summary");
    next.type = "button";
    next.addEventListener("click", function () {
      go(summaryScreen);
    });
    root.appendChild(next);

    return { node: root, progress: content.progress, toolbar: true, decision: true };
  }

  function screenConsentQuestions() {
    return renderQuestionBuilder(ICH.CONTENT.consentQuestions, "consentSummary");
  }

  function appendSummary(dl, term, def) {
    dl.appendChild(el("dt", null, term));
    dl.appendChild(el("dd", null, def));
  }

  function appendQuestionSummary(dl, topic) {
    dl.appendChild(el("dt", null, "Questions selected"));
    var dd = document.createElement("dd");
    if (!state.questions.length) {
      dd.textContent = "None selected";
      dl.appendChild(dd);
      return;
    }
    var ul = el("ul", "summary-questions");
    state.questions.forEach(function (id) {
      ul.appendChild(el("li", null, ICH.questionLabel(topic, id)));
    });
    dd.appendChild(ul);
    dl.appendChild(dd);
  }

  function screenConsentSummary() {
    var c = ICH.CONTENT.consentSummary;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));

    var box = el("div", "summary-box");
    var dl = document.createElement("dl");
    appendSummary(dl, "Topic", "Consent");
    appendSummary(dl, "How information was shown", ICH.MODE_LABELS[state.mode] || state.mode);
    appendSummary(dl, "Option chosen", ICH.choiceLabel(state.choice));
    appendQuestionSummary(dl, "consent");
    box.appendChild(dl);
    root.appendChild(box);

    if (c.disclaimer) {
      var notice = el("div", "notice");
      notice.appendChild(el("p", null, c.disclaimer));
      root.appendChild(notice);
    }

    var again = el("button", "btn btn-primary", "Start again");
    again.type = "button";
    again.addEventListener("click", startAgain);
    var other = el("button", "btn btn-secondary", "Choose another topic");
    other.type = "button";
    other.addEventListener("click", function () {
      ICH.Speech.stop();
      state.topic = null;
      state.choice = null;
      state.questions = [];
      state.agreementCardIndex = 0;
      state.explainVariant = null;
      historyStack = [];
      go("chooseTopic", { replace: true });
    });
    root.appendChild(again);
    root.appendChild(other);

    return { node: root, progress: c.progress, toolbar: true, decision: true };
  }

  function screenAgreementScenario() {
    var c = ICH.CONTENT.agreementScenario;
    var speak = [c.title, c.body];
    var root = el("div", "stack");

    root.appendChild(el("h1", null, c.title));
    var row = el("div", "icon-row");
    row.appendChild(iconImg(c.icon, "Document"));
    var meta = el("div");
    meta.appendChild(el("p", "lead", c.org));
    meta.appendChild(el("p", null, "Participant: " + c.person));
    row.appendChild(meta);
    root.appendChild(row);
    root.appendChild(el("p", null, c.body));
    root.appendChild(modeExtras(ICH.Modes.getSpeakableText(speak)));
    root.appendChild(explainBlock(c.explain, speak));

    var cta = el("button", "btn btn-primary", c.cta);
    cta.type = "button";
    cta.addEventListener("click", function () {
      state.explainVariant = null;
      state.agreementCardIndex = 0;
      go("agreementCards");
    });
    root.appendChild(cta);
    root.appendChild(safetyRow(function (id) {
      go("safety", { safetyNote: id });
    }));

    return { node: root, progress: c.progress, toolbar: true, decision: false };
  }

  function screenAgreementCards() {
    var c = ICH.CONTENT.agreementCards;
    var cards = c.cards;
    var index = state.agreementCardIndex || 0;
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    state.agreementCardIndex = index;
    var card = cards[index];
    var speak = [card.title, card.body];

    var root = el("div", "stack agreement-step");
    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.intro));
    root.appendChild(
      el("p", "lead", "Part " + (index + 1) + " of " + cards.length + ": " + card.title)
    );

    var showCard = el("div", state.mode === "show" ? "show-card" : "info-card");
    if (state.mode === "show") {
      var row = el("div", "icon-row");
      row.appendChild(iconImg(card.icon, card.title));
      var text = el("div");
      text.appendChild(el("h3", null, card.title));
      text.appendChild(el("p", null, card.body));
      row.appendChild(text);
      showCard.appendChild(row);
    } else {
      showCard.appendChild(el("h3", null, card.title));
      showCard.appendChild(el("p", null, card.body));
    }
    root.appendChild(showCard);

    root.appendChild(modeExtras(ICH.Modes.getSpeakableText(speak)));
    root.appendChild(explainBlock(card.explain, speak));

    var nav = el("div", "stack");
    if (index > 0) {
      var prev = el("button", "btn btn-secondary", "Previous part");
      prev.type = "button";
      prev.addEventListener("click", function () {
        state.explainVariant = null;
        state.agreementCardIndex = index - 1;
        render();
      });
      nav.appendChild(prev);
    }

    if (index < cards.length - 1) {
      var nextPart = el("button", "btn btn-primary", "Next part");
      nextPart.type = "button";
      nextPart.addEventListener("click", function () {
        state.explainVariant = null;
        state.agreementCardIndex = index + 1;
        render();
      });
      nav.appendChild(nextPart);
    } else {
      var cont = el("button", "btn btn-primary", "Continue");
      cont.type = "button";
      cont.addEventListener("click", function () {
        state.explainVariant = null;
        go("agreementChoices");
      });
      nav.appendChild(cont);
    }
    root.appendChild(nav);
    root.appendChild(safetyRow(function (id) {
      go("safety", { safetyNote: id });
    }));

    return { node: root, progress: c.progress, toolbar: true, decision: false };
  }

  function screenAgreementChoices() {
    var c = ICH.CONTENT.agreementChoices;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.body));
    if (state.mode === "supporter") root.appendChild(ICH.Modes.renderSupporterPanel());

    c.choices.forEach(function (choice) {
      var btn = el("button", "btn btn-choice", choice.label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        state.choice = choice.id;
        if (choice.id === "understand") {
          go("agreementQuestions");
        } else {
          go("safety", { safetyNote: choice.id });
        }
      });
      root.appendChild(btn);
    });

    return { node: root, progress: c.progress, toolbar: true, decision: true };
  }

  function screenAgreementQuestions() {
    return renderQuestionBuilder(ICH.CONTENT.agreementQuestions, "agreementSummary");
  }

  function screenAgreementSummary() {
    var c = ICH.CONTENT.agreementSummary;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));

    var box = el("div", "summary-box");
    var dl = document.createElement("dl");
    appendSummary(dl, "Topic", "Service agreement");
    appendSummary(dl, "How information was shown", ICH.MODE_LABELS[state.mode] || state.mode);
    appendSummary(dl, "Option chosen", ICH.choiceLabel(state.choice));
    appendQuestionSummary(dl, "agreement");
    box.appendChild(dl);
    root.appendChild(box);

    if (c.disclaimer) {
      var notice = el("div", "notice");
      notice.appendChild(el("p", null, c.disclaimer));
      root.appendChild(notice);
    }

    var again = el("button", "btn btn-primary", "Start again");
    again.type = "button";
    again.addEventListener("click", startAgain);
    var other = el("button", "btn btn-secondary", "Choose another topic");
    other.type = "button";
    other.addEventListener("click", function () {
      ICH.Speech.stop();
      state.topic = null;
      state.choice = null;
      state.questions = [];
      state.agreementCardIndex = 0;
      state.explainVariant = null;
      historyStack = [];
      go("chooseTopic", { replace: true });
    });
    root.appendChild(again);
    root.appendChild(other);

    return { node: root, progress: c.progress, toolbar: true, decision: true };
  }

  function screenSafety() {
    var id = state.safetyNote || "not_sure";
    var c = ICH.CONTENT.helpScreens[id] || ICH.CONTENT.helpScreens.not_sure;
    var root = el("div", "stack");
    root.appendChild(el("h1", null, c.title));
    root.appendChild(el("p", null, c.body));
    root.appendChild(el("p", null, ICH.CANNOT_DECIDE));

    if (state.mode === "supporter") root.appendChild(ICH.Modes.renderSupporterPanel());

    var continuePath = el("button", "btn btn-primary", "Continue to questions");
    continuePath.type = "button";
    continuePath.addEventListener("click", function () {
      if (state.topic === "agreement") go("agreementQuestions");
      else go("consentQuestions");
    });

    var backChoices = el("button", "btn btn-secondary", "Back to choices");
    backChoices.type = "button";
    backChoices.addEventListener("click", function () {
      if (state.topic === "agreement") go("agreementChoices", { replace: true });
      else go("consentChoices", { replace: true });
    });

    root.appendChild(continuePath);
    root.appendChild(backChoices);

    var progress =
      state.topic === "agreement"
        ? ICH.CONTENT.agreementChoices.progress
        : ICH.CONTENT.consentChoices.progress;

    return { node: root, progress: progress, toolbar: true, decision: true };
  }

  var screens = {
    welcome: screenWelcome,
    whatIsThis: screenWhatIsThis,
    chooseTopic: screenChooseTopic,
    chooseHow: screenChooseHow,
    consentScenario: screenConsentScenario,
    consentMeaning: screenConsentMeaning,
    consentChoices: screenConsentChoices,
    consentQuestions: screenConsentQuestions,
    consentSummary: screenConsentSummary,
    agreementScenario: screenAgreementScenario,
    agreementCards: screenAgreementCards,
    agreementChoices: screenAgreementChoices,
    agreementQuestions: screenAgreementQuestions,
    agreementSummary: screenAgreementSummary,
    safety: screenSafety
  };

  function render() {
    var fn = screens[state.screen] || screenWelcome;
    var view = fn();
    els.main.innerHTML = "";
    els.main.appendChild(view.node);
    showToolbar(!!view.toolbar);
    setProgress(view.progress);
    showDecisionFooter(!!view.decision);
    updateModeTabs();
    ICH.Modes.applyChrome(els.root, state.mode);
    els.btnBack.disabled = state.screen === "welcome" && historyStack.length === 0;

    if (state.focusQuestionId) {
      var restore = els.main.querySelector(
        '[data-question-id="' + state.focusQuestionId + '"]'
      );
      state.focusQuestionId = null;
      if (restore) {
        restore.focus({ preventScroll: false });
        return;
      }
    }
    els.main.focus({ preventScroll: true });
  }

  function openAbout() {
    els.aboutBody.innerHTML = "";
    ICH.ABOUT_TEXT.forEach(function (p) {
      els.aboutBody.appendChild(el("p", null, p));
    });
    els.about.hidden = false;
    els.aboutClose.focus();
  }

  function closeAbout() {
    els.about.hidden = true;
    els.btnAbout.focus();
  }

  function bind() {
    els.root = $("app-root");
    els.main = $("main");
    els.toolbar = $("explanation-toolbar");
    els.progress = $("progress-label");
    els.footer = $("decision-footer");
    els.btnBack = $("btn-back");
    els.btnHome = $("btn-home");
    els.btnRestart = $("btn-restart");
    els.btnAbout = $("btn-about");
    els.about = $("about-dialog");
    els.aboutBody = $("about-body");
    els.aboutClose = $("btn-about-close");

    els.btnBack.addEventListener("click", goBack);
    els.btnHome.addEventListener("click", home);
    els.btnRestart.addEventListener("click", startAgain);
    els.btnAbout.addEventListener("click", openAbout);
    els.aboutClose.addEventListener("click", closeAbout);

    els.about.addEventListener("click", function (e) {
      if (e.target === els.about) closeAbout();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !els.about.hidden) {
        closeAbout();
      }
    });

    document.querySelectorAll(".mode-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setMode(tab.getAttribute("data-mode"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bind();
    render();
  });
})();
