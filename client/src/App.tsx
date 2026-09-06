import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Command,
  Copy,
  FileCode2,
  Grid2X2,
  Home,
  Layers3,
  Menu,
  Moon,
  Play,
  RotateCcw,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  Terminal,
  Users,
  X,
} from "lucide-react";
import {
  commands,
  configTemplates,
  configTypes,
  features,
  getStoredProgress,
  modules,
  navItems,
  quizQuestions,
  resources,
  saveProgress,
  terminalResponses,
} from "./data";

type Theme = "light" | "dark";

const iconMap: Record<string, typeof Home> = { home: Home, book: BookOpen, target: Target, terminal: Terminal, sparkles: Sparkles, command: Command, grid: Grid2X2, layers: Layers3 };

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("cc-theme") as Theme) || "light");
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem("cc-theme", theme); }, [theme]);
  return { theme, toggle: () => setTheme((value) => value === "light" ? "dark" : "light") };
}

function App() {
  const { theme, toggle } = useTheme();
  return <Shell theme={theme} toggleTheme={toggle}><Switch>
    <Route path="/" component={HomePage} />
    <Route path="/apprendre" component={LearnPage} />
    <Route path="/apprendre/:id" component={ModulePage} />
    <Route path="/evaluation" component={EvaluationPage} />
    <Route path="/laboratoire" component={PlaygroundPage} />
    <Route path="/generateur" component={BuilderPage} />
    <Route path="/cheat-sheet" component={CheatSheetPage} />
    <Route path="/index" component={IndexPage} />
    <Route path="/ressources" component={ResourcesPage} />
    <Route path="/feedback" component={FeedbackPage} />
    <Route path="/changelog" component={ChangelogPage} />
    <Route component={NotFoundPage} />
  </Switch></Shell>;
}

