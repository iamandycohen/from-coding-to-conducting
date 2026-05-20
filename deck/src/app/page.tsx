import { Deck } from "@/components/Deck";
import {
  Accent,
  Author,
  ContextBar,
  ContextLegend,
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
  const boundedToolDiff = await highlight(
    `// Before: the tool returns whatever the page returns.
//          A 100K HTML dump enters the agent's context every turn.
async function validateRender(url) {
  const res = await fetch(url);
  return await res.text();                       // ← unbounded
}

// After: the tool does the check, returns a verdict.
//        Two fields. Bounded. The instructions stay readable.
async function validateRender(url, marker) {
  const res     = await fetch(url);
  const html    = await res.text();
  const found   = html.includes(marker);
  const snippet = found ? excerpt(html, marker, 120) : null;
  return { found, snippet };                     // ← bounded verdict
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
          <Accent color="danger">on their own</Accent>.
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

    // 5. Agents need tools, checks, and limits — the four quadrants
    <Slide key="scaffolding" className="justify-center">
      <Eyebrow>The slide that explains the last two years</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Agents need <Accent color="danger">tools, checks, and limits around them</Accent>.
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

    // 7. Preview — three places the rules quietly stop working
    <Slide key="preview" className="justify-center">
      <Eyebrow>What this talk is</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Three places the rules quietly{" "}
          <Accent color="danger">stop working</Accent>.
        </H2>
        <Lede>
          The agent has instructions. The agent has tools. Most days that&rsquo;s
          enough. Some days it isn&rsquo;t — and the failure mode looks the same
          every time.
        </Lede>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="① the tool floods the context" accent="danger" title="Pattern 01">
          A tool returns a big payload every turn. The agent&rsquo;s
          instructions get summarized away. It starts improvising.
        </Panel>
        <Panel eyebrow="② the bookkeeping lives in the agent" accent="danger" title="Interlude">
          The agent is asked to track its own work across turns. It
          contradicts itself, forgets decisions, and the human becomes the
          memory.
        </Panel>
        <Panel eyebrow="③ the workflow lives in prose" accent="danger" title="Pattern 02">
          The rules are written in English. The agent reinterprets them on
          every run. Same input → different answers.
        </Panel>
      </div>
      <FootNote>
        Same shape of fix for all three: take the thing the LLM keeps getting
        wrong, and put it somewhere that can&rsquo;t drift.
      </FootNote>
    </Slide>,

    // ───── PATTERN 01 — Bounded tools ─────

    // 8. Pattern 01 · title card
    <Slide key="pattern1-title" hero className="justify-center">
      <Eyebrow>Pattern 01</Eyebrow>
      <div className="mt-4">
        <Pull>
          When tools <Accent color="danger">flood the context</Accent>,
          <br />the rules don&rsquo;t survive.
        </Pull>
      </div>
      <FootNote>A bounded tool is one that returns a verdict, not a payload.</FootNote>
    </Slide>,

    // ───── DEMO 1 — Context Rot (bounded tools) ─────

    // 9. Pattern 01 · the situation — the job
    <Slide key="demo1-setup" className="justify-center">
      <Eyebrow>Pattern 01 · the situation</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Migrate the components.{" "}
          <Accent color="accent-2">Confirm each one renders.</Accent>
        </H2>
        <Lede>
          A batch of Sitecore components needs to move into the new app.
          The bar is simple: don&rsquo;t mark a page done until you&rsquo;ve
          actually checked it came up.
        </Lede>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
        <Panel eyebrow="the job" accent="accent-2" title="migrate + verify">
          For each component: convert the markup, deploy it, confirm it
          renders correctly in a browser. Move to the next one.
        </Panel>
        <Panel eyebrow="the bar" accent="accent-3" title="don&rsquo;t lie about done">
          Never declare a page complete on something you didn&rsquo;t
          actually verify. The agent agreed to this in plain English.
        </Panel>
      </div>
      <FootNote>
        Reasonable job. Reasonable rule. Now — what did we hand the agent
        to do it with?
      </FootNote>
    </Slide>,

    // 10. Pattern 01 · what we gave it — the whole sandbox
    <Slide key="demo1-tool" className="justify-center">
      <Eyebrow>Pattern 01 · what we gave it</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          We gave it{" "}
          <Accent color="danger">the whole sandbox</Accent>.
        </H2>
        <Lede>
          Bash. The filesystem. The network. Anything a human dev could
          run from a terminal, the agent could run too. No bounded probe,
          no narrow tool — just access.
        </Lede>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
        <Panel eyebrow="what we handed over" accent="danger" mono className="!p-5">
{`bash
curl   wget   nc
grep   awk    sed
cat    ls     find
node   npm    git
... anything on $PATH`}
        </Panel>
        <Panel eyebrow="why we did it" accent="accent-3" title="maximum freedom">
          The bet was that more access meant more capability. Give it
          everything; let it pick the right tool. It would figure out
          the smart way to verify a page.
        </Panel>
      </div>
      <FootNote>
        It picked tools, alright. Just not the ones we expected.
      </FootNote>
    </Slide>,

    // 11. Pattern 01 · what it actually did
    <Slide key="demo1-improv" className="justify-center">
      <Eyebrow>Pattern 01 · what it actually did</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          By turn 5 it was using{" "}
          <Accent color="danger"><span className="font-mono">curl</span></Accent>{" "}
          and{" "}
          <Accent color="danger"><span className="font-mono">grep</span></Accent>{" "}
          to &ldquo;check&rdquo; the page.
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
        <Panel eyebrow="what curl is" accent="accent-3" title="a downloader">
          A command-line tool that fetches whatever a URL returns and prints
          it. No browser, no rendering — just the raw text that came back
          from the server.
        </Panel>
        <Panel eyebrow="what grep is" accent="accent-3" title="a text searcher">
          A command-line tool that searches for a string inside text. If the
          string is there, it prints the line. If not, it prints nothing.
        </Panel>
      </div>
      <div className="mt-5 w-full max-w-6xl">
        <Panel eyebrow="the workaround it invented" accent="danger" mono className="!p-4">
{`$ curl https://.../welcome | grep "Welcome"`}
        </Panel>
      </div>
      <FootNote>
        It looks like a check. It is not. The next slide shows why —
        and the slide after that shows what it did to the context window.
      </FootNote>
    </Slide>,

    // 8. Demo 1 · why it matters — same page, two probes, different answers
    <Slide key="demo1-probes" className="justify-center">
      <Eyebrow>Pattern 01 · why the difference matters</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Same page. Two probes.{" "}
          <Accent color="danger">Opposite answers.</Accent>
        </H2>
        <Lede>
          The hero component renders the word &ldquo;Welcome&rdquo; into the
          HTML, then a CSS rule pushes it off-screen. The text is in the
          document. Nobody can see it.
        </Lede>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
        <Panel eyebrow="what the agent ran" accent="danger" title="curl + grep" mono className="!p-5">
{`$ curl -s https://staging.acme.com/welcome \\
    | grep -c "Welcome"

1

$ echo $?
0

# ✓ "found it — ship it"`}
        </Panel>

        <Panel eyebrow="what the probe would have said" accent="success" title="validate-render" mono className="!p-5">
{`validate-render("/welcome", "Welcome")

{
  marker:   "found",
  rendered: false,
  reason:   "element off-screen
            (left: -9999px)",
  screenshot: "hero-broken.png"
}

# ✗ blocked — needs a fix`}
        </Panel>
      </div>

      <div className="mt-5 max-w-6xl text-base md:text-lg text-[color:var(--fg-soft)] text-center">
        <span className="text-[color:var(--fg)]">What the user actually sees:</span>{" "}
        a blank space where the hero should be.{" "}
        <span className="italic">curl can&rsquo;t open a browser. grep can&rsquo;t see a screen.</span>
      </div>
    </Slide>,

    // 9. Demo 1 · run 1 — context decay across turns
    <Slide key="demo2-bad" className="justify-center">
      <Eyebrow>Pattern 01 · run 1 — free sandbox, raw output</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Every command lives in the{" "}
          <Accent color="danger">context window</Accent>.
        </H2>
        <Lede>
          curl returns a page. grep returns lines. cat returns a file.
          Multiply by every turn — and the rules are the first thing
          that gets summarized away.
        </Lede>
      </div>
      <div className="mt-6 w-full max-w-7xl space-y-3">
        <ContextBar
          turn={1}
          segments={[
            { kind: "instructions", pct: 28 },
            { kind: "conversation", pct: 10 },
            { kind: "tool-output", pct: 6 },
            { kind: "free", pct: 56 },
          ]}
          note='"Curling the page to see what comes back."'
        />
        <ContextBar
          turn={3}
          segments={[
            { kind: "instructions", pct: 22 },
            { kind: "conversation", pct: 14 },
            { kind: "tool-output", pct: 38 },
            { kind: "free", pct: 26 },
          ]}
          note='"More pages. Each one another fetch + grep."'
        />
        <ContextBar
          turn={5}
          segments={[
            { kind: "instructions", pct: 12 },
            { kind: "conversation", pct: 16 },
            { kind: "tool-output", pct: 62 },
            { kind: "free", pct: 10 },
          ]}
          note='"Let me curl the page and grep for the marker."'
          noteVariant="dim"
        />
        <ContextBar
          turn={7}
          segments={[
            { kind: "summarized", pct: 12 },
            { kind: "conversation", pct: 14 },
            { kind: "tool-output", pct: 74 },
          ]}
          note='"The page rendered, so I think it works."'
          noteVariant="dim"
          warn
        />
        <ContextBar
          turn={10}
          segments={[
            { kind: "summarized", pct: 16 },
            { kind: "tool-output", pct: 84 },
          ]}
          note="declares success — never opened a real browser"
          noteVariant="danger"
          warn
        />
        <div className="pt-3">
          <ContextLegend />
        </div>
      </div>
      <PillRow className="mt-5">
        <Pill variant="violation">instructions summarized away</Pill>
        <Pill variant="violation">every command in scrollback</Pill>
        <Pill variant="violation">success declared without proof</Pill>
      </PillRow>
    </Slide>,

    // 14. Demo 2 · the change — take away the sandbox, give one narrow tool
    <Slide key="demo2-change" className="justify-center">
      <Eyebrow>Pattern 01 · the change</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Take away the sandbox.{" "}
          <Accent>Give it one narrow tool.</Accent>
        </H2>
        <Lede>
          No more bash. One bounded probe —{" "}
          <span className="font-mono">validate-render</span> — that opens a
          real browser, looks for the marker, and hands back a verdict.
          Not a payload.
        </Lede>
      </div>
      <div className="mt-5 max-w-6xl w-full">
        <div
          className="slide-scroll"
          dangerouslySetInnerHTML={{ __html: boundedToolDiff }}
        />
      </div>
      <PillRow className="mt-5">
        <Pill variant="check">tool does the work</Pill>
        <Pill variant="check">verdict, not payload</Pill>
        <Pill variant="check">context stays readable</Pill>
      </PillRow>
    </Slide>,

    // 15. Demo 2 · run 2 — bounded tool, instructions intact
    <Slide key="demo2-good" className="justify-center">
      <Eyebrow>Pattern 01 · run 2 — bounded tool, instructions intact</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Same agent. Same rules.{" "}
          <Accent color="success">Tool returns a verdict.</Accent>
        </H2>
      </div>
      <div className="mt-6 w-full max-w-7xl space-y-3">
        <ContextBar
          turn={1}
          segments={[
            { kind: "instructions", pct: 28 },
            { kind: "conversation", pct: 10 },
            { kind: "tool-output", pct: 4 },
            { kind: "free", pct: 58 },
          ]}
          note='"Running validate-render before I claim done."'
        />
        <ContextBar
          turn={3}
          segments={[
            { kind: "instructions", pct: 28 },
            { kind: "conversation", pct: 14 },
            { kind: "tool-output", pct: 6 },
            { kind: "free", pct: 52 },
          ]}
          note='"Probe returned {found: true}. Recording the result."'
        />
        <ContextBar
          turn={5}
          segments={[
            { kind: "instructions", pct: 27 },
            { kind: "conversation", pct: 18 },
            { kind: "tool-output", pct: 7 },
            { kind: "free", pct: 48 },
          ]}
          note='"Next component. Same probe."'
        />
        <ContextBar
          turn={7}
          segments={[
            { kind: "instructions", pct: 27 },
            { kind: "conversation", pct: 22 },
            { kind: "tool-output", pct: 9 },
            { kind: "free", pct: 42 },
          ]}
          note='"Probe failed on Header. Reporting it."'
        />
        <ContextBar
          turn={10}
          segments={[
            { kind: "instructions", pct: 26 },
            { kind: "conversation", pct: 28 },
            { kind: "tool-output", pct: 12 },
            { kind: "free", pct: 34 },
          ]}
          note="declares success — every claim backed by a probe verdict"
          noteVariant="success"
        />
        <div className="pt-3">
          <ContextLegend />
        </div>
      </div>
      <PillRow className="mt-5">
        <Pill variant="check">instructions survive turn 10</Pill>
        <Pill variant="check">probe actually runs</Pill>
        <Pill variant="check">no &ldquo;curl + grep&rdquo; drift</Pill>
      </PillRow>
    </Slide>,

    // Lesson 01
    <Slide key="lesson2" hero className="justify-center">
      <Eyebrow>Lesson 01</Eyebrow>
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

    // Bridge — from tools to something bigger
    <Slide key="bridge-tools-to-workflow" className="justify-center">
      <Eyebrow>Bridge</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Tools are{" "}
          <Accent>one place</Accent>{" "}
          workflow leaks out of the agent.
          <br />
          There&rsquo;s a{" "}
          <Accent color="danger">bigger one</Accent>.
        </H2>
      </div>
      <div className="mt-8 max-w-5xl text-lg md:text-xl leading-relaxed text-[color:var(--fg-soft)]">
        Pattern 01 was about <span className="text-[color:var(--fg)]">what the agent receives</span>
         — the tool returns a payload, the rules get pushed out, the agent
        improvises.
      </div>
      <div className="mt-4 max-w-5xl text-lg md:text-xl leading-relaxed text-[color:var(--fg-soft)]">
        The next pattern is about <span className="text-[color:var(--fg)]">what the agent has to remember</span>
         — the rules, the state, the bookkeeping. When that lives in the
        agent&rsquo;s head, it goes wrong in ways the audience here will
        recognize immediately.
      </div>
    </Slide>,

    // ───── INTERLUDE — Why workflow-inside-the-agent is the wrong pattern ─────

    // 17a. The bookkeeping problem
    <Slide key="workflow-bad-1" className="justify-center">
      <Eyebrow>Pattern · why workflow inside an agent breaks</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          LLMs are good at <Accent color="success">judgment</Accent>.{" "}
          Bad at <Accent color="danger">bookkeeping</Accent>.
        </H2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-7xl">
        <Panel eyebrow="good at" accent="success">
          <ul className="space-y-2 text-base md:text-lg leading-snug">
            <li>reading a file and deciding which of three patterns it matches</li>
            <li>writing code that satisfies a description</li>
            <li>summarizing a long document</li>
          </ul>
        </Panel>
        <Panel eyebrow="bad at" accent="danger">
          <ul className="space-y-2 text-base md:text-lg leading-snug">
            <li>tracking which step we&rsquo;re on across 47 turns</li>
            <li>remembering yesterday&rsquo;s decision</li>
            <li>not contradicting itself when state is large</li>
          </ul>
        </Panel>
      </div>
      <div className="mt-8 text-lg md:text-xl italic text-[color:var(--fg-soft)] max-w-5xl text-center">
        The more rules you give an LLM about how to track what it&rsquo;s
        already done,{" "}
        <span className="text-[color:var(--fg)] not-italic">
          the more often it gets one of those rules wrong on a given turn.
        </span>
      </div>
    </Slide>,

    // 17b. Three things we kept seeing
    <Slide key="workflow-bad-2" className="justify-center">
      <Eyebrow>Pattern · three things we kept seeing</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          When workflow lives in the agent,{" "}
          <Accent color="danger">these show up</Accent>.
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="① self-contradiction" accent="danger" title="same chat, four minutes apart">
          <div className="space-y-2 text-base leading-snug">
            <div>
              Turn 12:{" "}
              <span className="text-[color:var(--success)]">
                &ldquo;Migration complete — 100% done.&rdquo;
              </span>{" "}
              Success table attached.
            </div>
            <div>
              Turn 14:{" "}
              <span className="text-[color:var(--danger)]">
                &ldquo;In progress — 53 components pending.&rdquo;
              </span>
            </div>
            <div className="text-sm text-[color:var(--fg-soft)] pt-1">
              Same question. Opposite answers.
            </div>
          </div>
        </Panel>
        <Panel eyebrow="② the user becomes the memory" accent="danger" title="across days, not turns">
          <div className="space-y-2 text-base leading-snug">
            <div className="italic">
              &ldquo;I remember yesterday one component was skipped due to an
              API issue — can you confirm it was later migrated?&rdquo;
            </div>
            <div className="text-sm text-[color:var(--fg-soft)] pt-1">
              When the human is carrying inventory, the bookkeeping is in the
              wrong place.
            </div>
          </div>
        </Panel>
        <Panel eyebrow="③ rescue prompts authored upstream" accent="danger" title="the chat is a typing surface">
          <div className="space-y-2 text-base leading-snug">
            <div>
              Someone outside the chat writes the unblocking prompt.
              The human in the chat pastes it in.
            </div>
            <div className="text-sm text-[color:var(--fg-soft)] pt-1">
              The orchestrator is sitting next to the keyboard, not inside the
              system.
            </div>
          </div>
        </Panel>
      </div>
      <FootNote>
        All three are bookkeeping symptoms. None of them are model-quality
        problems.
      </FootNote>
    </Slide>,

    // 17c. Why — state-in-the-document
    <Slide key="workflow-bad-3" className="justify-center">
      <Eyebrow>Pattern · the root cause</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Workflow state lived in the{" "}
          <Accent color="danger">document the agent reads</Accent>.
        </H2>
        <Lede>
          One pattern, three compounding bugs.
        </Lede>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="bug 1" accent="danger" title="context bloat">
          The document grows as work progresses. Every turn ships more text.
          Reliability falls long before the context window is full.
        </Panel>
        <Panel eyebrow="bug 2" accent="danger" title="read/write races">
          Two sub-agents read, decide, write. The second write silently
          overwrites the first. No one notices until something downstream
          breaks.
        </Panel>
        <Panel eyebrow="bug 3" accent="danger" title="partial-update corruption">
          Asked to &ldquo;update this document&rdquo;, the LLM regenerates the
          whole thing — and quietly drops fields nobody reminded it about.
        </Panel>
      </div>
      <div className="mt-8 max-w-5xl text-center">
        <Pull>
          Take the bookkeeping{" "}
          <Accent color="success">out of the LLM</Accent>. The tool answers
          &ldquo;what&rsquo;s next?&rdquo;. The tool records &ldquo;done.&rdquo;
        </Pull>
      </div>
      <FootNote>That is what Pattern 02 is.</FootNote>
    </Slide>,

    // 18. When to leave the agent in charge (decision frame)
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

    // ───── PATTERN 02 — Workflow in prose vs code ─────

    // Pattern 02 · title card
    <Slide key="pattern2-title" hero className="justify-center">
      <Eyebrow>Pattern 02</Eyebrow>
      <div className="mt-4">
        <Pull>
          Don&rsquo;t <Accent color="danger">describe</Accent> the workflow.
          <br />
          <Accent color="success">Encode</Accent> it.
        </Pull>
      </div>
      <FootNote>
        Prose gets reinterpreted on every run. Code can&rsquo;t.
      </FootNote>
    </Slide>,

    // ───── DEMO 3 — Skill vs CLI (determinism) ─────

    // 18. Demo 3 · setup — same rules, two engines
    <Slide key="demo3-setup" className="justify-center">
      <Eyebrow>Pattern 02 · setup</Eyebrow>
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

    // 19a. Demo 3 · run 1 — the experiment
    <Slide key="demo3-bad-setup" className="justify-center">
      <Eyebrow>Pattern 02 · run 1 — English → LLM</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          Same question.{" "}
          <Accent color="danger">Three times.</Accent>
        </H2>
        <Lede>
          Same tracker. Same rules in plain English. The agent reads them fresh
          on each turn and has to pick the next finding itself.
        </Lede>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <Panel eyebrow="the prompt (run 1, 2, and 3)" accent="danger" mono className="!p-6 text-center">
{`> what's next?`}
        </Panel>
      </div>
      <FootNote>
        There is one correct tiebreaker: A — first in the file. Three runs,
        three answers on the next slide.
      </FootNote>
    </Slide>,

    // 19b. Demo 3 · run 1 — the three answers
    <Slide key="demo3-bad" className="justify-center">
      <Eyebrow>Pattern 02 · run 1 — three answers</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Three runs.{" "}
          <Accent color="danger">Three different answers.</Accent>
        </H2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="run 1" accent="danger" title="A" mono className="!p-5">
{`"earliest small,
 unblocked, planned."`}
        </Panel>
        <Panel eyebrow="run 2" accent="danger" title="B" mono className="!p-5">
{`"A and B are equivalent —
 choosing B."`}
        </Panel>
        <Panel eyebrow="run 3" accent="danger" title="A or B" mono className="!p-5">
{`"both qualify —
 defer to author."`}
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
      <Eyebrow>Pattern 02 · the change</Eyebrow>
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
      <Eyebrow>Pattern 02 · run 2 — TypeScript → Function</Eyebrow>
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
      <Eyebrow>Lesson 02</Eyebrow>
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

    // The recipe — three patterns, three fixes
    <Slide key="recipe" className="justify-center">
      <Eyebrow>The recipe</Eyebrow>
      <div className="mt-3 max-w-6xl">
        <H2>
          Three patterns. <Accent color="success">Same shape of fix.</Accent>
        </H2>
        <Lede>
          Take the thing the LLM keeps getting wrong, and put it somewhere
          that can&rsquo;t drift.
        </Lede>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
        <Panel eyebrow="Pattern 01 · tools" accent="success" title="bound the tool">
          Tools return <span className="font-semibold">verdicts</span>, not
          payloads. The check happens inside the tool; the agent gets back a
          sentence.
        </Panel>
        <Panel eyebrow="Interlude · state" accent="success" title="own the state">
          Bookkeeping leaves the LLM. Deterministic tools own the state.
          The agent asks &ldquo;what&rsquo;s next?&rdquo;{" "}
          — the tool answers.
        </Panel>
        <Panel eyebrow="Pattern 02 · workflow" accent="success" title="encode the workflow">
          The non-negotiable steps live in code. The LLM does the parts that
          actually need judgment — reading and writing, not bookkeeping.
        </Panel>
      </div>
      <FootNote>
        None of this makes the agent less capable. It makes the boundary
        explicit.
      </FootNote>
    </Slide>,

    // 17. What this means for Sitecore teams
    <Slide key="sitecore" className="justify-center">
      <Eyebrow>What this means for Sitecore teams</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>
          AI can accelerate migration —{" "}
          <Accent color="accent-3">but only with tools, checks, and limits around it</Accent>.
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
