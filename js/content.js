/* Fixed copy and explain variants for I Choose How prototype */
window.ICH = window.ICH || {};

ICH.ABOUT_TEXT = [
  "This is a fictional demonstration of how a digital tool might help someone choose how information is explained before a decision.",
  "It does not record consent, collect personal information, connect to any real service, or give legal advice.",
  "Nothing you tap is saved after you leave or start again. Names and scenarios are made up for demonstration only.",
  "If you need real advice about consent or agreements, speak with a trusted person or a qualified professional."
];

ICH.CANNOT_DECIDE =
  "I cannot decide for you. You can ask questions, get help or take more time.";

ICH.SUPPORTER_PANEL =
  "Supporter: Ask the person how they want the information explained. Read or show the screen, then wait. Do not choose for them. Check whether they want help, a break or more time.";

ICH.MODE_LABELS = {
  read: "Read",
  listen: "Listen",
  show: "Show me",
  supporter: "With a supporter"
};

ICH.TOPICS = {
  consent: {
    id: "consent",
    title: "Consent",
    description: "Learn what saying yes or no can mean, in plain language."
  },
  agreement: {
    id: "agreement",
    title: "Service agreement",
    description: "Look at a made-up support agreement, one part at a time."
  }
};

ICH.CONTENT = {
  welcome: {
    title: "I Choose How",
    tagline: "My voice. My choices. My way.",
    taglineParts: [
      { text: "My voice. ", accent: false },
      { text: "My choices. ", accent: true },
      { text: "My way.", accent: false }
    ],
    body:
      "This fictional demonstration shows how someone might choose how information is explained before they decide. Nothing here is real consent or a real agreement.",
    fictional: "Fictional demonstration only",
    wordmark: "assets/brand/wordmark.png"
  },

  whatIsThis: {
    title: "What is this?",
    body: [
      "I Choose How is a clickable prototype. It shows two made-up pathways: consent, and a service agreement.",
      "You can try Read, Listen, Show me, or With a supporter. You can change how information is shown at any time.",
      "This demonstration does not record consent or provide legal advice."
    ]
  },

  chooseTopic: {
    title: "Choose a topic",
    body: "Pick one pathway to explore. You can come back and try the other later."
  },

  chooseHow: {
    title: "Choose how",
    body: "How do you want information explained in this demonstration?",
    options: [
      { id: "read", label: "Read", desc: "Plain text I can read at my pace." },
      { id: "listen", label: "Listen", desc: "Hear the words using my browser. I press Play." },
      { id: "show", label: "Show me", desc: "Icons and short cards to support the same ideas." },
      { id: "supporter", label: "With a supporter", desc: "I stay in control. A supporter gets clear guidance." }
    ]
  },

  consentScenario: {
    step: "4A",
    progress: { current: 1, total: 5 },
    title: "Pretend scenario",
    org: "Example Support",
    person: "Sam",
    body:
      "Example Support wants to share Sam's support information. Before that happens, Sam needs to understand what consent means. This is only a pretend story.",
    cta: "Help Sam understand",
    icon: "assets/icons/people.svg",
    explain: {
      shorter:
        "Example Support wants to share Sam's support information. Sam needs to understand consent first. This is only a pretend story.",
      example:
        "Example: Before a helper looks at Sam's plan, they ask Sam if that is okay. Sam can say yes, no, or ask for more time.",
      steps: [
        "Meet Example Support (pretend).",
        "Learn what consent means.",
        "Choose what feels right for Sam.",
        "Answer a few practice questions.",
        "See a summary — still not real consent."
      ]
    }
  },

  consentMeaning: {
    step: "5A",
    progress: { current: 2, total: 5 },
    title: "What consent means",
    body:
      "Consent means saying yes freely, knowing what you are saying yes to. You can also say no. You can change your mind. You can ask for help or more time.",
    showPoints: [
      { icon: "assets/icons/yes.svg", label: "Yes", text: "Say yes when you understand and agree." },
      { icon: "assets/icons/no.svg", label: "No", text: "Say no if you do not agree." },
      { icon: "assets/icons/time.svg", label: "Time", text: "Ask for more time if you need it." },
      { icon: "assets/icons/help.svg", label: "Help", text: "Ask someone you trust for help." }
    ],
    explain: {
      shorter:
        "Consent is a free yes. You can say no. You can change your mind. You can ask for help or time.",
      example:
        "Example: Someone asks to read your notes. If you understand and say yes, that is consent. If you say no, they should stop.",
      steps: [
        "Hear what is being asked.",
        "Check that you understand.",
        "Decide yes, no, help, or more time.",
        "Know you can change your mind later."
      ]
    }
  },

  consentChoices: {
    step: "6A",
    progress: { current: 3, total: 5 },
    title: "What would Sam like to do?",
    body: "This is practice only. Nothing here records real consent.",
    choices: [
      { id: "understand", label: "I understand" },
      { id: "not_sure", label: "I am not sure" },
      { id: "help", label: "I want help" },
      { id: "more_time", label: "I want more time" },
      { id: "do_not_agree", label: "I do not want to agree" }
    ]
  },

  consentQuestions: {
    step: "7A",
    progress: { current: 4, total: 5 },
    title: "What would Sam like to ask?",
    body: "Choose one or more questions. Sam can also ask for help or more time.",
    noneYetId: "cq_none",
    questions: [
      { id: "cq1", label: "What information will be shared?" },
      { id: "cq2", label: "Who will see it?" },
      { id: "cq3", label: "Why do they need it?" },
      { id: "cq4", label: "How long will they use it?" },
      { id: "cq5", label: "Can I change my mind later?" },
      { id: "cq6", label: "Who can help me decide?" },
      { id: "cq_none", label: "I do not have a question yet.", exclusive: true }
    ]
  },

  consentSummary: {
    step: "8A",
    progress: { current: 5, total: 5 },
    title: "Summary",
    disclaimer:
      "This did not give consent. It was only a fictional demonstration. No consent was recorded."
  },

  agreementScenario: {
    step: "4B",
    progress: { current: 1, total: 5 },
    title: "Fictional agreement",
    org: "Example Support",
    person: "Sam",
    body:
      "Example Support has a made-up service agreement for Sam. We will look at it in plain language. You will not be asked to sign anything.",
    cta: "Help Sam understand",
    icon: "assets/icons/document.svg",
    explain: {
      shorter:
        "This is a pretend agreement. We will explain parts in plain words. No signing.",
      example:
        "Example: A flyer that says what support costs and how to cancel — written so Sam can follow it.",
      steps: [
        "Open the pretend agreement.",
        "Read each part: support, price, cancellations, responsibilities.",
        "Choose what Sam wants to do.",
        "Answer practice questions.",
        "See a summary — still not a signed agreement."
      ]
    }
  },

  agreementCards: {
    step: "5B",
    progress: { current: 2, total: 5 },
    title: "What the agreement covers",
    intro: "Look at each part. Use Explain another way if you want.",
    cards: [
      {
        id: "support",
        title: "Support",
        body: "Example Support will help Sam with weekly community activities.",
        icon: "assets/icons/support.svg",
        explain: {
          shorter: "They help Sam with weekly community activities.",
          example:
            "Example: Going to a local group together once a week.",
          steps: [
            "Agree what support looks like.",
            "Set a weekly activity time.",
            "Check it still suits Sam."
          ]
        }
      },
      {
        id: "price",
        title: "Price",
        body: "The made-up cost is $40 for each visit. This is not a real charge.",
        icon: "assets/icons/price.svg",
        explain: {
          shorter: "Pretend cost: $40 each visit. Not a real bill.",
          example:
            "Example: If Sam has two visits in a week, the pretend total is $80.",
          steps: [
            "See the price per visit.",
            "Count how many visits.",
            "Ask questions if the number is unclear."
          ]
        }
      },
      {
        id: "cancellations",
        title: "Cancellations",
        body: "Sam can cancel a visit. Example Support asks for one day's notice when possible.",
        icon: "assets/icons/cancel.svg",
        explain: {
          shorter: "Sam can cancel. Try to give one day's notice.",
          example:
            "Example: If Sam is unwell, Sam or a supporter tells Example Support the day before.",
          steps: [
            "Decide you need to cancel.",
            "Tell Example Support.",
            "Give one day's notice if you can."
          ]
        }
      },
      {
        id: "responsibilities",
        title: "Responsibilities",
        body: "Example Support must treat Sam with respect. Sam can ask questions and say if something needs to change.",
        icon: "assets/icons/respect.svg",
        explain: {
          shorter:
            "Respect both ways. Sam can ask questions and ask for changes.",
          example:
            "Example: If a time does not work, Sam can ask to change it.",
          steps: [
            "Expect respectful support.",
            "Ask questions when unsure.",
            "Say if something should change."
          ]
        }
      }
    ]
  },

  agreementChoices: {
    step: "6B",
    progress: { current: 3, total: 5 },
    title: "What would Sam like to do?",
    body: "This is practice only. You will not be asked to sign or accept a real agreement.",
    choices: [
      { id: "understand", label: "I understand" },
      { id: "not_sure", label: "I am not sure" },
      { id: "help", label: "I want help" },
      { id: "more_time", label: "I want more time" },
      { id: "change", label: "I want something changed" },
      { id: "do_not_agree", label: "I do not want to agree" }
    ]
  },

  agreementQuestions: {
    step: "7B",
    progress: { current: 4, total: 5 },
    title: "What would Sam like to ask?",
    body: "Choose one or more questions. Sam can also ask for help or more time.",
    noneYetId: "aq_none",
    questions: [
      { id: "aq1", label: "What support will I get?" },
      { id: "aq2", label: "When and where will I get it?" },
      { id: "aq3", label: "How much will it cost?" },
      { id: "aq4", label: "Are there any other charges?" },
      { id: "aq5", label: "What happens if I cancel?" },
      { id: "aq6", label: "How can I change or end the agreement?" },
      { id: "aq7", label: "Who can help me check it?" },
      { id: "aq_none", label: "I do not have a question yet.", exclusive: true }
    ]
  },

  agreementSummary: {
    step: "8B",
    progress: { current: 5, total: 5 },
    title: "Summary",
    disclaimer:
      "This did not sign or accept an agreement. It was only a fictional demonstration. Nothing was legally accepted."
  },

  helpScreens: {
    not_sure: {
      title: "It is okay to be unsure",
      body:
        "You do not have to decide now. You can go back, ask for help, or take more time."
    },
    help: {
      title: "Getting help",
      body:
        "In real life, ask a trusted person or an advocate. In this demo, use Back, or choose With a supporter in the toolbar."
    },
    more_time: {
      title: "Take more time",
      body:
        "There is no timer here. Pause, come back later, or Start again when you are ready."
    },
    change: {
      title: "Wanting a change",
      body:
        "In a real agreement, you can ask for changes before you agree. This demo does not send requests anywhere."
    },
    do_not_agree: {
      title: "Not agreeing",
      body:
        "Saying no is a valid choice. This demonstration does not record that choice as real consent or a real refusal on file."
    }
  }
};

ICH.choiceLabel = function (choiceId) {
  var all = []
    .concat(ICH.CONTENT.consentChoices.choices)
    .concat(ICH.CONTENT.agreementChoices.choices);
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === choiceId) return all[i].label;
  }
  return choiceId || "-";
};

ICH.questionLabel = function (topic, questionId) {
  var source =
    topic === "consent"
      ? ICH.CONTENT.consentQuestions.questions
      : ICH.CONTENT.agreementQuestions.questions;
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === questionId) return source[i].label;
  }
  return questionId || "-";
};
