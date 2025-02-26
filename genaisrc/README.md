# 📚 **Bienvenue dans le dossier GenAIScript !**

## Introduction

**GenAIScript** est un outil puissant de scripting qui vous permet d'automatiser des tâches de vos quotidiens en incorporant des réponses de votre LLM préféré.

N'hésitez pas à consulter la [documentation officielle](https://microsoft.github.io/genaiscript/getting-started/) pendant le dojo pour vous en inspirer pour vos scripts !

## Votre premier GenAIScript

Pour vous familiariser avec GenAIScript, commençons par exécuter un script simple "Hello World". Suivez les étapes ci-dessous :

Dans votre terminal exécutez la commande suivante:
```bash
    npx genaiscript run genaisrc/examples/helloWorld.genai.mts
```
Vous devriez voir sous peu un poème à propos du code, fraîchement généré par ChatGPT-4o.

Alternativement, vous pouvez lancer le script en utilisant l'extension GenAiScript sur VSCode.

## Modèles

Lorsque vous créez des scripts avec GenAIScript, vous choisissez quel modèle de GenAI vous appelez. Par défaut, sur Github Codespaces, les scripts font appel à ChatGPT-4o, mais il y a une limite de 8000 tokens par requête.

Alternativement vous pouvez faire appel à un modèle hyper puissant, Claude 3.5 Sonnet de Anthropic, et sans limite de tokens. Pour cela vous devez rajouter la section suivant à vos fichiers genai:

```javascript
    script({
    model: 'anthropic:claude-3-5-sonnet-latest'
})
```

Avec ce modèle, les tâches deviennent plus faciles, donc si vous voulez du challenge, enlevez l'attribut `model` de vos scripts, pour vous forcer à développer des agents puissants en utilisant la moindre de tokens possible !

Vous pouvez désormais vous attaquer à votre [première tâche](/instructions/Phase1_Debugging.md).  

Bonne chance et amusez-vous bien avec GenAIScript !
