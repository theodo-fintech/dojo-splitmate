# 📚 **Bienvenue dans le dossier GenAI Script !**

## Introduction

**GenAI Script** est un outil puissant de scripting qui vous permet d'automatiser des tâches de vos quotidiens en incorporant des réponses de votre LLM préféré.

N'hésitez pas à consulter la [documentation officielle](https://microsoft.github.io/genaiscript/getting-started/) pendant le dojo pour vous en inspirer pour vos scripts !

## Votre premier GenAI Script

Pour vous familiariser avec GenAI Script, commençons par exécuter un script simple "Hello World". Suivez les étapes ci-dessous :

Dans votre terminal exécutez la commande suivante:
```bash
    npx genaiscript run genaisrc/helloWorld.genai.mts
```
Vous devriez voir sous peu un poème à propos du code, fraîchement généré par ChatGPT-4o (le modèle de base utilisé par GenAIScript dans Github Codespaces).

Alternativement, vous pouvez lancer le script en utilisant l'extension genAi script sur VSCode.

## Modèles

Lorsque vous créez des scripts avec GenAIScript, vous choisissez quel modèle de GenAI vous appelez. Par défaut, sur Github Codespaces, les scripts font appel à ChatGPT-4o, mais il y a une limite de 8000 tokens par requête.

Alternativement vous pouvez faire appel à un modèle hyper puissant, Claude 3.5 Sonnet de Anthropic, et sans limite de tokens. Pour cela vous devez rajouter la section suivant à vos fichiers genai:

```javascript
    script({
    model: 'anthropic:claude-3-5-sonnet-latest'
})
```

Avec ce modèle, les tâches deviennent plus faciles, donc si vous voulez du challenge, enlevez l'attribut `model` de vos scripts, pour vous forcer à développer des agents puissants en utilisant la moindre de tokens possible !

## Scripts Avancés

Dans le dossier [`samples`](samples), vous trouverez plusieurs scripts d'exemple amusants que vous pouvez utiliser pour explorer les capacités de GenAI Script.  
**Nous vous recommandons de ne pas passer trop de temps dessus, et plutôt de commencer à créer tes propores scripts pour le dojo !** Revenez voir ces exemples si vous avez besoin d'inspiration.

Parmi les scripts vous trouverez:
- comment incorporer l'input utilisateur dans le prompt au LLM ([poemWithUserInput-v1](samples/poemWithUserInput-v1.genai.mts), [poemWithUserInput-v2](samples/poemWithUserInput-v2.genai.mts))
- comment reprendre le résultat du prompt en tant qu'étape intermédiaire du script ([whoWantsToBeAMillionaire-v1](samples/whoWantsToBeAMillionaire-v1.genai.mts), [whoWantsToBeAMillionaire-v2](samples/whoWantsToBeAMillionaire-v2.genai.mts))
- comment formatter le résultat du LLM pour faciliter le traitement, en utilisant `zod` ([whoWantsToBeAMillionaire-v3](samples/whoWantsToBeAMillionaire-v3.genai.mts))

## Ne regardez pas le dossiers `solutions`!

L'objectif d'un dojo est de s'exercer sur des compétences. Le résultat final est moins important que l'exercice en lui même, donc prenez le temps de résoudre les problèmes, et demandez de l'aide si vous vous sentez bloqués.  
Si néanmoins, vous voulez voir des agents de développement en action, ou comparer vos résulats, vous trouverez dans ce dossier, des scripts d'agents pour ce dojo.

Bonne chance et amusez-vous bien avec GenAI Script !
