# **🛠️ Phase 1 : Débuggage avec un agent IA**

💡 *Pourquoi ça ne marche pas ?!*

> À peine arrivé chez SplitMate, vous réalisez que l’application ne fonctionne pas correctement. Certains données ne chargent pas, des boutons ne marchent pas, il y a des erreurs évidentes.
> 
> Pour éviter de perdre trop de temps, vous décidez d'utiliser un **agent IA de debugging** capable de repérer les erreurs dans le code et de vous donner des pistes pour les corriger.

✅ **Objectifs :**

- Parcourir l’app et identifier les 3 bugs bloquants.
- Utilisez [l'agent de debugging](/genaisrc/examples/bugfixer-v1.genai.mts) existant, capable de **détecter et expliquer** les erreurs. 

Cet agent :  
- vous demande le comportement actuel sur l'application
- vous demander le comportement attendu
- vous indique où se trouve le souci et comment le régler.

Soignez vos inputs ! Si vous êtes trop vagues l'agent ne pourra pas vous aider comme vous le souhaitez.

_Pour aller plus loin_ : regardez le deuxième script de debugging ([bugfixer-v2](/genaisrc/examples/bugfixer-v2.genai.mts)) et apprenez comment les [system prompts](https://microsoft.github.io/genaiscript/reference/scripts/system/) peuvent supercharger vos agents.