function Shell({ children, theme, toggleTheme }: { children: React.ReactNode; theme: Theme; toggleTheme: () => void }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = getStoredProgress();
  const completedCount = progress.completed?.length || 0;
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 8); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => setMenuOpen(false), [location]);
  return <div className="app-shell"><div className="ambient" /><div className="topline" />
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Claude Code Académie, accueil"><span className="brand-mark"><span>›_</span></span><span>Claude Code<small>Académie pratique</small></span></Link>
        <nav className="nav-links" aria-label="Navigation principale">{navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href || (item.href !== "/" && location.startsWith(item.href)) ? "active" : ""}`}>{item.label}</Link>)}</nav>
        <div className="nav-actions"><span className="progress-chip"><span className="progress-dot" />{completedCount}/12 modules</span><button className="icon-btn" onClick={toggleTheme} aria-label={`Activer le mode ${theme === "light" ? "sombre" : "clair"}`}>{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}</button><button className="mobile-menu" onClick={() => setMenuOpen((v) => !v)} aria-label="Ouvrir le menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </div>
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Navigation mobile">{navItems.map((item) => { const Icon = iconMap[item.icon]; return <Link key={item.href} href={item.href} className="nav-link"><Icon size={15} /> {item.label}</Link>; })}</nav>
    </header>
    {children}
    <Footer />
  </div>;
}

function HomePage() {
  const [, navigate] = useLocation();
  return <>
    <main>
      <section className="hero"><div className="container hero-grid"><div>
        <span className="eyebrow">Académie francophone · édition 01</span>
        <h1>Apprenez <em>Claude Code</em> en pratiquant.</h1>
        <p className="hero-copy">Une plateforme interactive pour comprendre Claude Code, expérimenter ses fonctionnalités et construire des workflows qui tiennent dans la vraie vie.</p>
        <div className="hero-actions"><button className="btn btn-primary" onClick={() => navigate("/apprendre")}>Commencer l’apprentissage <ArrowRight size={15} /></button><button className="btn btn-ghost" onClick={() => navigate("/evaluation")}>Évaluer mon niveau <Target size={15} /></button></div>
        <div className="hero-meta"><div className="avatar-stack"><span className="avatar">AM</span><span className="avatar">SL</span><span className="avatar">NK</span></div><span><strong>+2 400</strong> développeurs apprennent déjà en pratiquant</span></div>
      </div><HeroTerminal /></div></section>
      <section className="section section-soft"><div className="container"><div className="section-header"><div><span className="section-kicker">01 / Parcours guidé</span><h2>Un chemin clair,<br />du premier prompt au workflow.</h2></div><p className="section-intro">Le contenu pédagogique est organisé pour avancer sans se perdre : une notion, une pratique, un retour immédiat.</p></div><div className="modules-grid">{modules.slice(0, 4).map((module) => <ModuleCard key={module.id} module={module} />)}</div><div style={{ textAlign: "center", marginTop: 26 }}><Link href="/apprendre" className="btn btn-ghost">Voir les 12 modules <ArrowRight size={14} /></Link></div></div></section>
      <section className="section"><div className="container"><div className="feature-strip"><FeatureItem icon={<Terminal size={18} />} title="Pratiquer dans le navigateur" text="Un terminal simulé pour tester les commandes sans installation ni clé API." /><FeatureItem icon={<Sparkles size={18} />} title="Construire vos configurations" text="Générez CLAUDE.md, Hooks, Skills, Agents et MCP avec un workflow guidé." /><FeatureItem icon={<CheckCircle2 size={18} />} title="Vérifier ce que vous avez compris" text="Chaque module se termine par un quiz expliqué, pas seulement noté." /></div></div></section>
      <section className="section path-section section-soft"><div className="container path-grid"><div className="path-aside"><span className="section-kicker">02 / Votre progression</span><h2>Apprendre par petites victoires.</h2><p>Un tableau de bord local garde le fil de vos sessions, même sans compte. Reprenez là où vous vous êtes arrêté.</p><div className="path-stats"><div className="path-stat"><strong>12</strong><span>modules</span></div><div className="path-stat"><strong>6h</strong><span>de pratique</span></div><div className="path-stat"><strong>4</strong><span>niveaux</span></div></div></div><div className="path-list">{modules.slice(0, 5).map((module) => <PathRow key={module.id} module={module} />)}</div></div></section>
      <section className="section"><div className="container"><div className="section-header"><div><span className="section-kicker">03 / Boîte à outils</span><h2>Pratiquez sans changer d’onglet.</h2></div><p className="section-intro">Des outils conçus pour passer de la théorie à un résultat concret en quelques minutes.</p></div><div className="tools-grid"><ToolCard icon={<Terminal size={17} />} title="Laboratoire" text="Un terminal d’entraînement avec exercices guidés." href="/laboratoire" /><ToolCard icon={<Sparkles size={17} />} title="Générateur" text="Construisez vos fichiers de configuration." href="/generateur" /><ToolCard icon={<Command size={17} />} title="Cheat Sheet" text="La shortlist des commandes utiles." href="/cheat-sheet" /><ToolCard icon={<Grid2X2 size={17} />} title="Index" text="Recherchez une fonctionnalité par catégorie." href="/index" /><ToolCard icon={<Layers3 size={17} />} title="Ressources" text="Guides, templates et références." href="/ressources" /></div></div></section>
      <section className="section"><div className="container"><div className="cta-band"><span className="eyebrow">Votre prochaine session</span><h2>Moins de lecture passive. Plus de terrain.</h2><p>Commencez par le module qui correspond à votre niveau. Vous pourrez toujours revenir en arrière.</p><div className="hero-actions"><Link href="/apprendre" className="btn btn-primary">Voir le parcours <ArrowRight size={15} /></Link><Link href="/laboratoire" className="btn" style={{ color: "white", background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.18)" }}>Ouvrir le laboratoire <Play size={14} /></Link></div></div></div></section>
    </main>
  </>;
}

function HeroTerminal() {
  return <div className="hero-visual"><div className="terminal"><div className="terminal-head"><div className="term-dots"><span className="term-dot" /><span className="term-dot" /><span className="term-dot" /></div><span className="term-title">claude — projet-demo</span><span style={{ width: 30 }} /></div><div className="terminal-body"><span className="term-line term-muted">Bienvenue dans Claude Code</span><span className="term-line term-muted">Tapez une commande pour commencer.</span><br /><span className="term-line"><span className="term-prompt">›</span> /help</span><br /><span className="term-line term-green">Commandes disponibles :</span><span className="term-line">  <span className="term-cyan">/help</span>        Afficher cette aide</span><span className="term-line">  <span className="term-cyan">/compact</span>     Résumer le contexte</span><span className="term-line">  <span className="term-cyan">/clear</span>       Réinitialiser la session</span><br /><span className="term-line"><span className="term-prompt">›</span> Décris-moi ce projet en trois points<span className="cursor" /></span></div><div className="term-bottom"><span className="term-status">Prêt à pratiquer</span><span>v 1.0.4</span></div></div></div>;
}

function ModuleCard({ module }: { module: typeof modules[number] }) {
  return <Link href={`/apprendre/${module.id}`} className="module-card"><span className={`card-orb orb-${module.accent}`} /><span className="module-number">{module.number} / {module.tag}</span><h3>{module.title}</h3><p>{module.description}</p><div className="module-footer"><span className="pill">{module.level} · {module.duration}</span><span className="module-arrow"><ChevronRight size={15} /></span></div><div className="progress-line"><span style={{ width: `${module.progress}%` }} /></div></Link>;
}

function PathRow({ module }: { module: typeof modules[number] }) {
  return <Link href={`/apprendre/${module.id}`} className="path-row"><span className="path-index">{module.number}</span><span><h3>{module.title}</h3><p>{module.description}</p></span><span className="row-meta"><span>{module.level}</span><span>{module.duration}</span></span></Link>;
}

function FeatureItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="feature-item"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>; }
function ToolCard({ icon, title, text, href }: { icon: React.ReactNode; title: string; text: string; href: string }) { return <Link href={href} className="tool-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><span className="tool-link">Ouvrir <ArrowRight size={12} style={{ verticalAlign: -2 }} /></span></Link>; }

function PageIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) { return <div className="page-hero"><div className="container"><span className="eyebrow">{kicker}</span><h1 className="display">{title}</h1><p>{text}</p></div></div>; }

function LearnPage() {
  const [level, setLevel] = useState("Tous");
  const [query, setQuery] = useState("");
  const filtered = modules.filter((m) => (level === "Tous" || m.level === level) && `${m.title} ${m.description}`.toLowerCase().includes(query.toLowerCase()));
  const progress = getStoredProgress();
  return <main><PageIntro kicker="Parcours / 12 modules" title="Apprendre, étape par étape." text="Un parcours structuré pour passer des premières commandes aux configurations qui rendent votre équipe plus autonome." /><div className="container page-grid"><div><div className="filter-row">{["Tous", "Débutant", "Intermédiaire", "Avancé"].map((item) => <button key={item} className={`filter-btn ${level === item ? "active" : ""}`} onClick={() => setLevel(item)}>{item}</button>)}<div className="search-box"><Search size={14} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un module" /></div></div><div className="module-list">{filtered.map((module) => <ModuleCard key={module.id} module={{ ...module, progress: progress.completed?.includes(module.id) ? 100 : module.progress }} />)}</div></div><aside className="side-card"><span className="section-kicker">Votre espace</span><h3 style={{ marginTop: 9 }}>Progression globale</h3><div className="progress-line" style={{ marginTop: 14 }}><span style={{ width: `${Math.round(((progress.completed?.length || 0) / modules.length) * 100)}%` }} /></div><p style={{ marginTop: 10 }}>{progress.completed?.length || 0} module(s) terminé(s) sur {modules.length}. Votre parcours est conservé localement.</p><Link href="/evaluation" className="btn btn-primary btn-small" style={{ marginTop: 18 }}>Évaluer mon niveau <Target size={13} /></Link></aside></div></main>;
}

function ModulePage({ params }: { params: { id: string } }) {
  const module = modules.find((item) => item.id === params.id) || modules[0];
  const [done, setDone] = useState(() => getStoredProgress().completed?.includes(module.id) || false);
  const markDone = () => { const current = getStoredProgress().completed || []; if (!current.includes(module.id)) saveProgress({ completed: [...current, module.id] }); setDone(true); };
  return <main><PageIntro kicker={`Module ${module.number} / ${module.level}`} title={module.title} text={module.description} /><div className="container page-grid"><article><div className="builder-card" style={{ marginBottom: 18 }}><span className="section-kicker">Objectif de la session</span><h2 style={{ marginTop: 9 }}>Comprendre, essayer, vérifier.</h2><p>Ce module conserve l’approche terrain du parcours d’origine : une notion courte, un exemple dans le terminal, puis une mise en pratique guidée.</p><div className="feature-strip" style={{ marginTop: 26 }}><FeatureItem icon={<BookOpen size={17} />} title="Comprendre" text="Les concepts indispensables, expliqués sans détour." /><FeatureItem icon={<Terminal size={17} />} title="Pratiquer" text="Un exercice guidé directement dans le laboratoire." /><FeatureItem icon={<Check size={17} />} title="Valider" text="Un quiz court pour ancrer la notion." /></div></div><div className="builder-card"><span className="section-kicker">Leçon interactive</span><h2 style={{ marginTop: 9 }}>Le bon niveau de contexte fait la différence.</h2><p>Claude Code donne de meilleurs résultats lorsque vos conventions, vos contraintes et le résultat attendu sont visibles. Commencez par décrire le projet, puis demandez une première action vérifiable.</p><div className="code-preview" style={{ marginTop: 20 }}>{`› Lis la structure de ce dépôt et propose un plan en 3 étapes.\n\n✓ Le contexte est explicite\n✓ Le résultat attendu est vérifiable\n✓ L’action reste réversible`}</div><div className="builder-actions"><Link href="/laboratoire" className="btn btn-ghost">Pratiquer dans le laboratoire <Terminal size={14} /></Link><button className={`btn ${done ? "" : "btn-primary"}`} onClick={markDone}>{done ? <><CheckCircle2 size={14} /> Module terminé</> : <>Marquer comme terminé <Check size={14} /></>}</button></div></div></article><aside className="side-card"><span className="section-kicker">À retenir</span><h3 style={{ marginTop: 9 }}>3 réflexes utiles</h3><div className="help-copy"><p><strong>1. Donner le contexte</strong>Un bon fichier CLAUDE.md évite de répéter les mêmes règles.</p><p><strong>2. Demander un plan</strong>Avant d’agir, faites expliciter les étapes et les risques.</p><p><strong>3. Vérifier le résultat</strong>Une commande, un test ou un diff rend la sortie tangible.</p></div></aside></div></main>;
}

function EvaluationPage() {
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null); const [score, setScore] = useState(0); const [finished, setFinished] = useState(false); const question = quizQuestions[index];
  const answer = (choice: number) => { if (selected !== null) return; setSelected(choice); if (choice === question.answer) setScore((v) => v + 1); };
  const next = () => { if (index === quizQuestions.length - 1) { const finalScore = score + (selected === question.answer ? 1 : 0); saveProgress({ quizScore: finalScore }); setScore(finalScore); setFinished(true); } else { setIndex((v) => v + 1); setSelected(null); } };
  return <main><PageIntro kicker="Diagnostic / 4 questions" title="Évaluer mon niveau." text="Un diagnostic rapide pour vous orienter vers le bon point de départ. Il n’y a rien à réussir, seulement un parcours à ajuster." /><div className="container" style={{ paddingBottom: 90 }}>{finished ? <div className="quiz-card"><span className="section-kicker">Résultat personnalisé</span><h2 style={{ marginTop: 12 }}>Vous êtes prêt à passer au niveau supérieur.</h2><p style={{ color: "var(--muted)" }}>Votre score : <strong style={{ color: "var(--ink)" }}>{score} / {quizQuestions.length}</strong>. Nous vous recommandons de consolider les fondamentaux puis de pratiquer dans le laboratoire.</p><div className="feature-strip" style={{ margin: "26px 0" }}><FeatureItem icon={<CheckCircle2 size={17} />} title="Points forts" text="Comprendre le contexte et les commandes essentielles." /><FeatureItem icon={<Target size={17} />} title="À renforcer" text="La structuration des workflows et des configurations." /><FeatureItem icon={<Sparkles size={17} />} title="Prochaine étape" text="Le module Mémoire & CLAUDE.md." /></div><div className="hero-actions"><Link href="/apprendre/memoire" className="btn btn-primary">Commencer mon parcours <ArrowRight size={14} /></Link><button className="btn btn-ghost" onClick={() => { setIndex(0); setScore(0); setSelected(null); setFinished(false); }}>Recommencer <RotateCcw size={14} /></button></div></div> : <div className="quiz-card"><div className="quiz-top"><span>Question {index + 1} / {quizQuestions.length}</span><span>{Math.round((index / quizQuestions.length) * 100)} % parcouru</span></div><div className="quiz-progress"><span style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }} /></div><h2>{question.question}</h2><div className="answers">{question.options.map((option, choice) => <button key={option} className={`answer ${selected !== null && choice === question.answer ? "correct" : ""} ${selected === choice && choice !== question.answer ? "wrong" : ""}`} onClick={() => answer(choice)}><span className="answer-key">{String.fromCharCode(65 + choice)}</span>{option}</button>)}</div>{selected !== null && <><div className="quiz-feedback"><strong>{selected === question.answer ? "Bonne réponse." : "Pas tout à fait."}</strong>{question.explanation}</div><div style={{ marginTop: 18 }}><button className="btn btn-primary" onClick={next}>{index === quizQuestions.length - 1 ? "Voir mon résultat" : "Question suivante"} <ArrowRight size={14} /></button></div></>}</div>}</div></main>;
}

function PlaygroundPage() {
  const [input, setInput] = useState(""); const [lines, setLines] = useState<string[]>(["Bienvenue dans le laboratoire Claude Code.", "Tapez /help pour voir les commandes disponibles."]); const [exercise, setExercise] = useState("help");
  const run = () => { const value = input.trim(); if (!value) return; const response = terminalResponses[value] || [`Je simule l’exécution de « ${value} ».`, "  Résultat disponible pour continuer l’exercice."]; setLines((previous) => [...previous, `› ${value}`, ...response]); setInput(""); };
  const reset = () => setLines(["Bienvenue dans le laboratoire Claude Code.", "Tapez /help pour voir les commandes disponibles."]);
  return <main><PageIntro kicker="Pratique / environnement simulé" title="Laboratoire Claude Code." text="Un espace sûr pour tester les commandes, comprendre les slash commands et répéter vos workflows avant de les appliquer." /><div className="container"><div className="tool-shell"><aside className="tool-pane"><h3>Exercices</h3><button className={`exercise ${exercise === "help" ? "active" : ""}`} onClick={() => setExercise("help")}><strong>01 · Les commandes</strong><span>Découvrir /help</span></button><button className={`exercise ${exercise === "context" ? "active" : ""}`} onClick={() => setExercise("context")}><strong>02 · Le contexte</strong><span>Formuler une demande</span></button><button className={`exercise ${exercise === "workflow" ? "active" : ""}`} onClick={() => setExercise("workflow")}><strong>03 · Le workflow</strong><span>Demander un plan</span></button></aside><section className="lab-terminal"><div className="lab-head"><span className="term-title">terminal · bac à sable</span><button className="icon-btn" style={{ color: "#aaa7b9" }} onClick={reset} aria-label="Réinitialiser"><RotateCcw size={14} /></button></div><div className="lab-body">{lines.map((line, i) => <div key={`${line}-${i}`} className={line.startsWith("›") ? "term-line term-prompt" : line.includes("disponibles") || line.includes("simule") ? "term-line term-green" : "term-line"}>{line}</div>)}</div><div className="lab-input"><span className="term-prompt">›</span><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} placeholder="Saisissez une commande..." aria-label="Commande terminal" /><button onClick={run}><Send size={13} /></button></div></section><aside className="tool-pane"><h3>Objectif</h3><div className="help-copy"><strong>{exercise === "help" ? "Explorer /help" : exercise === "context" ? "Donner du contexte" : "Obtenir un plan"}</strong><p>{exercise === "help" ? "Utilisez /help, /compact et /clear. Observez les réponses simulées et la différence entre chaque commande." : exercise === "context" ? "Essayez : Décris-moi ce projet en trois points. Puis demandez à Claude de proposer une prochaine action." : "Essayez : Lis la structure de ce dépôt et propose un plan en trois étapes."}</p><span className="pill">Exercice guidé</span></div></aside></div></div></main>;
}

function BuilderPage() {
  const [step, setStep] = useState(1); const [type, setType] = useState("claude"); const [project, setProject] = useState("Mon projet"); const [notes, setNotes] = useState("Décrire ici les conventions, commandes utiles et attentes de l’équipe.");
  const output = type === "claude" ? configTemplates.claude.replace("Contexte du projet", project) : configTemplates[type];
  const copy = async () => { try { await navigator.clipboard.writeText(output); } catch { /* clipboard unavailable */ } };
  const download = () => { const blob = new Blob([output], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${type === "claude" ? "CLAUDE.md" : `${type}-config.txt`}`; a.click(); URL.revokeObjectURL(url); };
  return <main><PageIntro kicker="Construire / configuration guidée" title="Générateur de configuration." text="Choisissez un format, décrivez votre contexte et repartez avec un fichier prêt à être adapté dans votre projet." /><div className="container builder"><aside className="stepper">{["Choisir le type", "Configurer", "Prévisualiser", "Générer"].map((label, i) => <button key={label} className={`step ${step === i + 1 ? "active" : ""}`} onClick={() => setStep(i + 1)}><span className="step-num">0{i + 1}</span>{label}</button>)}</aside><section className="builder-card">{step === 1 && <><span className="section-kicker">Étape 01</span><h2>Quel fichier voulez-vous construire ?</h2><p>Chaque format répond à un besoin précis dans l’écosystème Claude Code.</p><div className="type-grid">{configTypes.map((item) => <button key={item.id} className={`type-card ${type === item.id ? "selected" : ""}`} onClick={() => setType(item.id)}><strong>{item.label}</strong><span>{item.description}</span></button>)}</div></>}{step === 2 && <><span className="section-kicker">Étape 02</span><h2>Ajoutez votre contexte.</h2><p>Quelques repères suffisent pour obtenir une première version exploitable.</p><div className="form-stack"><div className="field"><label>Nom du projet</label><input className="field-input" style={{ paddingLeft: 12 }} value={project} onChange={(e) => setProject(e.target.value)} /></div><div className="field"><label>Consignes & conventions</label><textarea className="field-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} /></div></div></>}{step === 3 && <><span className="section-kicker">Étape 03</span><h2>Relisez votre configuration.</h2><p>Une première base claire vaut mieux qu’une configuration parfaite jamais utilisée.</p><div className="code-preview">{output}{type === "claude" && `\n\n## Notes du projet\n${notes}`}</div></>}{step === 4 && <><span className="section-kicker">Étape 04</span><h2>Votre configuration est prête.</h2><p>Copiez-la dans votre projet ou téléchargez-la pour la partager avec votre équipe.</p><div className="code-preview">{output}{type === "claude" && `\n\n## Notes du projet\n${notes}`}</div><div className="builder-actions"><button className="btn btn-ghost" onClick={copy}><Copy size={14} /> Copier</button><button className="btn btn-primary" onClick={download}><FileCode2 size={14} /> Télécharger</button></div></>}{step < 4 && <div className="builder-actions"><button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep((v) => Math.max(1, v - 1))}>Retour</button><button className="btn btn-primary" onClick={() => setStep((v) => Math.min(4, v + 1))}>{step === 3 ? "Générer" : "Continuer"} <ArrowRight size={14} /></button></div>}</section></div></main>;
}

