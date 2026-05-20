import { Deck } from "@/components/Deck";
import {
  Accent,
  Author,
  DocChip,
  Eyebrow,
  FootNote,
  H1,
  H2,
  Lede,
  Panel,
  Pill,
  PillRow,
  ProofStrip,
  Pull,
  Quadrant,
  RolesDiagram,
  ScoreRow,
  Slide,
  TwoCol,
} from "@/components/Slide";
import { highlight } from "@/lib/highlight";

export default async function Page() {
  const conductedDiff = await highlight(
    `// Replace one agent with three small roles + a checker.

const byCategory = orchestrate(commits);
//   classify each commit, drop internal types

const items = USER_FACING_CATEGORIES.flatMap(cat =>
  executeCategory(cat, byCategory.get(cat) ?? []),
);
//   per category: dedupe by scope, fit to ${"\u2264"} 80 chars

const result = check(items);
if (!result.ok) throw new Error(result.violations.join("\\n"));
//   non-negotiable contract — same checker runs on both attempts`,
    "typescript",
  );

  const subAgentDiff = await highlight(
    `// Don't give one agent everything. Route by topic.

function orchestrate(query, corpus) {
  const topic     = classify(query);                       // "api"
  const scopedBag = corpus.filter(d => d.topic === topic); // 2 docs, not 10
  return ask(query, scopedBag);                            // sub-agent runs lean
}`,
    "typescript",
  );

  const pickerTs = await highlight(
    `export function pickNext(path) {
  return yaml.load(read(path))
    .findings
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => f.status === "planned")
    .filter(({ f }) => !f.blocked)
    .sort((a, b) =>
      RANK[a.f.sizing] - RANK[b.f.sizing]
      || a.i - b.i
    )[0].f.id;
}`,
    "typescript",
  );

  const slides: React.ReactNode[] = [
    // 1. Title
    <Slide key="title" hero className="justify-center">
      <Eyebrow>Sitecore User Group · Minneapolis 2026</Eyebrow>
      <div className="mt-8 max-w-6xl">
        <H1>
          From Coding to{" "}
          <span className="bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] bg-clip-text text-transparent">
            Conducting
          </span>
        </H1>
        <div className="mt-6 text-2xl md:text-3xl text-[color:var(--fg-soft)]">
          Building with agentic systems in the real world.
        </div>
      </div>
      <Author
        name="Andy Cohen"
        url="iamandycohen.com"
        event="2026.05.20 · Minneapolis"
      />
    </Slide>,

    // 2. ATM / MRI / Conducting — the opener
    <Slide key="atm-mri" className="justify-center">
      <Eyebrow>The opener</Eyebrow>
      <div className="mt-8 max-w-6xl">
        <H2>
          Every time a powerful new tool shows up, people ask{" "}
          <Accent color="accent-3">what jobs it will replace</Accent>.
        </H2>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
        <div className="rounded-2xl border border-[color:var(--border)] p-7 bg-[color:var(--bg-soft)]/60 flex flex-col gap-3">
          <div className="text-[color:var(--fg-soft)] uppercase tracking-widest text-xs font-mono">
            ATM
          </div>
          <div className="text-xl md:text-2xl font-semibold">
            The fear story.
          </div>
          <div className="text-base text-[color:var(--fg-soft)]">
            People thought bank tellers were done. The work did not disappear.
            The role changed.
          </div>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] p-7 bg-[color:var(--bg-soft)]/60 flex flex-col gap-3">
          <div className="text-[color:var(--fg-soft)] uppercase tracking-widest text-xs font-mono">
            MRI
          </div>
          <div className="text-xl md:text-2xl font-semibold">
            The workload story.
          </div>
          <div className="text-base text-[color:var(--fg-soft)]">
            A powerful tool didn&rsquo;t remove the need for expertise. It
            raised the value of people who could{" "}
            <span className="text-[color:var(--fg)]">interpret</span> what it
            revealed.
          </div>
        </div>
        <div className="rounded-2xl border border-[color:var(--accent)]/40 p-7 bg-[color:var(--bg-soft)]/60 flex flex-col gap-3">
          <div className="text-[color:var(--accent)] uppercase tracking-widest text-xs font-mono">
            Conducting
          </div>
          <div className="text-xl md:text-2xl font-semibold">
            The role I ended up in.
          </div>
          <div className="text-base text-[color:var(--fg-soft)]">
            I am still in code every day. I just don&rsquo;t write it the
            same way anymore.
          </div>
        </div>
      </div>
    </Slide>,

    // 3. The thesis
    <Slide key="thesis" hero className="justify-center">
      <Eyebrow>The thesis</Eyebrow>
      <div className="mt-8">
        <Pull>
          Agents are powerful enough to{" "}
          <Accent color="accent-2">change the work</Accent>,
          <br />
          but not reliable enough to leave{" "}
          <Accent color="danger">unscaffolded</Accent>.
        </Pull>
      </div>
      <FootNote>The job moved up a layer. Then it got harder.</FootNote>
    </Slide>,

    // 4. The work moved up a layer
    <Slide key="moved-up" className="justify-center">
      <Eyebrow>What changed</Eyebrow>
      <div className="mt-6 max-w-6xl">
        <H2>
          The work did not disappear.{" "}
          <Accent>It moved up a layer.</Accent>
        </H2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
        <div className="rounded-2xl border border-[color:var(--border)] p-7 bg-[color:var(--bg-soft)]/60">
          <div className="text-[color:var(--fg-soft)] uppercase tracking-widest text-xs font-mono mb-3">
            Before
          </div>
          <ul className="space-y-2 text-base md:text-lg text-[color:var(--fg-soft)]">
            <li>— application code</li>
            <li>— direct implementation</li>
            <li>— tests</li>
            <li>— deploy</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[color:var(--accent)]/40 p-7 bg-[color:var(--bg-soft)]/60">
          <div className="text-[color:var(--accent)] uppercase tracking-widest text-xs font-mono mb-3">
            After
          </div>
          <ul className="space-y-2 text-base md:text-lg">
            <li>— agent files &amp; skills</li>
            <li>— MCP tools with strict input schemas</li>
            <li>— lint that reads agent prose</li>
            <li>— deterministic workflow code</li>
            <li>— validators &amp; migration probes</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-lg md:text-xl text-[color:var(--fg)] italic">
        I used to write code that <Accent color="accent-2">ran</Accent>. Now I
        write code that helps agents decide what to{" "}
        <Accent>run</Accent>.
      </div>
      <ProofStrip>
        Kajoo Agentic · 684 commits · 40 agent files · 47 skills · 40 migration tools · feature/KAJOO-4885
      </ProofStrip>
    </Slide>,

    // 5. Agents need scaffolding — the four quadrants
    <Slide key="scaffolding" className="justify-center">
      <Eyebrow>The slide that explains the last two years</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Agents need <Accent color="danger">scaffolding</Accent>.
        </H2>
      </div>
      <div className="mt-8">
        <Quadrant
          items={[
            {
              eyebrow: "01",
              title: "Determined, not disciplined",
              body:
                "Agents optimize for completion. They will lower the bar to declare success.",
              color: "accent-2",
            },
            {
              eyebrow: "02",
              title: "Ambiguity becomes guesswork",
              body:
                "Without tools to reduce ambiguity, agents fill the gap with confident guesses.",
              color: "accent-3",
            },
            {
              eyebrow: "03",
              title: "Context becomes budget",
              body:
                "Too little context causes guessing. Too much causes drift. Context is not just input.",
              color: "accent",
            },
            {
              eyebrow: "04",
              title: "Workflow is interpreted",
              body:
                "Prose workflows get reinterpreted. Deterministic code enforces what must not drift.",
              color: "danger",
            },
          ]}
        />
      </div>
      <div className="mt-8 text-lg md:text-xl text-[color:var(--fg-soft)] italic">
        The failure mode is not that agents stop.{" "}
        <span className="text-[color:var(--fg)] not-italic">
          It is that they keep going.
        </span>
      </div>
    </Slide>,

    // 6. Conducting = separating the roles
    <Slide key="roles" className="justify-center">
      <Eyebrow>Conducting means separating the roles</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          <Accent color="accent-2">Orchestrators</Accent> decide.{" "}
          <Accent>Executors</Accent> do.{" "}
          <Accent color="accent-3">Tools</Accent> keep them honest.
        </H2>
      </div>
      <div className="mt-10">
        <RolesDiagram />
      </div>
      <FootNote>
        The conductor does not play every note. The conductor decides who
        plays, when they enter, and when something is off.
      </FootNote>
      <ProofStrip>
        1TRK ORCH.agent.md · 1TRK EXEC.agent.md · scripts/1trk/tracker.ts · .github/instructions/migration-orchestration
      </ProofStrip>
    </Slide>,

    // ───── DEMO 1 — Release Notes (decomposition) ─────

    // 7. Demo 1 · setup — the task and the constraints
    <Slide key="demo1-setup" className="justify-center">
      <Eyebrow>Demo 01 · setup</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Twenty commits in. <Accent>Release notes out.</Accent>
        </H2>
        <Lede>
          Engineering wants a clean changelog from a sprint of commits. We tried
          one agent first.
        </Lede>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        <Panel eyebrow="the input" mono>
{`feat(auth):     add OAuth login with Google
feat(auth):     support Google sign-in on marketing site
fix(billing):   stop charging cancelled subs on the day of …
fix(billing):   correct tax calculation for EU customers
chore(ci):      bump CI runner to ubuntu-24.04
perf(search):   cache search results for 60s
… 11 more`}
        </Panel>
        <Panel eyebrow="the constraints" accent="accent-3">
          <ul className="space-y-3 text-lg md:text-xl text-[color:var(--fg)]">
            <li>— at most <Accent color="accent-3">8 items</Accent></li>
            <li>— each item <Accent color="accent-3">≤ 80 chars</Accent></li>
            <li>— grouped as <Accent color="accent-3">Features / Fixes / Performance</Accent></li>
            <li>— no internal noise (chore / test / docs / refactor)</li>
          </ul>
        </Panel>
      </div>
    </Slide>,

    // 8. Demo 1 · run 1 — solo agent (the bad output)
    <Slide key="demo1-bad" className="justify-center">
      <Eyebrow>Demo 01 · run 1 — one agent, free-running</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          The agent did its job <Accent color="danger">and ours too</Accent>.
        </H2>
      </div>
      <div className="mt-5 w-full max-w-7xl">
        <Panel eyebrow="agent output" accent="danger" mono className="!p-5">
{`## Features              · 4 items
- add OAuth login with Google
- support Google sign-in on the marketing site     ← duplicate

## Fixes                 · 5 items
- stop charging cancelled subs on the day of cancellation in some tz   ← 82 chars

## Performance · Maintenance · Improvements · Quality · Documentation
                                                  ← 4 invented categories

— 17 items total. Cap is 8.`}
        </Panel>
        <PillRow className="mt-5">
          <Pill variant="violation">17 items (max 8)</Pill>
          <Pill variant="violation">4 invented categories</Pill>
          <Pill variant="violation">duplicate-ish items</Pill>
          <Pill variant="violation">one item over 80 chars</Pill>
        </PillRow>
      </div>
    </Slide>,

    // 9. Demo 1 · the change — split into roles
    <Slide key="demo1-change" className="justify-center">
      <Eyebrow>Demo 01 · the change</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Split into <Accent>three small roles</Accent> plus a checker.
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="orchestrator" accent="accent-2" title="decides">
          Classify each commit. Drop internal types. Never sees the prose.
        </Panel>
        <Panel eyebrow="executor" accent="accent" title="does">
          Per category: dedupe by scope, fit each item to width. One narrow job.
        </Panel>
        <Panel eyebrow="checker" accent="success" title="enforces">
          Counts items, lengths, categories, duplicates. Throws on any miss.
        </Panel>
      </div>
      <div className="mt-6 max-w-6xl w-full">
        <div
          className="slide-scroll"
          dangerouslySetInnerHTML={{ __html: conductedDiff }}
        />
      </div>
    </Slide>,

    // 10. Demo 1 · run 2 — conducted (the good output)
    <Slide key="demo1-good" className="justify-center">
      <Eyebrow>Demo 01 · run 2 — conducted</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Same commits. <Accent color="success">Through the pipeline.</Accent>
        </H2>
      </div>
      <div className="mt-5 w-full max-w-7xl">
        <Panel eyebrow="agent output" accent="success" mono className="!p-5">
{`## Features
- add OAuth login with Google
- add filters by date range and status
- add Slack integration

## Fixes
- stop charging cancelled subscriptions on the day of cancellation in s…
- dark mode toggle now persists across sessions
- fix off-by-one in pagination

## Performance
- cache search results for 60s
- lazy-load chart components`}
        </Panel>
        <PillRow className="mt-5">
          <Pill variant="check">8 items, max 8</Pill>
          <Pill variant="check">all ≤ 80 chars</Pill>
          <Pill variant="check">user-facing only</Pill>
          <Pill variant="check">no duplicates</Pill>
        </PillRow>
      </div>
    </Slide>,

    // 11. Lesson 1
    <Slide key="lesson1" hero className="justify-center">
      <Eyebrow>Lesson 01</Eyebrow>
      <div className="mt-6">
        <Pull>
          One agent guesses. Roles plus a checker{" "}
          <Accent color="success">compose</Accent>.
        </Pull>
      </div>
      <FootNote>
        Conducting is deciding where the boundary goes — and putting the
        non-negotiable parts in code.
      </FootNote>
    </Slide>,

    // ───── DEMO 2 — Context Rot (sub-agents) ─────

    // 12. Demo 2 · setup — the question and the corpus
    <Slide key="demo2-setup" className="justify-center">
      <Eyebrow>Demo 02 · setup</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          The answer is in <Accent>one doc</Accent>. The other nine talk about
          the same words.
        </H2>
      </div>
      <div className="mt-6 w-full max-w-7xl">
        <Panel eyebrow="the question" accent="accent-3">
          <span className="text-2xl md:text-3xl font-semibold text-[color:var(--fg)]">
            What is our production API endpoint?
          </span>
          <div className="mt-2 text-sm md:text-base">
            Truth: <span className="font-mono text-[color:var(--success)]">https://api.acme.com/v3</span>
          </div>
        </Panel>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          <DocChip id="current-api.md" topic="api" highlight="success" />
          <DocChip id="rate-limits.md" topic="api" />
          <DocChip id="v2-changelog.md" topic="history" />
          <DocChip id="v1-migration.md" topic="history" />
          <DocChip id="launch-blog-2023.md" topic="marketing" />
          <DocChip id="partner-announcement.md" topic="marketing" />
          <DocChip id="developer-onboarding.md" topic="onboarding" />
          <DocChip id="internal-tools-guide.md" topic="onboarding" />
          <DocChip id="billing-overview.md" topic="billing" />
          <DocChip id="sso-setup.md" topic="auth" />
        </div>
      </div>
    </Slide>,

    // 13. Demo 2 · run 1 — stuffed bag, wrong winner
    <Slide key="demo2-bad" className="justify-center">
      <Eyebrow>Demo 02 · run 1 — one agent, all 10 docs</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          The bigger bag{" "}
          <Accent color="danger">won the wrong fight</Accent>.
        </H2>
        <Lede>
          The agent picks the doc with the most keyword hits. Old changelogs
          mention &ldquo;production API endpoint&rdquo; constantly. The
          canonical doc mentions it once.
        </Lede>
      </div>
      <div className="mt-6 w-full max-w-7xl">
        <Panel eyebrow="keyword-density scores" accent="danger">
          <div className="space-y-3">
            <ScoreRow label="v2-changelog.md" score={22} max={22} variant="winner-wrong" note="picked" />
            <ScoreRow label="launch-blog-2023.md" score={14} max={22} />
            <ScoreRow label="v1-migration.md" score={11} max={22} />
            <ScoreRow label="developer-onboarding.md" score={9} max={22} />
            <ScoreRow label="current-api.md" score={7} max={22} note="truth" />
            <ScoreRow label="partner-announcement.md" score={6} max={22} />
            <ScoreRow label="internal-tools-guide.md" score={4} max={22} />
            <ScoreRow label="rate-limits.md" score={2} max={22} />
          </div>
        </Panel>
        <div className="mt-5">
          <Panel eyebrow="agent answer" accent="danger" mono>
{`from v2-changelog.md (score 22):
  "The v2 production API was hosted at api-v2.acme.com"`}
          </Panel>
        </div>
        <PillRow className="mt-5">
          <Pill variant="violation">wrong endpoint</Pill>
          <Pill variant="violation">said with the same confidence</Pill>
        </PillRow>
      </div>
    </Slide>,

    // 14. Demo 2 · the change — orchestrator + sub-agents
    <Slide key="demo2-change" className="justify-center">
      <Eyebrow>Demo 02 · the change</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Don&rsquo;t give one agent everything.{" "}
          <Accent>Route by topic.</Accent>
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="① classify" accent="accent-3" title="topic = api">
          Map the query to a topic by keyword. Real systems use classifiers or
          embeddings. The idea is the same.
        </Panel>
        <Panel eyebrow="② filter" accent="accent-2" title="scopedBag = 2 docs">
          Keep only docs that live in that topic. The history pile never enters
          the agent&rsquo;s context.
        </Panel>
        <Panel eyebrow="③ delegate" accent="accent" title="ask(query, scopedBag)">
          Sub-agent runs the same scorer — on a fresh, narrow bag. Same code,
          different visible world.
        </Panel>
      </div>
      <div className="mt-6 max-w-6xl w-full">
        <div
          className="slide-scroll"
          dangerouslySetInnerHTML={{ __html: subAgentDiff }}
        />
      </div>
    </Slide>,

    // 15. Demo 2 · run 2 — scoped bag, right winner
    <Slide key="demo2-good" className="justify-center">
      <Eyebrow>Demo 02 · run 2 — sub-agent, scoped context</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Same agent. Same scorer.{" "}
          <Accent color="success">Fresh, narrow context.</Accent>
        </H2>
      </div>
      <div className="mt-6 w-full max-w-7xl">
        <Panel eyebrow="topic api · scoped bag (2 docs)" accent="success">
          <div className="space-y-3">
            <ScoreRow label="current-api.md" score={7} max={7} variant="winner-right" note="picked · truth" />
            <ScoreRow label="rate-limits.md" score={2} max={7} />
          </div>
        </Panel>
        <div className="mt-5">
          <Panel eyebrow="agent answer" accent="success" mono>
{`from current-api.md (score 7):
  "Production API endpoint: https://api.acme.com/v3"`}
          </Panel>
        </div>
        <PillRow className="mt-5">
          <Pill variant="check">canonical doc wins</Pill>
          <Pill variant="check">no history pile in the bag</Pill>
        </PillRow>
      </div>
    </Slide>,

    // 16. Lesson 2
    <Slide key="lesson2" hero className="justify-center">
      <Eyebrow>Lesson 02</Eyebrow>
      <div className="mt-6">
        <Pull>
          Context is a budget,{" "}
          <Accent color="danger">not a bucket</Accent>. Conducting is also
          deciding{" "}
          <Accent color="success">what each agent gets to see</Accent>.
        </Pull>
      </div>
      <FootNote>
        Sub-agents aren&rsquo;t for parallelism. They&rsquo;re for context
        hygiene.
      </FootNote>
    </Slide>,

    // 13. When to leave the agent in charge (decision frame)
    <Slide key="decision" className="justify-center">
      <Eyebrow>The question is not: can AI do this?</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          The question is: should this part be allowed to{" "}
          <Accent color="accent-3">improvise</Accent>?
        </H2>
      </div>
      <div className="mt-10">
        <TwoCol
          left={{
            eyebrow: "Leave it agentic when",
            lines: [
              "interpretation matters",
              "multiple paths are valid",
              "tools can reduce the ambiguity",
              "a human can review the result",
            ],
          }}
          right={{
            eyebrow: "Make it deterministic when",
            lines: [
              "the sequence is known",
              "state must be correct",
              "compliance matters",
              "the workflow must not drift",
            ],
          }}
        />
      </div>
      <div className="mt-8 text-lg md:text-xl italic text-[color:var(--fg-soft)]">
        If the workflow must not improvise,{" "}
        <span className="text-[color:var(--fg)] not-italic">
          do not leave it inside the agent.
        </span>
      </div>
    </Slide>,

    // ───── DEMO 3 — Skill vs CLI (determinism) ─────

    // 18. Demo 3 · setup — same rules, two engines
    <Slide key="demo3-setup" className="justify-center">
      <Eyebrow>Demo 03 · setup</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Same rules. Same tracker.{" "}
          <Accent>Two engines.</Accent>
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        <Panel eyebrow="the rules" accent="accent-3">
          <ol className="space-y-3 text-base md:text-lg leading-snug list-decimal list-inside marker:text-[color:var(--accent-3)] marker:font-mono">
            <li>
              Only consider findings with status{" "}
              <code className="font-mono text-[color:var(--accent-3)]">planned</code>.
            </li>
            <li>
              Exclude any finding where{" "}
              <code className="font-mono text-[color:var(--accent-3)]">blocked: true</code>.
            </li>
            <li>Prefer the smallest sizing (S before M before L).</li>
            <li>On ties, take the earliest in the file.</li>
          </ol>
        </Panel>
        <Panel eyebrow="the tracker (5 findings)" accent="neutral" mono>
{`A · planned · S · blocked: false
B · planned · S · blocked: false   ← ties with A
C · planned · M · blocked: false
D · planned · S · blocked: true
E · done    · S · blocked: false`}
        </Panel>
      </div>
      <FootNote>A and B are a real tie. The engine must break it the same way every time.</FootNote>
    </Slide>,

    // 19. Demo 3 · run 1 — LLM engine drifts
    <Slide key="demo3-bad" className="justify-center">
      <Eyebrow>Demo 03 · run 1 — English → LLM</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Three asks. <Accent color="danger">Three answers.</Accent>
        </H2>
        <Lede>
          The rules are clear. The agent reads them in English every time. It
          still has to invent a tiebreaker.
        </Lede>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="run 1" accent="danger" mono>
{`> what's next?

A — earliest small,
unblocked, planned.`}
        </Panel>
        <Panel eyebrow="run 2" accent="danger" mono>
{`> what's next?

B — also S, also planned;
A and B are equivalent,
choosing B.`}
        </Panel>
        <Panel eyebrow="run 3" accent="danger" mono>
{`> what's next?

A or B — both qualify,
defer to author.`}
        </Panel>
      </div>
      <PillRow className="mt-6">
        <Pill variant="violation">different answers, same input</Pill>
        <Pill variant="violation">tiebreaker invented each time</Pill>
        <Pill variant="violation">honest — but not reproducible</Pill>
      </PillRow>
    </Slide>,

    // 20. Demo 3 · the change — encode the rule
    <Slide key="demo3-change" className="justify-center">
      <Eyebrow>Demo 03 · the change</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Replace English with a <Accent>function</Accent>.
        </H2>
        <Lede>
          The rules don&rsquo;t change. The interpreter does. Same tracker, but
          the tiebreaker is now in code where it can&rsquo;t drift.
        </Lede>
      </div>
      <div className="mt-6 max-w-6xl w-full">
        <div
          className="slide-scroll"
          dangerouslySetInnerHTML={{ __html: pickerTs }}
        />
      </div>
      <ProofStrip>
        scripts/1trk/tracker.ts · deterministic state extracted from agent prose mid-branch
      </ProofStrip>
    </Slide>,

    // 21. Demo 3 · run 2 — CLI engine
    <Slide key="demo3-good" className="justify-center">
      <Eyebrow>Demo 03 · run 2 — TypeScript → Function</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Three runs. <Accent color="success">One answer.</Accent> Every time.
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="run 1" accent="success" mono>
{`> pickNext(tracker)

A`}
        </Panel>
        <Panel eyebrow="run 2" accent="success" mono>
{`> pickNext(tracker)

A`}
        </Panel>
        <Panel eyebrow="run 3" accent="success" mono>
{`> pickNext(tracker)

A`}
        </Panel>
      </div>
      <PillRow className="mt-6">
        <Pill variant="check">same input, same output</Pill>
        <Pill variant="check">tiebreaker in code</Pill>
        <Pill variant="check">testable, reviewable, reproducible</Pill>
      </PillRow>
    </Slide>,

    // 22. Lesson 3
    <Slide key="lesson3" hero className="justify-center">
      <Eyebrow>Lesson 03</Eyebrow>
      <div className="mt-6">
        <Pull>
          A workflow described to an agent is still being{" "}
          <Accent color="accent-2">interpreted</Accent>.
          <br />A workflow encoded in code is{" "}
          <Accent color="success">enforced</Accent>.
        </Pull>
      </div>
      <FootNote>
        Both implementations are honest. Only one is reproducible.
      </FootNote>
    </Slide>,

    // 17. What this means for Sitecore teams
    <Slide key="sitecore" className="justify-center">
      <Eyebrow>What this means for Sitecore teams</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          AI can accelerate migration —{" "}
          <Accent color="accent-3">but only with scaffolding</Accent>.
        </H2>
      </div>
      <div className="mt-10 w-full max-w-7xl">
        <div className="grid grid-cols-5 gap-2 md:gap-3 items-stretch">
          {[
            { label: "Sitecore XP / MVC / SXA", color: "var(--fg-soft)" },
            { label: "Analyze", color: "var(--accent-3)" },
            { label: "Agent-assisted conversion", color: "var(--accent-2)" },
            { label: "Validate", color: "var(--accent)" },
            { label: "XM Cloud", color: "var(--success)" },
          ].map((stage, i, arr) => (
            <div
              key={i}
              className="rounded-xl border bg-[color:var(--bg-soft)]/60 p-4 md:p-5 flex flex-col justify-center items-center text-center gap-1 relative"
              style={{
                borderColor: `color-mix(in srgb, ${stage.color} 40%, transparent)`,
              }}
            >
              <div
                className="text-xs uppercase tracking-widest font-mono"
                style={{ color: stage.color }}
              >
                {i === 0 ? "from" : i === arr.length - 1 ? "to" : "step"}
              </div>
              <div className="text-sm md:text-base font-semibold leading-tight">
                {stage.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-5 md:p-6">
          <div className="text-xs uppercase tracking-widest font-mono text-[color:var(--fg-soft)] mb-3">
            guardrails underneath
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 text-sm md:text-base">
            {[
              "MCP tools",
              "strict input schemas",
              "context boundaries",
              "validation probes",
              "deterministic workflows",
              "human review",
            ].map((g) => (
              <span
                key={g}
                className="px-3 py-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-soft)]/60 text-[color:var(--fg-soft)]"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
      <FootNote>
        AI helps when it has tools that make the work knowable. It hurts
        when it is guessing.
      </FootNote>
    </Slide>,

    // 18. Closer
    <Slide key="closer" hero className="justify-center">
      <Eyebrow>The closer</Eyebrow>
      <div className="mt-6">
        <Pull>
          The new craft is deciding{" "}
          <Accent>where autonomy belongs</Accent>.
          <br />
          The job did not get easier.{" "}
          <Accent color="accent-2">It got more important.</Accent>
        </Pull>
      </div>
    </Slide>,

    // 19. Thanks
    <Slide key="thanks" hero className="justify-center items-center text-center">
      <Eyebrow>Thanks</Eyebrow>
      <div className="mt-6 max-w-5xl">
        <H1>Questions?</H1>
      </div>
      <div className="mt-12 flex flex-col items-center gap-3">
        <div className="text-2xl md:text-3xl font-semibold">Andy Cohen</div>
        <a
          href="https://iamandycohen.com"
          className="text-xl md:text-2xl text-[color:var(--accent)] hover:underline"
        >
          iamandycohen.com
        </a>
        <div className="mt-4 text-sm text-[color:var(--fg-soft)] font-mono">
          github.com/iamandycohen/from-coding-to-conducting
        </div>
      </div>
    </Slide>,
  ];

  return <Deck slides={slides} />;
}
