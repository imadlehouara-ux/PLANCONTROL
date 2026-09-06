export type Module = {
  id: string;
  number: string;
  title: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  description: string;
  tag: string;
  progress: number;
  accent: string;
};

export const modules: Module[] = [
  { id: "demarrage", number: "01", title: "Premiers pas", level: "Débutant", duration: "20 min", description: "Découvrir Claude Code, son rôle dans votre terminal et le bon état d’esprit pour commencer.", tag: "Fondations", progress: 72, accent: "violet" },
  { id: "slash", number: "02", title: "Slash Commands", level: "Débutant", duration: "30 min", description: "Maîtriser /help, /compact, /clear et les commandes qui accélèrent chaque session.", tag: "Commandes", progress: 0, accent: "cyan" },
  { id: "memoire", number: "03", title: "Mémoire & CLAUDE.md", level: "Débutant", duration: "45 min", description: "Donner à Claude le contexte durable de votre projet et structurer ses repères.", tag: "Contexte", progress: 0, accent: "orange" },
  { id: "projet", number: "04", title: "Installer un projet", level: "Débutant", duration: "45 min", description: "Préparer un dépôt, cadrer une première tâche et obtenir un résultat vérifiable.", tag: "Workflow", progress: 0, accent: "violet" },
  { id: "commandes", number: "05", title: "Commandes en profondeur", level: "Débutant", duration: "30 min", description: "Explorer les commandes avancées et les habitudes qui rendent vos prompts précis.", tag: "Productivité", progress: 0, accent: "cyan" },
  { id: "skills", number: "06", title: "Skills", level: "Intermédiaire", duration: "1 h", description: "Créer des compétences réutilisables pour transmettre une méthode à votre équipe.", tag: "Extensibilité", progress: 0, accent: "orange" },
  { id: "hooks", number: "07", title: "Hooks", level: "Intermédiaire", duration: "1 h", description: "Automatiser des contrôles autour de Claude Code grâce aux hooks de projet.", tag: "Automatisation", progress: 0, accent: "violet" },
  { id: "mcp", number: "08", title: "MCP Servers", level: "Intermédiaire", duration: "1 h", description: "Connecter Claude à vos outils, données et services sans perdre le contrôle.", tag: "Intégrations", progress: 0, accent: "cyan" },
  { id: "agents", number: "09", title: "Subagents", level: "Intermédiaire", duration: "1 h", description: "Déléguer des responsabilités ciblées avec des agents spécialisés et lisibles.", tag: "Orchestration", progress: 0, accent: "orange" },
  { id: "avance", number: "10", title: "Fonctionnalités avancées", level: "Avancé", duration: "1 h 30", description: "Approfondir les capacités de Claude Code pour des usages plus ambitieux.", tag: "Approfondissement", progress: 0, accent: "violet" },
  { id: "workflow", number: "11", title: "Workflows", level: "Avancé", duration: "1 h", description: "Passer de la demande ponctuelle au workflow reproductible, avec des étapes claires.", tag: "Méthode", progress: 0, accent: "cyan" },
  { id: "plugins", number: "12", title: "Plugins", level: "Avancé", duration: "1 h 30", description: "Regrouper une configuration complète et la partager sous forme de plugin.", tag: "Packaging", progress: 0, accent: "orange" },
];

export const commands = [
  { command: "/help", category: "Slash Commands", description: "Afficher l’aide et les commandes disponibles.", level: "Débutant", module: "Slash Commands" },
  { command: "/compact", category: "Slash Commands", description: "Résumer la conversation pour libérer du contexte.", level: "Débutant", module: "Slash Commands" },
  { command: "/clear", category: "Slash Commands", description: "Réinitialiser la session courante.", level: "Débutant", module: "Slash Commands" },
  { command: "CLAUDE.md", category: "Fichiers", description: "Le fichier de mémoire et de consignes d’un projet.", level: "Débutant", module: "Mémoire & CLAUDE.md" },
  { command: "hooks", category: "Hooks", description: "Déclencher des contrôles avant ou après une action.", level: "Avancé", module: "Hooks" },
  { command: "skills", category: "Skills", description: "Encapsuler une méthode dans une capacité réutilisable.", level: "Avancé", module: "Skills" },
  { command: "agents", category: "Agents", description: "Définir un rôle spécialisé pour une tâche précise.", level: "Avancé", module: "Agents" },
  { command: "MCP server", category: "MCP", description: "Relier Claude à une source ou un outil externe.", level: "Avancé", module: "MCP Servers" },
];

export const features = [
  { name: "Slash Commands", description: "Des raccourcis pour guider la session et gérer le contexte.", level: "Débutant", category: "Commandes", type: "Natif", module: "Slash Commands" },
  { name: "CLAUDE.md", description: "La mémoire projet qui garde vos conventions à portée de main.", level: "Débutant", category: "Contexte", type: "Fichier", module: "Mémoire & CLAUDE.md" },
  { name: "Hooks", description: "Des contrôles automatiques déclenchés par les événements.", level: "Avancé", category: "Automatisation", type: "Configuration", module: "Hooks" },
  { name: "Skills", description: "Des capacités spécialisées partageables avec toute l’équipe.", level: "Avancé", category: "Extensibilité", type: "Configuration", module: "Skills" },
  { name: "Agents", description: "Des rôles ciblés pour décomposer et paralléliser le travail.", level: "Avancé", category: "Orchestration", type: "Configuration", module: "Agents" },
  { name: "MCP", description: "Un protocole pour connecter Claude à des outils externes.", level: "Avancé", category: "Intégrations", type: "Protocole", module: "MCP Servers" },
];