function CheatSheetPage() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("Toutes"); const [copied, setCopied] = useState(""); const categories = ["Toutes", ...Array.from(new Set(commands.map((item) => item.category)))]; const filtered = commands.filter((item) => (category === "Toutes" || item.category === category) && `${item.command} ${item.description}`.toLowerCase().includes(query.toLowerCase())); const copy = async (value: string) => { try { await navigator.clipboard.writeText(value); } catch {} setCopied(value); setTimeout(() => setCopied(""), 1300); };
  return <main><PageIntro kicker="Référence / consultation rapide" title="Cheat Sheet Claude Code." text="Les commandes et concepts utiles, regroupés par usage. Recherchez, copiez, retournez à votre terminal." /><div className="container page-grid"><div><div className="filter-row">{categories.map((item) => <button key={item} className={`filter-btn ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}<div className="search-box"><Search size={14} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une commande..." /></div></div><div className="module-list">{filtered.map((item) => <div key={item.command} className="module-card" style={{ minHeight: 126 }}><span className="module-number"><Command size={15} /></span><span><h3 className="mono" style={{ margin: 0, fontSize: 15 }}>{item.command}</h3><p>{item.description}</p><span className="pill" style={{ marginTop: 10 }}>{item.category} · {item.level}</span></span><button className="btn btn-small" onClick={() => copy(item.command)}>{copied === item.command ? <><Check size={13} /> Copié</> : <><Clipboard size={13} /> Copier</>}</button></div>)}</div></div><aside className="side-card"><SlidersHorizontal size={17} color="var(--violet)" /><h3 style={{ marginTop: 13 }}>Conseil de lecture</h3><p>Commencez par les Slash Commands, puis explorez les fichiers de configuration quand vous avez un premier workflow en tête.</p></aside></div></main>;
}

function IndexPage() {
  const [query, setQuery] = useState(""); const [level, setLevel] = useState("Tous"); const filtered = features.filter((item) => (level === "Tous" || item.level === level) && `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return <main><PageIntro kicker="Référence / 24 fonctionnalités" title="Index des fonctionnalités." text="Une vue d’ensemble filtrable de l’écosystème Claude Code : ce que c’est, quand l’utiliser et dans quel module l’explorer." /><div className="container" style={{ paddingBottom: 90 }}><div className="filter-row"><button className={`filter-btn ${level === "Tous" ? "active" : ""}`} onClick={() => setLevel("Tous")}>Tous les niveaux</button>{["Débutant", "Intermédiaire", "Avancé"].map((item) => <button key={item} className={`filter-btn ${level === item ? "active" : ""}`} onClick={() => setLevel(item)}>{item}</button>)}<div className="search-box"><Search size={14} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une fonctionnalité..." /></div></div><div className="data-table"><div className="data-row head"><span>Nom</span><span>Description</span><span>Niveau</span><span>Catégorie</span><span>Type</span><span>Module</span></div>{filtered.map((item) => <div className="data-row" key={item.name}><strong>{item.name}</strong><p>{item.description}</p><span className="tag">{item.level}</span><span style={{ color: "var(--muted)", fontSize: 10 }}>{item.category}</span><span style={{ color: "var(--muted)", fontSize: 10 }}>{item.type}</span><span style={{ color: "var(--violet)", fontSize: 10, fontWeight: 700 }}>{item.module}</span></div>)}</div></div></main>;
}

function ResourcesPage() { return <main><PageIntro kicker="Centre de ressources" title="Gardez les bons repères à portée de main." text="Des guides, templates et références pour prolonger votre apprentissage et partager des pratiques plus solides." /><div className="container" style={{ paddingBottom: 90 }}><div className="resources-grid">{resources.map((resource) => <Link href="/laboratoire" key={resource.title} className="resource-card"><span className="resource-kind">{resource.kind}</span><h3>{resource.title}</h3><p>{resource.description}</p><span className="resource-meta">{resource.meta} <ArrowRight size={12} style={{ verticalAlign: -2 }} /></span></Link>)}</div><div className="empty-state" style={{ marginTop: 30 }}><Users size={24} color="var(--violet)" /><h3>Une ressource manque ?</h3><p>Le centre évolue avec les retours de la communauté francophone.</p></div></div></main>; }
function FeedbackPage() {
  const [sent, setSent] = useState(false);
  return <main><PageIntro kicker="Projet / feedback tracker" title="Aidez-nous à améliorer le parcours." text="Une remarque sur un module, une commande à ajouter ou une ressource à traduire ? Partagez-la en quelques lignes." /><div className="container" style={{ paddingBottom: 90 }}><div className="builder-card" style={{ maxWidth: 720 }}>{sent ? <div className="empty-state" style={{ border: 0, padding: 30 }}><CheckCircle2 size={28} color="var(--green)" /><h3>Merci pour votre retour.</h3><p>Votre suggestion a été enregistrée pour la prochaine itération du parcours.</p><button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => setSent(false)}>Envoyer un autre retour</button></div> : <><span className="section-kicker">Votre voix compte</span><h2 style={{ marginTop: 9 }}>Que pouvons-nous rendre plus utile ?</h2><p>Cette version conserve les fonctionnalités du produit original et ajoute un espace pour faire évoluer le contenu avec sa communauté.</p><div className="form-stack"><div className="field"><label>Type de retour</label><select className="field-select" style={{ paddingLeft: 12 }} defaultValue="suggestion"><option value="suggestion">Suggestion de contenu</option><option value="bug">Signaler un problème</option><option value="idee">Idée d’outil</option></select></div><div className="field"><label>Votre message</label><textarea className="field-textarea" placeholder="Décrivez le contexte, le module concerné et ce qui vous aiderait..." /></div></div><div className="builder-actions"><span className="pill">Aucune donnée personnelle requise</span><button className="btn btn-primary" onClick={() => setSent(true)}>Envoyer le feedback <Send size={14} /></button></div></>}</div></div></main>;
}

function ChangelogPage() {
  const updates = [
    { version: "01.04", date: "Septembre 2026", title: "Une nouvelle académie francophone", text: "Nouvelle identité, navigation par intention et parcours pédagogique restructuré pour apprendre en pratiquant." },
    { version: "01.03", date: "Août 2026", title: "Le laboratoire devient guidé", text: "Ajout d’exercices ciblés pour explorer /help, le contexte et les workflows directement dans le terminal simulé." },
    { version: "01.02", date: "Juillet 2026", title: "Des configurations prêtes à adapter", text: "Le Config Builder couvre CLAUDE.md, Hooks, Skills, Agents, MCP Servers et Plugins avec prévisualisation." },
  ];
  return <main><PageIntro kicker="Projet / historique" title="Ce qui évolue, sans perdre le fil." text="Un changelog lisible pour suivre les améliorations du parcours, des outils et de l’expérience d’apprentissage." /><div className="container" style={{ maxWidth: 820, paddingBottom: 90 }}><div className="path-list">{updates.map((update) => <div className="path-row" key={update.version}><span className="path-index">{update.version.slice(-2)}</span><span><h3>{update.title}</h3><p>{update.text}</p><span className="pill" style={{ marginTop: 8 }}>{update.date}</span></span><span className="row-meta"><span>Version</span><span>{update.version}</span></span></div>)}</div></div></main>;
}

function NotFoundPage() { return <main><div className="container" style={{ padding: "130px 0", textAlign: "center" }}><span className="section-kicker">404 / page introuvable</span><h1 className="display" style={{ fontSize: 64 }}>On a perdu le fil.</h1><p style={{ color: "var(--muted)" }}>Cette page n’existe pas encore dans le parcours.</p><Link href="/" className="btn btn-primary" style={{ marginTop: 18 }}>Retour à l’accueil <Home size={14} /></Link></div></main>; }

function Footer() { return <footer className="footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Link href="/" className="brand"><span className="brand-mark"><span>›_</span></span><span>Claude Code<small>Académie pratique</small></span></Link><p>Une plateforme francophone pour apprendre Claude Code en pratiquant, pas en collectionnant les onglets.</p></div><div className="footer-col"><h4>Apprendre</h4><Link href="/apprendre">Modules</Link><Link href="/evaluation">Évaluation</Link><Link href="/">Parcours</Link></div><div className="footer-col"><h4>Pratiquer</h4><Link href="/laboratoire">Laboratoire</Link><Link href="/generateur">Config Builder</Link><Link href="/cheat-sheet">Cheat Sheet</Link></div><div className="footer-col"><h4>Projet</h4><Link href="/index">Index</Link><Link href="/ressources">Ressources</Link><Link href="/feedback">Feedback</Link><Link href="/changelog">Changelog</Link></div></div><div className="footer-bottom"><span>© 2026 Claude Code Académie · Projet indépendant</span><span>Fait pour apprendre, tester et transmettre.</span></div></div></footer>; }

export default App;
