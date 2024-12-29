{
  "banner": {
    "title": "🚀 Conseils pour gérer les mises à jour d'un projet généré 🚀",
    "subtitle": "Suivez ces étapes pour une gestion efficace",
    "points": [
      "✅ Créez une sauvegarde avant d'écraser le projet.",
      "✅ Travaillez sur des branches séparées pour la stabilité.",
      "✅ Personnalisez vos fichiers dans des dossiers spécifiques.",
      "✅ Utilisez `.gitignore` pour éviter de versionner des fichiers inutiles.",
      "✅ Automatisez les tâches répétitives avec des hooks Git."
    ]
  },
  "steps": [
    {
      "title": "1. Créer une branche de sauvegarde",
      "command": [
        "git checkout -b sauvegarde-avant-ecrasement",
        "git push origin sauvegarde-avant-ecrasement"
      ],
      "description": "Avant d'écraser votre projet, sauvegardez vos modifications dans une branche distincte."
    },
    {
      "title": "2. Écraser le contenu avec la nouvelle version",
      "description": "Téléchargez ou générez la nouvelle version du projet et remplacez les fichiers sauf `.git/` et les fichiers spécifiques comme `.env`."
    },
    {
      "title": "3. Valider les changements",
      "commands": [
        "git add -A",
        "git commit -m \"Mise à jour complète avec la nouvelle version générée\"",
        "git push origin main"
      ],
      "description": "Ajoutez, validez, et poussez les nouveaux fichiers vers GitHub."
    },
    {
      "title": "4. Organiser vos personnalisations",
      "description": "Placez vos personnalisations dans des fichiers ou dossiers spécifiques pour simplifier les mises à jour futures.",
      "examples": [
        "src/custom/",
        ".env"
      ]
    },
    {
      "title": "5. Automatiser avec des hooks Git",
      "commands": [
        "npm install",
        "npm run build"
      ],
      "description": "Configurez un hook Git pour exécuter automatiquement des commandes après chaque mise à jour."
    },
    {
      "title": "6. Alternative : Branches dédiées",
      "commands": [
        "git checkout generated",
        "git pull origin generated",
        "git checkout main",
        "git merge generated"
      ],
      "description": "Utilisez une branche `generated` pour les mises à jour générées automatiquement et fusionnez-les dans `main`."
    }
  ]
}
