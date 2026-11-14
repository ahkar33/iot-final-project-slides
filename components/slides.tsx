import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BellRing,
  Bot,
  BrainCircuit,
  Clock,
  Cloud,
  Cpu,
  Fan,
  Flame,
  Gauge,
  LayoutDashboard,
  MessageCircle,
  Radar,
  ShieldCheck,
  Thermometer,
  TrendingUp,
  UserX,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Wind,
  Zap,
} from "lucide-react";

export type SlideProps = { eager?: boolean };

type Level = "safe" | "warn" | "danger";

const LEVEL_BG: Record<Level, string> = {
  safe: "bg-safe",
  warn: "bg-warn",
  danger: "bg-danger",
};

/* ---------- Shared building blocks ---------- */

/** Recurring SAFE / WARNING / DANGER traffic-light motif. */
function Lights({
  size = 22,
  active,
  labels = false,
  dark = false,
}: {
  size?: number;
  active?: Level;
  labels?: boolean;
  dark?: boolean;
}) {
  const items: { level: Level; label: string }[] = [
    { level: "safe", label: "SAFE" },
    { level: "warn", label: "WARNING" },
    { level: "danger", label: "DANGER" },
  ];
  return (
    <div className="flex items-center" style={{ gap: size * 0.7 }}>
      {items.map(({ level, label }) => (
        <div key={level} className="flex items-center" style={{ gap: size * 0.45 }}>
          <span
            className={`${LEVEL_BG[level]} inline-block rounded-full`}
            style={{
              width: size,
              height: size,
              opacity: active && active !== level ? 0.25 : 1,
            }}
          />
          {labels && (
            <span
              className={`font-bold tracking-[0.12em] ${dark ? "text-white/70" : "text-charcoal/60"}`}
              style={{ fontSize: size * 0.85 }}
            >
              {label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Frame({
  dark = false,
  children,
}: {
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`slide flex flex-col ${dark ? "bg-charcoal text-white" : "bg-paper text-charcoal"}`}
    >
      {children}
    </section>
  );
}

/** Light content slide with eyebrow, big title and traffic-light motif. */
function Content({
  eyebrow,
  title,
  active,
  compact = false,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  active?: Level;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <Frame>
      <div
        className={`flex h-full flex-col px-[110px] ${compact ? "pt-[60px] pb-[60px]" : "pt-[80px] pb-[90px]"}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[26px] font-bold uppercase tracking-[0.2em] text-charcoal/45">
              {eyebrow}
            </div>
            <h2
              className={`font-bold leading-[1.05] tracking-tight ${compact ? "mt-[10px] text-[60px]" : "mt-[14px] text-[76px]"}`}
            >
              {title}
            </h2>
          </div>
          <div className="pt-[10px]">
            <Lights size={26} active={active} />
          </div>
        </div>
        <div className={`flex min-h-0 flex-1 flex-col ${compact ? "mt-[36px]" : "mt-[56px]"}`}>
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex h-[12px] w-full">
        <div className="flex-1 bg-safe" />
        <div className="flex-1 bg-warn" />
        <div className="flex-1 bg-danger" />
      </div>
    </Frame>
  );
}

function Shot({
  src,
  alt,
  eager,
  sizes = "1200px",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain"
        loading={eager ? "eager" : undefined}
        preload={eager}
        unoptimized
      />
    </div>
  );
}

const TEAM = [
  { name: "Ahkar Toe Maw", id: "67210314" },
  { name: "Zwe Wint Ti", id: "67111318" },
];

/* ---------- 1. Title ---------- */

function TitleSlide({ eager }: SlideProps) {
  return (
    <Frame dark>
      <div className="flex h-full flex-col justify-between px-[130px] py-[110px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[28px]">
            <div className="relative h-[120px] w-[120px] shrink-0">
              <Image
                src="/images/uni_emblem.png"
                alt="Krirk University emblem"
                fill
                sizes="120px"
                className="object-contain"
                loading={eager ? "eager" : undefined}
                preload={eager}
              />
            </div>
            <div className="border-l border-white/20 pl-[28px]">
              <div className="text-[30px] font-bold tracking-[0.08em]">KRIRK UNIVERSITY</div>
              <div className="mt-[6px] text-[24px] text-white/60">British International College</div>
            </div>
          </div>
          <Lights size={26} labels dark />
        </div>
        <div>
          <h1 className="max-w-[1500px] text-[112px] font-bold leading-[1.02] tracking-tight">
            Smart Kitchen
            <br />
            Gas <span className="text-warn">&amp;</span> Fire{" "}
            <span className="text-danger">Alert</span> System
          </h1>
          <p className="mt-[36px] text-[42px] text-white/75">
            An edge-intelligent IoT safety system for smart homes
          </p>
        </div>
        <div className="flex items-end justify-between border-t border-white/15 pt-[44px]">
          <div>
            <div className="text-[24px] font-bold uppercase tracking-[0.2em] text-safe">
              Group 4
            </div>
            <div className="mt-[12px] flex gap-[56px] text-[34px] font-bold">
              {TEAM.map((m) => (
                <span key={m.id}>
                  {m.name} <span className="font-normal text-white/50">({m.id})</span>
                </span>
              ))}
            </div>
          </div>
          <div className="text-right text-[24px] leading-[1.6] text-white/60">
            <div>B.Tech in ICT, Year 3 | Subject: Internet of Things | Lecturer: Mr. Minn Swe</div>
            <div>British International College, Krirk University | 16 November 2026</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- 2. Problem ---------- */

function ProblemSlide() {
  const cards = [
    {
      icon: Wind,
      color: "text-warn",
      bar: "bg-warn",
      title: "Silent gas leaks",
      text: "Many Thai homes and street-food vendors cook with LPG cylinders. A leak makes no sound.",
    },
    {
      icon: Flame,
      color: "text-danger",
      bar: "bg-danger",
      title: "Fire in minutes",
      text: "A forgotten pan can start a fire in minutes.",
    },
    {
      icon: UserX,
      color: "text-charcoal",
      bar: "bg-charcoal",
      title: "Nobody watching",
      text: "Worst at night, at work, or for elderly people living alone.",
    },
  ];
  return (
    <Content eyebrow="01 · The problem" title="Kitchen danger is silent and fast" active="danger">
      <div className="grid flex-1 grid-cols-3 gap-[48px]">
        {cards.map(({ icon: Icon, color, bar, title, text }) => (
          <div
            key={title}
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-white p-[52px] shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <div className={`absolute left-0 top-0 h-[10px] w-full ${bar}`} />
            <Icon className={color} size={120} strokeWidth={1.7} />
            <div className="mt-[44px] text-[52px] font-bold leading-tight">{title}</div>
            <div className="mt-[22px] text-[35px] leading-[1.4] text-charcoal/70">{text}</div>
          </div>
        ))}
      </div>
      <div className="mt-[44px] flex items-center gap-[24px] rounded-[20px] bg-charcoal px-[44px] py-[30px] text-[32px] text-white">
        <BellRing className="shrink-0 text-warn" size={44} />
        <span>
          Normal smoke alarms only beep locally, react late, and{" "}
          <b className="text-danger">can&apos;t stop the gas</b>.
        </span>
      </div>
    </Content>
  );
}

/* ---------- 3. Solution ---------- */

function SolutionSlide() {
  const cols = [
    {
      step: "Sense",
      icon: Radar,
      color: "bg-safe",
      items: [
        { icon: Wind, text: "MQ-2 gas sensor" },
        { icon: Thermometer, text: "DHT22 temperature" },
        { icon: Clock, text: "Watching 24/7" },
      ],
    },
    {
      step: "Decide",
      icon: BrainCircuit,
      color: "bg-warn",
      items: [
        { icon: Cpu, text: "Edge AI on the ESP32" },
        { icon: ShieldCheck, text: "SAFE / WARNING / DANGER" },
        { icon: WifiOff, text: "No cloud needed to decide" },
      ],
    },
    {
      step: "Act & Alert",
      icon: Zap,
      color: "bg-danger",
      items: [
        { icon: Gauge, text: "Close gas valve (servo)" },
        { icon: Fan, text: "Exhaust fan ON, alarm + LCD" },
        { icon: MessageCircle, text: "Instant LINE + live dashboard" },
      ],
    },
  ];
  return (
    <Content eyebrow="02 · The solution" title="Sense. Decide. Act." active="safe">
      <div className="flex flex-1 items-stretch gap-[20px]">
        {cols.map(({ step, icon: Icon, color, items }, i) => (
          <div key={step} className="flex flex-1 items-center gap-[20px]">
            <div className="flex h-full flex-1 flex-col rounded-[28px] bg-white p-[46px] shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-[22px]">
                <div
                  className={`flex h-[84px] w-[84px] items-center justify-center rounded-full ${color} text-white`}
                >
                  <Icon size={46} />
                </div>
                <div className="text-[48px] font-bold">{step}</div>
              </div>
              <ul className="mt-[48px] flex flex-1 flex-col justify-around pb-[10px]">
                {items.map(({ icon: ItemIcon, text }) => (
                  <li key={text} className="flex items-center gap-[22px] text-[35px] leading-tight">
                    <ItemIcon className="shrink-0 text-charcoal/50" size={42} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            {i < cols.length - 1 && (
              <ArrowRight className="shrink-0 text-charcoal/30" size={56} strokeWidth={2.5} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-[40px] flex items-center gap-[24px] rounded-[20px] bg-charcoal px-[44px] py-[28px] text-[31px] text-white">
        <VolumeX className="shrink-0 text-safe" size={42} />
        <span>
          Remote control: silence the buzzer, reset the valve{" "}
          <b className="text-safe">only when SAFE</b>.
        </span>
      </div>
    </Content>
  );
}

/* ---------- 4. Three levels ---------- */

function LevelsSlide() {
  const levels = [
    {
      level: "safe" as Level,
      name: "SAFE",
      trigger: "Normal readings",
      actions: ["Green LED", "Valve open", "Fan off"],
    },
    {
      level: "warn" as Level,
      name: "WARNING",
      trigger: "Gas > warning threshold OR temp 40–50 °C",
      actions: ["Yellow LED", "Fan ON", "Short beeps"],
    },
    {
      level: "danger" as Level,
      name: "DANGER",
      trigger: "Gas > danger threshold OR temp > 50 °C OR rapid temp rise (fire)",
      actions: ["Red LED", "Valve CLOSED", "Fast alarm", "LINE alert"],
    },
  ];
  return (
    <Content eyebrow="03 · How it reacts" title="Three levels, three responses">
      <div className="grid flex-1 grid-cols-3 gap-[44px]">
        {levels.map(({ level, name, trigger, actions }) => (
          <div
            key={name}
            className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <div
              className={`${LEVEL_BG[level]} flex items-center gap-[22px] px-[44px] py-[30px] ${level === "warn" ? "text-charcoal" : "text-white"}`}
            >
              <span className="inline-block h-[34px] w-[34px] rounded-full border-[5px] border-current" />
              <span className="text-[50px] font-bold tracking-wide">{name}</span>
            </div>
            <div className="flex flex-1 flex-col px-[44px] py-[36px]">
              <div className="text-[22px] font-bold uppercase tracking-[0.18em] text-charcoal/40">
                When
              </div>
              <div className="mt-[10px] min-h-[130px] text-[30px] leading-[1.35]">{trigger}</div>
              <div className="mt-[22px] text-[22px] font-bold uppercase tracking-[0.18em] text-charcoal/40">
                Then
              </div>
              <ul className="mt-[14px] flex flex-col gap-[14px]">
                {actions.map((a) => (
                  <li key={a} className="flex items-center gap-[16px] text-[32px] font-bold">
                    <span className={`${LEVEL_BG[level]} h-[14px] w-[14px] shrink-0 rounded-full`} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[36px] flex items-center gap-[22px] text-[30px] text-charcoal/75">
        <ShieldCheck className="shrink-0 text-safe" size={40} />
        <span>
          Back to SAFE only after <b className="text-charcoal">5 s of safe readings</b>, then sends{" "}
          <b className="text-safe">ALL CLEAR</b>.
        </span>
      </div>
    </Content>
  );
}

/* ---------- 5. Architecture ---------- */

function ArchitectureSlide({ eager }: SlideProps) {
  const tiers = [
    { icon: Cpu, label: "Edge", text: "ESP32 + sensors" },
    { icon: Cloud, label: "Cloud", text: "Adafruit IO MQTT, LINE Messaging API" },
    { icon: LayoutDashboard, label: "User", text: "Dashboard, LINE app" },
  ];
  return (
    <Content eyebrow="04 · System architecture" title="Edge to cloud to phone" compact>
      <div className="min-h-0 flex-1">
        <Shot src="/images/architecture.png" alt="System architecture diagram" eager={eager} sizes="1700px" />
      </div>
      <div className="mt-[28px] flex items-center justify-center gap-[24px] text-[27px]">
        {tiers.map(({ icon: Icon, label, text }, i) => (
          <div key={label} className="flex items-center gap-[24px]">
            <div className="flex items-center gap-[14px]">
              <Icon className="text-charcoal/60" size={34} />
              <b>{label}</b>
              <span className="text-charcoal/60">({text})</span>
            </div>
            {i < tiers.length - 1 && <ArrowRight className="text-charcoal/30" size={32} />}
          </div>
        ))}
      </div>
    </Content>
  );
}

/* ---------- 6. Edge logic ---------- */

function EdgeLogicSlide() {
  const steps = [
    {
      icon: Gauge,
      title: "Calibration",
      text: "Learns the clean-air baseline for 10 s at boot",
    },
    {
      icon: TrendingUp,
      title: "Moving average",
      text: "Last 5 gas readings filter noise and false alarms",
    },
    {
      icon: Radar,
      title: "Dynamic thresholds",
      text: (
        <>
          <span className="block font-bold text-[#b07a00]">WARNING</span>
          <span className="block">baseline + 800</span>
          <span className="mt-[14px] block font-bold text-danger">DANGER</span>
          <span className="block">baseline + 1600</span>
        </>
      ),
    },
    {
      icon: Flame,
      title: "Rate-of-rise + hysteresis",
      text: "+5 °C in 10 s = fire. No flickering alarms.",
    },
  ];
  return (
    <Content
      eyebrow="05 · Smart edge logic"
      title={
        <>
          Statistical AI <span className="text-charcoal/35">(Option A)</span>
        </>
      }
      active="warn"
    >
      <div className="grid flex-1 grid-cols-4 gap-[36px]">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="flex flex-col rounded-[28px] bg-white p-[42px] shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[110px] font-bold leading-none text-charcoal/12">{i + 1}</span>
              <Icon className="text-charcoal/70" size={66} strokeWidth={1.8} />
            </div>
            <div className="mt-[36px] text-[40px] font-bold leading-tight">{title}</div>
            <div className="mt-[22px] text-[32px] leading-[1.45] text-charcoal/70">{text}</div>
          </div>
        ))}
      </div>
      <div className="mt-[40px] flex items-center gap-[24px] rounded-[20px] bg-charcoal px-[44px] py-[28px] text-[31px] text-white">
        <Wifi className="shrink-0 text-safe" size={42} />
        <span>
          Local alarm fires first, network second, so it{" "}
          <b className="text-safe">works even without Wi-Fi</b>.
        </span>
      </div>
    </Content>
  );
}

/* ---------- 7. Hardware ---------- */

function HardwareSlide({ eager }: SlideProps) {
  const parts: [string, string][] = [
    ["ESP32 DevKit C", "MCU"],
    ["MQ-2 gas", "GPIO34 (ADC1)"],
    ["DHT22", "GPIO15"],
    ["LEDs G / Y / R", "26 / 27 / 14"],
    ["Buzzer", "25"],
    ["Servo valve", "13"],
    ["Fan relay", "33"],
    ["LCD I2C", "21 / 22"],
    ["Silence button", "32"],
  ];
  return (
    <Content eyebrow="06 · Hardware (Wokwi)" title="Built and simulated on Wokwi" compact>
      <div className="flex min-h-0 flex-1 gap-[60px]">
        <div className="min-h-0 flex-[1.45] rounded-[28px] bg-white p-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <Shot src="/images/circuit.png" alt="Wokwi circuit" eager={eager} sizes="full" />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          {parts.map(([name, pin]) => (
            <div
              key={name}
              className="flex items-center justify-between border-b border-charcoal/10 py-[15px] text-[30px]"
            >
              <span className="font-bold">{name}</span>
              <span className="rounded-[10px] bg-charcoal px-[16px] py-[4px] font-mono text-[25px] text-white">
                {pin}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Content>
  );
}

/* ---------- 8. Dashboard & alerts ---------- */

function DashboardSlide({ eager }: SlideProps) {
  return (
    <Content eyebrow="07 · Dashboard & alerts" title="See it. Get told. Control it." compact>
      <div className="flex min-h-0 flex-1 items-stretch justify-center gap-[110px]">
        <figure className="flex min-h-0 items-center gap-[40px]">
          <div className="relative aspect-[814/1378] h-full overflow-hidden rounded-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            <Shot src="/images/dashboard_full.png" alt="Adafruit IO dashboard" eager={eager} sizes="500px" />
          </div>
          <figcaption className="w-[360px]">
            <LayoutDashboard className="text-safe" size={60} />
            <div className="mt-[18px] text-[40px] font-bold leading-tight">Adafruit IO dashboard</div>
            <div className="mt-[14px] text-[28px] leading-[1.45] text-charcoal/65">
              Temp gauge, gas chart, status, silence toggle, reset valve
            </div>
          </figcaption>
        </figure>
        <figure className="flex min-h-0 items-center gap-[40px]">
          <div className="relative aspect-[588/1280] h-full overflow-hidden rounded-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            <Shot src="/images/line.png" alt="LINE bot alerts" eager={eager} sizes="400px" />
          </div>
          <figcaption className="w-[320px]">
            <Bot className="text-safe" size={60} />
            <div className="mt-[18px] text-[40px] font-bold leading-tight">LINE Bot</div>
            <div className="mt-[14px] text-[28px] leading-[1.45] text-charcoal/65">
              <b className="text-danger">DANGER</b> + <b className="text-safe">ALL CLEAR</b> messages
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="mt-[30px] flex items-center justify-center gap-[22px] rounded-[20px] bg-danger px-[44px] py-[22px] text-[32px] font-bold text-white">
        <Volume2 size={40} />
        LIVE DEMO next: Wokwi (left) + Dashboard / LINE (right)
      </div>
    </Content>
  );
}

/* ---------- 9. Q&A ---------- */

function QASlide() {
  return (
    <Frame dark>
      <div className="flex h-full flex-col items-center justify-center px-[130px] text-center">
        <Lights size={44} />
        <h2 className="mt-[70px] text-[150px] font-bold leading-[1] tracking-tight">Thank you</h2>
        <div className="mt-[30px] text-[80px] font-bold text-warn">Questions?</div>
        <div className="mt-[80px] flex items-center gap-[18px] text-[30px] text-white/70">
          <Cpu size={36} className="text-safe" />
          Try it on Wokwi:{" "}
          <a href="https://wokwi.com/projects/480645491933037569" className="font-mono text-white underline decoration-white/30 underline-offset-8">
            https://wokwi.com/projects/480645491933037569
          </a>
        </div>
        <div className="mt-[60px] flex gap-[60px] text-[30px] text-white/60">
          <span className="font-bold uppercase tracking-[0.2em] text-safe">Group 4</span>
          {TEAM.map((m) => (
            <span key={m.id}>
              <b className="text-white">{m.name}</b> ({m.id})
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export const slides: ((p: SlideProps) => ReactNode)[] = [
  TitleSlide,
  ProblemSlide,
  SolutionSlide,
  LevelsSlide,
  ArchitectureSlide,
  EdgeLogicSlide,
  HardwareSlide,
  DashboardSlide,
  QASlide,
];