export const resources = [
  { kind: "Guides", title: "Le guide du premier dépôt", description: "Une méthode en 15 minutes pour passer de l’idée à un premier résultat vérifiable.", meta: "Lecture · 8 min", icon: "book" },
  { kind: "Templates", title: "Starter CLAUDE.md", description: "Un point de départ propre pour formaliser le contexte et les conventions d’une équipe.", meta: "Fichier · Markdown", icon: "file" },
  { kind: "Références", title: "Carte des commandes", description: "La shortlist à garder ouverte quand vous travaillez dans le terminal.", meta: "Référence · 1 page", icon: "grid" },
  { kind: "Communauté", title: "Partager un workflow", description: "Un espace pour documenter les patterns qui font gagner du temps aux autres.", meta: "Contribution · Ouvert", icon: "users" },
];

export const quizQuestions = [
  { question: "Quel fichier fournit à Claude le contexte durable d’un projet ?", options: ["README.txt", "CLAUDE.md", "PROJECT.json", ".claudeignore"], answer: 1, explanation: "CLAUDE.md centralise les consignes, conventions et repères à conserver d’une session à l’autre." },
  { question: "Quelle commande résume la conversation pour libérer du contexte ?", options: ["/clear", "/help", "/compact", "/reset"], answer: 2, explanation: "/compact condense l’historique. /clear, lui, réinitialise la session." },
  { question: "À quoi servent les hooks ?", options: ["À changer le thème", "À déclencher des contrôles automatiquement", "À installer Git", "À créer une base de données"], answer: 1, explanation: "Les hooks exécutent une action avant ou après un événement défini dans le workflow." },
  { question: "Que permet un MCP Server ?", options: ["D’ajouter une police", "De connecter Claude à un outil externe", "De compiler TypeScript", "De créer un alias shell"], answer: 1, explanation: "MCP fournit une interface standard pour exposer des outils et des sources à Claude." },
];

export const configTypes = [
  { id: "claude", label: "CLAUDE.md", description: "Mémoire et consignes projet", color: "violet" },
  { id: "hook", label: "Hook", description: "Contrôle automatisé", color: "orange" },
  { id: "skill", label: "Skill", description: "Capacité réutilisable", color: "cyan" },
  { id: "agent", label: "Agent", description: "Rôle spécialisé", color: "violet" },
  { id: "mcp", label: "MCP Server", description: "Connexion à un outil", color: "cyan" },
  { id: "plugin", label: "Plugin", description: "Pack de configuration", color: "orange" },
];

export const configTemplates: Record<string, string> = {
  claude: `# Contexte du projet\n\n## Rôle\nTu es un assistant de développement senior.\n\n## Commandes utiles\n- pnpm dev — lancer l’application\n- pnpm check — vérifier les types\n\n## Règles\n- Lire les fichiers concernés avant toute modification.\n- Proposer un plan court avant d’implémenter.`,
  hook: `{\n  "hooks": {\n    "afterFileWrite": {\n      "command": "pnpm lint --fix",\n      "description": "Formater les fichiers modifiés"\n    }\n  }\n}`,
  skill: `---\nname: revue-accessibilite\ndescription: Vérifier les parcours critiques et les états de focus.\n---\n\n# Revue accessibilité\n\n1. Vérifier le contraste.\n2. Tester le clavier.\n3. Vérifier les labels et messages d’erreur.`,
  agent: `---\nname: analyste\ndescription: Analyse un besoin et propose une stratégie de mise en œuvre.\n---\n\nTu travailles avec des hypothèses explicites et des critères d’acceptation vérifiables.`,
  mcp: `{\n  "mcpServers": {\n    "outils-equipe": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]\n    }\n  }\n}`,
  plugin: `plugin:\n  name: kit-equipe\n  version: 1.0.0\n  includes:\n    - CLAUDE.md\n    - skills/revue-accessibilite\n    - agents/analyste`,
};

export const terminalResponses: Record<string, string[]> = {
  "/help": ["Commandes disponibles :", "  /help        Afficher cette aide", "  /compact     Résumer le contexte", "  /clear       Réinitialiser la session", "  /me          Voir votre progression"],
  "/compact": ["Contexte compacté.", "  12 messages → 3 repères conservés", "  Prêt à continuer."],
  "/clear": ["Session réinitialisée.", "  Nouveau contexte disponible."],
  "/me": ["Votre espace d’apprentissage", "  Niveau actuel : Débutant", "  Progression : 18 %", "  Prochaine étape : Slash Commands"],
};

export const navItems = [
  { label: "Accueil", href: "/", icon: "home" },
  { label: "Apprendre", href: "/apprendre", icon: "book" },
  { label: "Évaluer mon niveau", href: "/evaluation", icon: "target" },
  { label: "Laboratoire", href: "/laboratoire", icon: "terminal" },
  { label: "Générateur", href: "/generateur", icon: "sparkles" },
  { label: "Cheat Sheet", href: "/cheat-sheet", icon: "command" },
  { label: "Index", href: "/index", icon: "grid" },
  { label: "Ressources", href: "/ressources", icon: "layers" },
];

export function getStoredProgress() {
  try {
    return JSON.parse(localStorage.getItem("claude-code-progress") || "{}") as { completed?: string[]; active?: string; quizScore?: number; minutes?: number };
  } catch {
    return {};
  }
}

export function saveProgress(next: { completed?: string[]; active?: string; quizScore?: number; minutes?: number }) {
  const current = getStoredProgress();
  localStorage.setItem("claude-code-progress", JSON.stringify({ ...current, ...next }));
}
