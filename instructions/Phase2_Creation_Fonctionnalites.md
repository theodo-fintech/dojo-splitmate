# **🆕 Phase 2 : Création de fonctionnalités avec un agent IA**

💡 *Rendez les dépenses plus lisibles !*

> Les utilisateurs se plaignent que les dépenses sont affichées dans le désordre. Actuellement, elles apparaissent en vrac, ce qui rend la lecture difficile.
> 
> Vous devez ajouter un **système de regroupement des dépenses** et un **tri dynamique**, ainsi qu'une fonctionnalité pour **ajouter une dépense**.. Maintenant que vous avez pris goût à l’utilisation des agents, pourquoi ne pas créer un **agent IA capable de générer le code** pour vous ?

_Fonctionnalité 1_:
- ETQUtilisateur, sur la page 'Dépenses', je vois toutes les dépenses regroupées par date, de la plus récente à la plus ancienne
- Les dépenses ayant eu lieu a la même date forment un groupe, ayant pour intitulé la date de dépense.
- Au sein d'un même groupe, les dépenses sont triées par prix décroissant.

_Fonctionnalité 2_:
- ETQUtilisateur, sur la page 'Dépenses', lorsque je click sur 'Ajouter une dépense', je vois un formulaire de soumission de dépense apparaître
- Le formulaire contient les champs suivants: 
  - nom de la dépense (texte, obligatoire)
  - montant (nombre, obligatoire)
  - participants (menu déroulant, choix multiples, obligatoire): les choix possibles est la liste de tous les utilisateurs de l'application.
  - participant qui a payé la dépense (menu déroulant, choix unique, obligatoire): la liste de choix possible est la liste des utilisateurs choisi dans le champ 'participants'
  - date (date, optionnel): pré-rempli avec la date du jour
- Le formulaire contient deux boutons:
    - un bouton 'Annuler', qui ferme la modale
    - un bouton 'Ajouter', qui enregistre la dépense

✅ **Objectifs :**

- Développer un agent qui **vous assiste sur les choix techniques à faire** pour ajouter ces fonctionnalités.
    - Il va vous demander la fonctionnalité attendue.
    - Il vous propose différents choix d'implémentations
    - Il vous propose du code en fonction de votre choix

Vous pouvez écrire vos scripts dans le dossier [genaisrc/my-scripts](/genaisrc/my-scripts/). Et n'oubliez pas, le nom de vos fichiers de scripts doit finir par `.genai.mts`.
