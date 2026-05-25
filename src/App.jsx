import { useState, useEffect, useRef } from 'react'

// ─── CURRICULUM DATA ─────────────────────────────────────────────────────────

const CURRICULUM = [
  {
    id: 'phase1',
    phase: 1,
    title: 'Foundations',
    tagline: 'Build your mental model',
    duration: '~3 weeks · 5–8 hrs/week',
    accentVar: '--c1',
    milestones: [
      {
        id: 'p1m1',
        title: 'How LLMs Work',
        summary: 'Get a solid conceptual model of how language models generate text. No math degree required.',
        resources: [
          { label: 'Stephen Wolfram — What is ChatGPT Doing?', url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/' },
          { label: '3Blue1Brown — Neural Networks (YouTube)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
          { label: 'Andrej Karpathy — Intro to LLMs (YouTube)', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
        ],
        tasks: [
          { id: 'p1m1t1', text: 'Understand what tokens are and how text is chunked', url: 'https://platform.openai.com/tokenizer' },
          { id: 'p1m1t2', text: 'Explain the difference between training and inference', url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/' },
          { id: 'p1m1t3', text: 'Know what temperature and top-p control in output generation', url: 'https://docs.anthropic.com/en/api/messages#body-messages-temperature' },
          { id: 'p1m1t4', text: 'Describe what a context window is and why its size matters', url: 'https://docs.anthropic.com/en/docs/about-claude/models/overview' },
        ],
      },
      {
        id: 'p1m2',
        title: 'Prompt Engineering',
        summary: 'Learn to communicate clearly and precisely with LLMs. Your most valuable early skill.',
        resources: [
          { label: 'Anthropic — Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
          { label: 'Learn Prompting — Free Course', url: 'https://learnprompting.org' },
          { label: 'OpenAI — Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        ],
        tasks: [
          { id: 'p1m2t1', text: 'Write a basic system prompt and understand its role', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
          { id: 'p1m2t2', text: 'Use few-shot examples to guide model output', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples' },
          { id: 'p1m2t3', text: 'Practice chain-of-thought prompting on a problem', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/extended-thinking' },
          { id: 'p1m2t4', text: 'Spot and rewrite an underspecified prompt', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct' },
        ],
      },
      {
        id: 'p1m3',
        title: 'Conversational Design',
        summary: 'Great agents feel natural to talk to. Learn the UX principles that make conversations work.',
        resources: [
          { label: 'Google — Conversation Design Principles', url: 'https://developers.google.com/assistant/conversation-design/welcome' },
          { label: 'Nielsen Norman Group — Chatbot UX', url: 'https://www.nngroup.com/articles/chatbots/' },
          { label: 'Anthropic — Claude Personality & Persona', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
        ],
        tasks: [
          { id: 'p1m3t1', text: 'Define intents, entities, and dialog flows in your own words', url: 'https://developers.google.com/assistant/conversation-design/design-for-the-assistant' },
          { id: 'p1m3t2', text: 'Sketch a simple conversation flow for a real-world task', url: 'https://miro.com/templates/chatbot-conversation-map/' },
          { id: 'p1m3t3', text: 'Identify 3 common conversational design failure patterns', url: 'https://www.nngroup.com/articles/chatbot-usability/' },
          { id: 'p1m3t4', text: 'Write a persona card (name, tone, traits) for your future agent', url: 'https://developers.google.com/assistant/conversation-design/define-persona' },
        ],
      },
    ],
  },
  {
    id: 'phase2',
    phase: 2,
    title: 'Agentic AI',
    tagline: 'Understand what makes an agent tick',
    duration: '~3 weeks · 5–8 hrs/week',
    accentVar: '--c2',
    milestones: [
      {
        id: 'p2m1',
        title: 'What Makes an Agent',
        summary: 'Understand the four pillars of agentic AI: tools, memory, planning, and perception.',
        resources: [
          { label: 'Lilian Weng — LLM Powered Autonomous Agents', url: 'https://lilianweng.github.io/posts/2023-06-23-agent/' },
          { label: 'Anthropic — Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { label: 'Paper — ReAct: Reasoning + Acting in LLMs', url: 'https://arxiv.org/abs/2210.03629' },
        ],
        tasks: [
          { id: 'p2m1t1', text: 'Explain the difference between a chatbot and an agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { id: 'p2m1t2', text: 'List and describe the 4 components of an agent system', url: 'https://lilianweng.github.io/posts/2023-06-23-agent/#component-one-planning' },
          { id: 'p2m1t3', text: 'Understand what a "tool" means in agentic terms', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
          { id: 'p2m1t4', text: 'Describe short-term vs long-term memory in agents', url: 'https://lilianweng.github.io/posts/2023-06-23-agent/#component-two-memory' },
        ],
      },
      {
        id: 'p2m2',
        title: 'Agent Architectures',
        summary: 'From simple ReAct loops to multi-agent pipelines — know the patterns before you build.',
        resources: [
          { label: 'LangChain — Agent Types Docs', url: 'https://python.langchain.com/docs/concepts/agents/' },
          { label: 'Anthropic — Agentic Design Patterns', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agents-and-tools/overview' },
          { label: 'Fireship — AI Agents Explained (YouTube)', url: 'https://www.youtube.com/watch?v=rcR5dNgepCE' },
        ],
        tasks: [
          { id: 'p2m2t1', text: 'Explain the ReAct (Reason + Act) loop in plain English', url: 'https://arxiv.org/abs/2210.03629' },
          { id: 'p2m2t2', text: 'Compare single-agent vs multi-agent architectures', url: 'https://www.anthropic.com/research/building-effective-agents#multi-agent-frameworks' },
          { id: 'p2m2t3', text: 'Understand the difference between orchestrator and subagent roles', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agents-and-tools/orchestrating-agents' },
          { id: 'p2m2t4', text: 'Draw a simple architecture diagram for your target agent', url: 'https://miro.com/templates/flow-chart/' },
        ],
      },
      {
        id: 'p2m3',
        title: 'Tools & Function Calling',
        summary: 'Function calling is how agents take real action. This is where theory meets capability.',
        resources: [
          { label: 'Anthropic — Tool Use Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
          { label: 'OpenAI — Function Calling Guide', url: 'https://platform.openai.com/docs/guides/function-calling' },
          { label: 'Anthropic — Tool Use Tutorial', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use' },
        ],
        tasks: [
          { id: 'p2m3t1', text: 'Read the Claude tool use documentation end-to-end', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
          { id: 'p2m3t2', text: 'Write a JSON tool definition schema from scratch', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#defining-tools' },
          { id: 'p2m3t3', text: 'Trace the tool call → result → final response loop', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#processing-tool-calls' },
          { id: 'p2m3t4', text: 'List 5 tools your specific agent will likely need', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#tool-definitions' },
        ],
      },
    ],
  },
  {
    id: 'phase3',
    phase: 3,
    title: 'Build Fundamentals',
    tagline: 'Get your hands dirty with real code',
    duration: '~3 weeks · 8–10 hrs/week',
    accentVar: '--c3',
    milestones: [
      {
        id: 'p3m1',
        title: 'Your First API Call',
        summary: 'Nothing beats making your first live API call to Claude. This is where everything becomes real.',
        resources: [
          { label: 'Anthropic — Quickstart Guide', url: 'https://docs.anthropic.com/en/docs/quickstart' },
          { label: 'Anthropic — Messages API Reference', url: 'https://docs.anthropic.com/en/api/messages' },
          { label: 'MDN — Fetch API Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' },
        ],
        tasks: [
          { id: 'p3m1t1', text: 'Get an Anthropic API key and store it safely (never in code)', url: 'https://console.anthropic.com/settings/keys' },
          { id: 'p3m1t2', text: 'Make a basic POST request to /v1/messages using fetch()', url: 'https://docs.anthropic.com/en/api/messages' },
          { id: 'p3m1t3', text: 'Parse and display the response in your browser console', url: 'https://docs.anthropic.com/en/api/messages#response-body' },
          { id: 'p3m1t4', text: 'Experiment with different system prompts — observe the difference', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
        ],
      },
      {
        id: 'p3m2',
        title: 'Build a Chat Interface',
        summary: 'Build a working multi-turn chat UI in React. This is the foundation every agent needs.',
        resources: [
          { label: 'React Docs — useState & Controlled Components', url: 'https://react.dev/learn/state-a-components-memory' },
          { label: 'Anthropic — Managing Conversation History', url: 'https://docs.anthropic.com/en/docs/build-with-claude/conversation-history' },
          { label: 'Tutorial — React Chat UI (YouTube search)', url: 'https://www.youtube.com/results?search_query=react+chat+ui+from+scratch+2024' },
        ],
        tasks: [
          { id: 'p3m2t1', text: 'Build a message input + send button in React', url: 'https://react.dev/reference/react-dom/components/input' },
          { id: 'p3m2t2', text: 'Store conversation history as an array in state', url: 'https://docs.anthropic.com/en/docs/build-with-claude/conversation-history' },
          { id: 'p3m2t3', text: 'Pass the full conversation history to the API on every turn', url: 'https://docs.anthropic.com/en/docs/build-with-claude/conversation-history#constructing-the-messages-array' },
          { id: 'p3m2t4', text: 'Add a loading/typing indicator while awaiting responses', url: 'https://react.dev/learn/state-a-components-memory#adding-a-state-variable' },
        ],
      },
      {
        id: 'p3m3',
        title: 'Add Tools to Your Agent',
        summary: 'Give your agent the ability to take real actions — search, fetch data, calculate.',
        resources: [
          { label: 'Anthropic — Implement Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use' },
          { label: 'Open-Meteo — Free Weather API (good first tool)', url: 'https://open-meteo.com/' },
          { label: 'Tutorial — Claude Agent Tool Use (YouTube search)', url: 'https://www.youtube.com/results?search_query=claude+agent+tool+use+javascript+2024' },
        ],
        tasks: [
          { id: 'p3m3t1', text: 'Implement one simple tool (e.g. get current time or weather)', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use' },
          { id: 'p3m3t2', text: 'Handle tool_use response blocks from Claude correctly', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#processing-tool-calls' },
          { id: 'p3m3t3', text: 'Send tool results back to Claude and get the final response', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#returning-tool-results' },
          { id: 'p3m3t4', text: 'Test edge cases: what happens when the tool errors or times out?', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use#error-handling' },
        ],
      },
    ],
  },
  {
    id: 'phase4',
    phase: 4,
    title: 'Deploy Your Agent',
    tagline: 'Ship something real to the world',
    duration: '~2 weeks · 8–10 hrs/week',
    accentVar: '--c4',
    milestones: [
      {
        id: 'p4m1',
        title: 'Design Conversation Flows',
        summary: 'Before shipping, nail down what your agent does, how it responds, and what happens when things go wrong.',
        resources: [
          { label: 'Miro — Free Diagramming Tool', url: 'https://miro.com' },
          { label: 'Anthropic — Agentic Design Patterns', url: 'https://docs.anthropic.com/en/docs/build-with-claude/agents-and-tools/overview' },
          { label: 'UX Collective — Conversation Flow Design', url: 'https://uxdesign.cc/chatbot-design-conversation-flows' },
        ],
        tasks: [
          { id: 'p4m1t1', text: "Define your agent's core use cases (the happy paths)", url: 'https://uxdesign.cc/how-to-design-a-chatbot-9986c5c42a0f' },
          { id: 'p4m1t2', text: 'Map out at least 3 error or edge-case flows', url: 'https://www.nngroup.com/articles/error-message-guidelines/' },
          { id: 'p4m1t3', text: "Write the final, polished system prompt for your agent", url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
          { id: 'p4m1t4', text: "Define success criteria — how will you know it's working well?", url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/eval-overview' },
        ],
      },
      {
        id: 'p4m2',
        title: 'Build & Test Your Agent',
        summary: 'Bring it all together. Assemble the full agent and stress-test it before you go live.',
        resources: [
          { label: 'Anthropic — Evaluation Best Practices', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/eval-overview' },
          { label: 'Promptfoo — LLM Testing Framework', url: 'https://www.promptfoo.dev/' },
          { label: 'Anthropic — Red Teaming LLM Apps', url: 'https://www.anthropic.com/research/red-teaming-language-models' },
        ],
        tasks: [
          { id: 'p4m2t1', text: 'Assemble all components into one working application', url: 'https://docs.anthropic.com/en/docs/quickstart' },
          { id: 'p4m2t2', text: 'Run 10 test conversations and review every output', url: 'https://www.promptfoo.dev/docs/getting-started/' },
          { id: 'p4m2t3', text: 'Find and fix at least 2 prompt or flow problems', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/eval-overview' },
          { id: 'p4m2t4', text: 'Have someone else try to confuse or break your agent', url: 'https://www.anthropic.com/research/red-teaming-language-models' },
        ],
      },
      {
        id: 'p4m3',
        title: 'Deploy to Production',
        summary: 'Push your agent live. Handle secrets safely, wire up auto-deploy from GitHub, and ship it.',
        resources: [
          { label: 'Netlify — Environment Variables', url: 'https://docs.netlify.com/environment-variables/overview/' },
          { label: 'Netlify — Serverless Functions Guide', url: 'https://docs.netlify.com/functions/overview/' },
          { label: 'Netlify — Deploy from GitHub', url: 'https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git' },
        ],
        tasks: [
          { id: 'p4m3t1', text: 'Move your API key to Netlify environment variables', url: 'https://docs.netlify.com/environment-variables/overview/' },
          { id: 'p4m3t2', text: 'Set up a Netlify Function to safely proxy all API calls', url: 'https://docs.netlify.com/functions/get-started/' },
          { id: 'p4m3t3', text: 'Connect your GitHub repo to Netlify for auto-deploy on push', url: 'https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git' },
          { id: 'p4m3t4', text: 'Deploy your agent live and share the link with at least one person!', url: 'https://app.netlify.com/' },
        ],
      },
    ],
  },
]

const ALL_TASKS = CURRICULUM.flatMap(p => p.milestones.flatMap(m => m.tasks))
const TOTAL_TASKS = ALL_TASKS.length
const XP_PER_TASK = 10
const MAX_XP = TOTAL_TASKS * XP_PER_TASK

const LEVELS = [
  { level: 1, title: 'Curious Mind',        min: 0   },
  { level: 2, title: 'Prompt Apprentice',   min: 80  },
  { level: 3, title: 'Agent Theorist',      min: 200 },
  { level: 4, title: 'Builder in Progress', min: 320 },
  { level: 5, title: 'Agent Architect',     min: 430 },
  { level: 6, title: 'Deployed!',           min: 480 },
]

function getLevelInfo(xp) {
  let current = LEVELS[0]
  let next = LEVELS[1]
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) {
      current = LEVELS[i]
      next = LEVELS[i + 1] || null
    }
  }
  const rangeEnd = next ? next.min : MAX_XP
  const progress = Math.min(100, ((xp - current.min) / (rangeEnd - current.min)) * 100)
  return { current, next, progress }
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function MilestoneCard({ milestone, completed, onToggle, isOpen, onToggleOpen, accent }) {
  const doneTasks = milestone.tasks.filter(t => completed.has(t.id)).length
  const totalTasks = milestone.tasks.length
  const pct = (doneTasks / totalTasks) * 100
  const isComplete = doneTasks === totalTasks

  return (
    <div
      className={`milestone-card ${isOpen ? 'open' : ''} ${isComplete ? 'done' : ''}`}
      style={{ '--accent': `var(${accent})` }}
    >
      <button className="milestone-header" onClick={onToggleOpen} aria-expanded={isOpen}>
        <div className="milestone-left">
          <div className={`milestone-icon ${isComplete ? 'complete' : ''}`}>
            {isComplete ? '✓' : milestone.id.replace('p', '').replace('m', '.')}
          </div>
          <div className="milestone-info">
            <span className="milestone-title">{milestone.title}</span>
            <span className="milestone-count">{doneTasks}/{totalTasks} tasks</span>
          </div>
        </div>
        <div className="milestone-right">
          <div className="milestone-bar-wrap">
            <div className="milestone-bar">
              <div className="milestone-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <span className="milestone-xp">+{totalTasks * XP_PER_TASK} XP</span>
          <span className={`milestone-chevron ${isOpen ? 'up' : ''}`}>›</span>
        </div>
      </button>

      {isOpen && (
        <div className="milestone-body">
          <p className="milestone-summary">{milestone.summary}</p>

          <div className="task-section">
            <div className="section-label">Tasks — click the arrow to study, then check off when done</div>
            {milestone.tasks.map(task => (
              <div key={task.id} className={`task-row ${completed.has(task.id) ? 'checked' : ''}`}>
                <label className="task-check-label">
                  <input
                    type="checkbox"
                    checked={completed.has(task.id)}
                    onChange={() => onToggle(task.id)}
                  />
                  <span className="task-check-icon">{completed.has(task.id) ? '✓' : ''}</span>
                </label>
                <span className="task-text">{task.text}</span>
                <a
                  href={task.url}
                  target="_blank"
                  rel="noreferrer"
                  className="task-link"
                  title="Open resource"
                  onClick={e => e.stopPropagation()}
                >
                  ↗
                </a>
              </div>
            ))}
          </div>

          <div className="resource-section">
            <div className="section-label">Further reading</div>
            {milestone.resources.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" className="resource-link">
                <span className="resource-arrow">↗</span>
                {r.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PhaseCard({ phase, doneTasks, totalTasks, pct, onClick }) {
  const isComplete = doneTasks === totalTasks
  return (
    <button
      className={`phase-card ${isComplete ? 'complete' : ''}`}
      style={{ '--accent': `var(${phase.accentVar})` }}
      onClick={onClick}
    >
      <div className="phase-num">Phase {phase.phase}</div>
      <div className="phase-title">{phase.title}</div>
      <div className="phase-tagline">{phase.tagline}</div>
      <div className="phase-duration">{phase.duration}</div>
      <div className="phase-bar">
        <div className="phase-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="phase-task-count">
        {isComplete ? '✓ Complete' : `${doneTasks}/${totalTasks} tasks`}
      </div>
    </button>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('aq_completed')
      return new Set(saved ? JSON.parse(saved) : [])
    } catch {
      return new Set()
    }
  })
  const [activePhaseId, setActivePhaseId] = useState(null)
  const [openMilestoneId, setOpenMilestoneId] = useState(null)
  const [levelUpMsg, setLevelUpMsg] = useState(null)
  const prevLevelRef = useRef(null)

  const xp = completed.size * XP_PER_TASK
  const { current: level, next: nextLevel, progress: levelProgress } = getLevelInfo(xp)
  const overallPct = Math.round((xp / MAX_XP) * 100)

  useEffect(() => {
    localStorage.setItem('aq_completed', JSON.stringify([...completed]))
  }, [completed])

  useEffect(() => {
    if (prevLevelRef.current !== null && level.level > prevLevelRef.current) {
      setLevelUpMsg(`Level ${level.level} — ${level.title}`)
      const t = setTimeout(() => setLevelUpMsg(null), 3000)
      return () => clearTimeout(t)
    }
    prevLevelRef.current = level.level
  }, [level.level])

  function toggleTask(taskId) {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
  }

  function getPhaseProgress(phase) {
    const tasks = phase.milestones.flatMap(m => m.tasks)
    const done = tasks.filter(t => completed.has(t.id)).length
    return { done, total: tasks.length, pct: Math.round((done / tasks.length) * 100) }
  }

  const activePhase = CURRICULUM.find(p => p.id === activePhaseId)

  return (
    <div className="app">
      {levelUpMsg && (
        <div className="level-toast" key={levelUpMsg}>
          ⚡ Level Up! {levelUpMsg}
        </div>
      )}

      <header className="header">
        <div className="header-brand">
          <span className="logo">AGENT<em>QUEST</em></span>
          <span className="header-subtitle">Your roadmap to deploying an AI agent</span>
        </div>
        <div className="header-stats">
          <div className="level-badge">
            <span className="level-num">LVL {level.level}</span>
            <span className="level-name">{level.title}</span>
          </div>
          <div className="xp-group">
            <div className="xp-numbers">
              <span className="xp-current">{xp} XP</span>
              <span className="xp-sep">/</span>
              <span className="xp-max">{MAX_XP} XP</span>
              {nextLevel && <span className="xp-next">next: {nextLevel.min} XP</span>}
            </div>
            <div className="xp-track">
              <div className="xp-fill" style={{ width: `${levelProgress}%` }} />
            </div>
          </div>
          <div className="overall-pct">{overallPct}%</div>
        </div>
      </header>

      {!activePhaseId && (
        <main className="main">
          <div className="grid-intro">
            <h1 className="grid-heading">Learning Phases</h1>
            <p className="grid-sub">Work through each phase in order. Each milestone unlocks new capability.</p>
          </div>
          <div className="phase-grid">
            {CURRICULUM.map(phase => {
              const { done, total, pct } = getPhaseProgress(phase)
              return (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  doneTasks={done}
                  totalTasks={total}
                  pct={pct}
                  onClick={() => { setActivePhaseId(phase.id); setOpenMilestoneId(null) }}
                />
              )
            })}
          </div>

          <div className="timeline-box">
            <div className="timeline-heading">Estimated Timeline</div>
            <div className="timeline-phases">
              {CURRICULUM.map(p => (
                <div key={p.id} className="timeline-row" style={{ '--accent': `var(${p.accentVar})` }}>
                  <div className="tl-phase">Phase {p.phase}</div>
                  <div className="tl-title">{p.title}</div>
                  <div className="tl-dur">{p.duration}</div>
                </div>
              ))}
              <div className="timeline-total">
                <span>Total estimate:</span>
                <strong>10–12 weeks at 5–10 hrs/week</strong>
              </div>
            </div>
          </div>
        </main>
      )}

      {activePhase && (
        <main className="main">
          <button className="back-btn" onClick={() => setActivePhaseId(null)}>
            ← All Phases
          </button>
          <div className="phase-detail-header" style={{ '--accent': `var(${activePhase.accentVar})` }}>
            <div className="phase-detail-num">Phase {activePhase.phase} of 4</div>
            <h1 className="phase-detail-title">{activePhase.title}</h1>
            <p className="phase-detail-tagline">{activePhase.tagline}</p>
            <p className="phase-detail-duration">{activePhase.duration}</p>
          </div>

          <div className="milestone-list">
            {activePhase.milestones.map(milestone => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                completed={completed}
                onToggle={toggleTask}
                isOpen={openMilestoneId === milestone.id}
                onToggleOpen={() =>
                  setOpenMilestoneId(openMilestoneId === milestone.id ? null : milestone.id)
                }
                accent={activePhase.accentVar}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  )
}
