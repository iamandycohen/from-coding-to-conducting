import { Deck } from "@/components/Deck";
import {
  Accent,
  Card,
  Eyebrow,
  FootNote,
  H1,
  H2,
  Lede,
  Pull,
  Slide,
  TerminalCue,
} from "@/components/Slide";
import { highlight } from "@/lib/highlight";

export default async function Page() {
  const strictDiff = await highlight(
    `// before
function runTask(input: unknown) {
  const cast = input as { taskId: string };
  return \`processed: \${cast.taskId}\`;
}

// after
const Input = z.object({ taskId: z.string() }).strict();

function runTask(input: unknown) {
  const parsed = Input.parse(input);
  return \`processed: \${parsed.taskId}\`;
}`,
    "typescript",
  );

  const badAgentMd = await highlight(
    `# Sub-agent: Finding Closer

Call the \`migration-work-decide\` tool with:

\`\`\`json
{
  "kind": "finding",
  "key": "abc-123",
  "payload": { "shipped": true },
  "outcomeStatus": "shipped"   ← not a real argument
}
\`\`\`
`,
    "markdown",
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
    <Slide key="1" hero className="justify-center">
      <Eyebrow>Sitecore User Group · Minneapolis 2026</Eyebrow>
      <div className="mt-8 max-w-6xl">
        <H1>
          From Coding to{" "}
          <span className="bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] bg-clip-text text-transparent">
            Conducting
          </span>
        </H1>
        <div className="mt-6 text-2xl md:text-3xl text-[color:var(--fg-soft)]">
          Building with agentic systems.
        </div>
      </div>
      <div className="mt-auto flex items-center gap-6 text-[color:var(--fg-soft)] text-base md:text-lg">
        <span className="numeral">2026.05.20</span>
        <span className="opacity-30">·</span>
        <span>Minneapolis</span>
      </div>
    </Slide>,

    // 2. Setup
    <Slide key="2" className="justify-center">
      <Eyebrow>Where we are</Eyebrow>
      <div className="mt-8 max-w-6xl">
        <H2>
          Two years ago, this talk would have been{" "}
          <Accent>impossible</Accent>.
        </H2>
        <Lede>
          The codebase didn’t exist. The job description didn’t exist. The
          patterns we’re about to look at didn’t exist.
        </Lede>
      </div>
      <FootNote>And yet here we are. So what changed?</FootNote>
    </Slide>,

    // 3. Big thesis
    <Slide key="3" hero className="justify-center">
      <Eyebrow>The thesis</Eyebrow>
      <div className="mt-8">
        <Pull>
          AI didn’t <Accent color="danger">reduce</Accent> the work.
          <br />
          It <Accent>reshaped</Accent> it.
        </Pull>
      </div>
      <FootNote>The job moved up a layer.</FootNote>
    </Slide>,

    // 4. What changed
    <Slide key="4" className="justify-center">
      <Eyebrow>What changed</Eyebrow>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
        <div className="rounded-2xl border border-[color:var(--border)] p-8 bg-[color:var(--bg-soft)]/60">
          <div className="text-[color:var(--fg-soft)] uppercase tracking-widest text-sm mb-4">
            Then
          </div>
          <div className="text-2xl md:text-3xl font-medium leading-snug">
            Write code that runs.
          </div>
          <ul className="mt-6 space-y-3 text-lg text-[color:var(--fg-soft)]">
            <li>— Compose features</li>
            <li>— Manage state</li>
            <li>— Argue with the type system</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[color:var(--accent)]/40 p-8 bg-[color:var(--bg-soft)]/60">
          <div className="text-[color:var(--accent)] uppercase tracking-widest text-sm mb-4">
            Now
          </div>
          <div className="text-2xl md:text-3xl font-medium leading-snug">
            Write code that helps an agent decide what to run.
          </div>
          <ul className="mt-6 space-y-3 text-lg text-[color:var(--fg-soft)]">
            <li>— Design tools as control surfaces</li>
            <li>— Defend the boundary</li>
            <li>— Move workflow out of the prompt</li>
          </ul>
        </div>
      </div>
    </Slide>,

    // 5. Three patterns
    <Slide key="5" className="justify-center">
      <Eyebrow>What we&apos;re going to look at</Eyebrow>
      <div className="mt-8 max-w-6xl">
        <H2>Three patterns. Three demos.</H2>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl">
        <Card
          num="01"
          title="Tools as control surfaces"
          body="The boundary between an agent and the world is a schema. Make it strict, or it will lie to you."
        />
        <Card
          num="02"
          title="The system defends itself"
          body="Agents write prose about tools. That prose can be wrong. Lint it before it ships."
        />
        <Card
          num="03"
          title="Push determinism down"
          body="When the workflow must not improvise, don't leave it inside the agent. Move it to code."
        />
      </div>
    </Slide>,

    // 6. Pattern 1 intro
    <Slide key="6" hero className="justify-center">
      <Eyebrow>Pattern 01</Eyebrow>
      <div className="mt-6 max-w-6xl">
        <H1>
          Tools as <Accent>control surfaces</Accent>.
        </H1>
        <Lede>
          Every tool I write is a control surface. The more autonomy I give the
          agent, the sharper its edges have to be.
        </Lede>
      </div>
    </Slide>,

    // 7. Doc rot + diff
    <Slide key="7" className="justify-center">
      <Eyebrow>The doc-rot story</Eyebrow>
      <div className="mt-6 max-w-6xl">
        <H2 >
          A misnamed key leaked into <Accent color="accent-3">eight</Accent>{" "}
          agent files as &ldquo;an arg you can send.&rdquo;
        </H2>
        <Lede>
          For months. Nobody noticed. The tool just kept silently doing
          nothing.
        </Lede>
      </div>
      <div className="mt-10 max-w-5xl w-full">
        <div
          className="slide-scroll"
          dangerouslySetInnerHTML={{ __html: strictDiff }}
        />
      </div>
    </Slide>,

    // 8. Demo 1 cue
    <Slide key="8" className="justify-center items-center text-center">
      <Eyebrow>Demo 01</Eyebrow>
      <div className="mt-6 max-w-5xl">
        <H1>
          <Accent>.strict()</Accent>
        </H1>
        <Lede>Three characters. Watch what happens.</Lede>
      </div>
      <div className="mt-12">
        <TerminalCue
          label="Switch to terminal"
          command="npm run demo:1"
        />
      </div>
    </Slide>,

    // 9. Lesson 1
    <Slide key="9" hero className="justify-center">
      <Eyebrow>The lesson</Eyebrow>
      <div className="mt-6">
        <Pull>
          Doc rot is real. The tool&rsquo;s schema is the only contract the
          agent <Accent color="danger">can&rsquo;t</Accent> talk past.
        </Pull>
      </div>
      <FootNote>We caught dozens of these the next week. None shipped.</FootNote>
    </Slide>,

    // 10. Pattern 2 intro
    <Slide key="10" hero className="justify-center">
      <Eyebrow>Pattern 02</Eyebrow>
      <div className="mt-6 max-w-6xl">
        <H1>
          The system <Accent color="accent-2">defends itself</Accent>.
        </H1>
        <Lede>
          The runtime defense is good. The commit-time defense is better. The
          system has to defend itself from the agents that write it.
        </Lede>
      </div>
    </Slide>,

    // 11. Bad agent prose
    <Slide key="11" className="justify-center">
      <Eyebrow>The lie in the markdown</Eyebrow>
      <div className="mt-6 max-w-5xl">
        <H2>
          Agent prose can name arguments that <Accent color="danger">don&rsquo;t exist</Accent>.
        </H2>
      </div>
      <div className="mt-10 max-w-5xl w-full">
        <div
          className="slide-scroll"
          dangerouslySetInnerHTML={{ __html: badAgentMd }}
        />
      </div>
      <FootNote>
        A 50-line lint script reads the prose, parses the JSON fences, checks
        the keys against the real schema, and exits 1.
      </FootNote>
    </Slide>,

    // 12. Demo 2 cue
    <Slide key="12" className="justify-center items-center text-center">
      <Eyebrow>Demo 02</Eyebrow>
      <div className="mt-6 max-w-5xl">
        <H1>
          Lint catches the <Accent color="danger">lie</Accent>.
        </H1>
        <Lede>Run the lint. Fix the file. Run it again.</Lede>
      </div>
      <div className="mt-12">
        <TerminalCue
          label="Switch to terminal"
          command="npm run demo:2"
        />
      </div>
    </Slide>,

    // 13. Lesson 2
    <Slide key="13" hero className="justify-center">
      <Eyebrow>The lesson</Eyebrow>
      <div className="mt-6">
        <Pull>
          Agent prose that lies about tools{" "}
          <Accent color="success">cannot land on master</Accent>.
        </Pull>
      </div>
      <FootNote>
        The system defends itself from the agents that write it.
      </FootNote>
    </Slide>,

    // 14. Pattern 3 intro
    <Slide key="14" hero className="justify-center">
      <Eyebrow>Pattern 03</Eyebrow>
      <div className="mt-6 max-w-6xl">
        <H1>
          Determined, not <Accent color="accent-3">disciplined</Accent>.
        </H1>
        <Lede>
          A workflow described to an agent is still being interpreted. Same
          rules, two engines: one drifts. One doesn&rsquo;t.
        </Lede>
      </div>
    </Slide>,

    // 15. Side-by-side rules vs picker
    <Slide key="15" className="justify-center">
      <Eyebrow>Same rules. Two engines.</Eyebrow>
      <div className="mt-4 max-w-6xl">
        <H2>One drifts. One doesn&rsquo;t.</H2>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl deck-compact-code items-start">
        <div className="min-w-0">
          <div className="text-[color:var(--accent-2)] uppercase tracking-widest text-xs mb-4">
            English → LLM
          </div>
          <ol className="space-y-4 text-lg md:text-xl leading-snug list-decimal list-inside marker:text-[color:var(--accent-2)] marker:font-mono">
            <li>
              Only consider findings with status{" "}
              <code className="font-mono text-[color:var(--accent-3)]">planned</code>.
            </li>
            <li>
              Exclude any finding where{" "}
              <code className="font-mono text-[color:var(--accent-3)]">blocked: true</code>.
            </li>
            <li>
              Prefer the smallest sizing (S before M before L).
            </li>
          </ol>
          <div className="mt-6 text-sm text-[color:var(--fg-soft)] italic">
            A and B are a real tie. The agent must invent a tiebreaker.
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-[color:var(--accent)] uppercase tracking-widest text-xs mb-4">
            TypeScript → Function
          </div>
          <div
            className="min-w-0"
            dangerouslySetInnerHTML={{ __html: pickerTs }}
          />
        </div>
      </div>
      <FootNote>
        Both implementations are honest. Only one is reproducible.
      </FootNote>
    </Slide>,

    // 16. Demo 3 cue
    <Slide key="16" className="justify-center items-center text-center">
      <Eyebrow>Demo 03</Eyebrow>
      <div className="mt-6 max-w-5xl">
        <H1>
          Skill <span className="opacity-40">vs</span>{" "}
          <Accent>CLI</Accent>
        </H1>
        <Lede>Three runs each. Watch which one wobbles.</Lede>
      </div>
      <div className="mt-12">
        <TerminalCue
          label="Switch to terminal & chat panel"
          command="npm run demo:3:cli"
        />
      </div>
    </Slide>,

    // 17. Lesson 3 / closer
    <Slide key="17" hero className="justify-center">
      <Eyebrow>The closer</Eyebrow>
      <div className="mt-6">
        <Pull>
          I used to write code that <Accent color="accent-2">ran</Accent>.
          <br />
          Now I write code that helps an agent decide what to{" "}
          <Accent>run</Accent>.
        </Pull>
      </div>
      <FootNote>
        The agents got smaller. The system got reliable. That&rsquo;s the
        job now.
      </FootNote>
    </Slide>,

    // 18. Thanks / Q&A
    <Slide key="18" hero className="justify-center items-center text-center">
      <Eyebrow>Thanks</Eyebrow>
      <div className="mt-6 max-w-5xl">
        <H1>
          Questions?
        </H1>
        <Lede>
          The repo, the demos, and the brief behind this talk are open on the
          presenter&rsquo;s laptop.
        </Lede>
      </div>
      <div className="mt-12 numeral text-[color:var(--fg-soft)] text-sm md:text-base">
        sug-2026-demos · From Coding to Conducting
      </div>
    </Slide>,
  ];

  return <Deck slides={slides} />;
}
