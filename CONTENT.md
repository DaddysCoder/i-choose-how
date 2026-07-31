# Content inventory - I Choose How

Fixed copy lives in js/content.js. This document mirrors the screens and variants for review.

## Shared chrome

- Header brand: light-on-dark monogram + I Choose How
- About: two calm boundary paragraphs (no consent recorded, nothing saved, no legal advice)
- Toolbar (after mode chosen): Read | Listen | Show me | Supporter
- Progress: Step X of Y (no timers)
- Nav: Back | Home | Start again
- Footer (always visible): Does not record consent or give legal advice.

## Shared screens

### 1. Welcome
- Wordmark image (mist-backed crop from logo suite)
- Title (visually hidden): I Choose How
- Tagline (visually hidden / in wordmark): My voice. My choices. My way.
- Short body (no repeated “demo/not real” badge)
- Actions: Start, What is this?

### 2. What is this?
- Explains prototype scope and disclaimers
- Back to welcome

### 3. Choose topic
- Consent - Learn what saying yes or no can mean, in plain language.
- Service agreement - Look at a made-up support agreement, one part at a time.

### 4. Choose how
- Read / Listen / Show me / With a supporter (with short descriptions)

## Consent pathway (4A-8A)

### 4A Example scenario
- Example Support / Sam
- Example Support wants to share Sam's support information
- CTA: Help Sam understand
- Explain: shorter / example / steps
- Safety: I am not sure | I want help | I want more time

### 5A What consent means
- Free yes; can say no; can change mind; can ask for help or time
- Show me: Yes / No / Time / Help cards
- Explain another way + Continue

### 6A Choices
- I understand / I am not sure / I want help / I want more time / I do not want to agree
- Footer visible (shared boundary line)

### 7A Question builder
- Title: What would Sam like to ask?
- Instruction: Choose one or more questions. Sam can also ask for help or more time.
- Multi-select (no typing). Empty selection allowed.
- "I do not have a question yet." is exclusive with other questions.
- Questions:
  - What information will be shared?
  - Who will see it?
  - Why do they need it?
  - How long will they use it?
  - Can I change my mind later?
  - Who can help me decide?
  - I do not have a question yet.

### 8A Summary
- Mode, next-step option, every selected question in plain text (or "None selected")
- "I do not have a question yet." shown neutrally when chosen
- Boundary line remains in the shared footer (no repeated summary disclaimer block)
- Start again / Choose another topic

## Service agreement pathway (4B-8B)

### 4B Example agreement
- Example Support / Sam
- CTA: Help Sam understand

### 5B Four cards (one at a time)
1. Support - weekly community activities
2. Price - $40 per visit (example)
3. Cancellations - one day's notice when possible
4. Responsibilities - respect; ask questions; ask for changes
- Each card: plain sentence + Explain another way

### 6B Choices
- Includes I want something changed
- Also: I understand / I am not sure / I want help / I want more time / I do not want to agree

### 7B Question builder
- Same title and instruction pattern as consent
- Questions:
  - What support will I get?
  - When and where will I get it?
  - How much will it cost?
  - Are there any other charges?
  - What happens if I cancel?
  - How can I change or end the agreement?
  - Who can help me check it?
  - I do not have a question yet.

### 8B Summary
- Mode, option, selected questions
- Boundary line remains in the shared footer
- Start again / Choose another topic

## Modes

| Mode | Behaviour |
|------|-----------|
| Read | Default prose |
| Listen | speechSynthesis with Play / Pause / Restart; never autoplay |
| Show me | Icon-assisted cards for the same ideas |
| Supporter | Participant content + fixed supporter panel text |

Supporter panel (exact):

Supporter: Ask the person how they want the information explained. Read or show the screen, then wait. Do not choose for them. Check whether they want help, a break or more time.

## Explain another way

Presets: Make it shorter | Give me an example | Show the steps

If asked Should I agree?:

I cannot decide for you. You can ask questions, get help or take more time.

## Session memory

- In memory only (no localStorage, cookies, or network persistence)
- Cleared on Home, Start again, and page reload
- Back preserves topic, mode, choice, and selected questions within the session
