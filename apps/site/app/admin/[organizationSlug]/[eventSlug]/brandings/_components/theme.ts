interface ThemeVariable {
  name: string;
  displayName: string;
  value: string;
  description: string;
  type?: "color" | "size";
}

export const defaultTheme: ThemeVariable[] = [
  {
    name: "--foreground",
    displayName: "Premier plan ",
    value: "#20404e",
    description: "Couleur utilisée pour les élements en premiers plan comme le texte et le icones",
    type: "color",
  },
  {
    name: "--background",
    displayName: "Arrière-plan",
    value: "#ffffff",
    description: "Couleur par défaut de l'arrière-plan",
    type: "color",
  },
  {
    name: "--muted",
    displayName: "Arrière-plan grisé",
    value: "#f1f5f9",
    description: "Couleur utilisée pour les arrière-plans grisé",
    type: "color",
  },
  {
    name: "--muted-foreground",
    displayName: "Texte sur arrière-plan grisé",
    value: "#64748b",
    description: "Couleur utilisée pour le texte sur les arrière-plans grisé (placeholders, disabled etc...)",
    type: "color",
  },
  {
    name: "--border",
    displayName: "Bordures",
    value: "#e2e8f0",
    description: "Couleur utilisée pour les bordures",
    type: "color",
  },
  {
    name: "--input",
    displayName: "Arrière-plan des inputs",
    value: "#e2e8f0",
    description: "Couleur utilisée pour les arrière-plans des inputs",
    type: "color",
  },
  {
    name: "--primary",
    displayName: "Couleur primaire",
    value: "#20404e",
    description: "Couleur utilisée pour les boutons et les liens",
    type: "color",
  },
  {
    name: "--primary-foreground",
    displayName: "Texte sur couleur primaire",
    value: "#f8fafc",
    description: "Couleur utilisée pour le texte sur les boutons et les liens",
    type: "color",
  },
  {
    name: "--secondary",
    displayName: "Couleur secondaire",
    value: "#f1f5f9",
    description: "Couleur utilisée pour les boutons et les liens secondaires",
    type: "color",
  },
  {
    name: "--secondary-foreground",
    displayName: "Texte sur couleur secondaire",
    value: "#1e3742",
    description: "Couleur utilisée pour le texte sur les boutons et les liens secondaires",
    type: "color",
  },
  {
    name: "--accent",
    displayName: "Couleur d'accentuation",
    value: "#faf8f4",
    description: "Couleur utilisée pour les boutons et les liens d'accentuation",
    type: "color",
  },
  {
    name: "--accent-foreground",
    displayName: "Texte sur couleur d'accentuation",
    value: "#e49c01",

    description: "Couleur utilisée pour le texte sur les boutons et les liens d'accentuation",
    type: "color",
  },
  {
    name: "--destructive",
    displayName: "Couleur de destruction",
    value: "#ff0000",
    description: "Couleur utilisée pour les boutons et les liens de destruction",
    type: "color",
  },
  {
    name: "--destructive-foreground",
    displayName: "Texte sur couleur de destruction",
    value: "#f8fafc",
    description: "Couleur utilisée pour le texte sur les boutons et les liens de destruction",
    type: "color",
  },
  {
    name: "--ring",
    displayName: "Couleur de l'anneau",
    value: "#94a3b8",
    description: "Couleur utilisée pour les anneaux de focus",
    type: "color",
  },
  {
    name: "--radius",
    displayName: "Rayon des coins",
    value: "0.5rem",
    description: "Rayon des coins des éléments",
    type: "size",
  },
];
