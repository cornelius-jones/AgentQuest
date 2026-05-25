# AgentQuest

A gamified learning tracker for anyone who wants to go from zero to deploying their own AI agent. Built with React and deployed on Netlify.

---

## What it does

AgentQuest turns a 10–12 week learning curriculum into a quest-style progression system. The goal is to make it easier to stay consistent when picking up a new technical skill by giving you clear milestones, a sense of forward momentum, and direct links to the right resources at every step.

**Features:**
- Four learning phases, each broken into milestones and individual tasks
- XP and leveling system that rewards progress (480 XP total, 6 levels)
- Per-task resource links so you always know exactly where to go next
- Progress bars at the phase and milestone level
- Level-up notifications when you hit a new rank
- Progress saved to localStorage — picks up where you left off on every visit

---

## The curriculum

The app covers the full path from learning fundamentals to shipping a working agent:

| Phase | Topic | Duration |
|-------|-------|----------|
| 1 | Foundations — LLMs, prompt engineering, conversational design | ~3 weeks |
| 2 | Agentic AI — agent architecture, tools, function calling | ~3 weeks |
| 3 | Build Fundamentals — API calls, chat UI, tool integration | ~3 weeks |
| 4 | Deploy Your Agent — conversation flows, testing, production deploy | ~2 weeks |

---

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- Plain CSS (no component library)
- localStorage for persistence
- Deployed on [Netlify](https://netlify.com) via GitHub auto-deploy

---

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Deploying

The repo includes a `netlify.toml` that configures the build automatically. To deploy your own copy:

1. Push this repo to GitHub
2. Connect the repo to Netlify via **Add new site → Import an existing project**
3. Netlify detects the build settings from `netlify.toml` — no manual configuration needed
4. Every push to `main` triggers an automatic redeploy

---

## Project structure

```
agent-quest/
├── index.html
├── netlify.toml
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx       ← all curriculum data and components
    └── App.css
```

---

## Customizing the curriculum

All learning content lives in the `CURRICULUM` array at the top of `src/App.jsx`. Each task has a `text` field and a `url` field pointing to a learning resource. To add, remove, or edit tasks, milestones, or phases, that's the only file you need to touch.

---

*Built as a personal learning companion for exploring conversational design and agentic AI.*
