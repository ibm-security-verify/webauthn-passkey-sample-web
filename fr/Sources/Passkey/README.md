# webauthn_web_test

## Présentation du projet

Il s'agit d'une page web très simple et d'un serveur construit pour tester le Relying Party Server construit par @craigaps.

La condition préalable est que le RPS soit déployé et accessible via HTTPS- [un guide est disponible ici](https://github.com/ibm-security-verify/webauthn-relying-party-server-swift)

Lorsque vous déployez cette page web, assurez-vous de respecter les spécifications FIDO2, en veillant à ce que votre RPS et votre application web soient tous deux déployés sur le même domaine (c'est-à-dire rps.au-syd.cloud.com et webapp.au-syd.cloud.com ), servis par HTTPS et tous deux ajoutés en tant qu'origines acceptables dans la configuration FIDO2 de votre fournisseur IBM Security Verify dispose d'une interface utilisateur très conviviale pour effectuer ces changements, si nécessaire)

### Page Web

* La page web est écrite en Javascript avec React Carbon. Consultez le readme sur `carbon2/carbon-tutorial` pour plus d'instructions.


### Serveur

* Le serveur est un serveur express.js qui facilite les appels axios vers et depuis le RPS.
* Ce serveur est optionnel car des appels peuvent être faits directement au RPS depuis la page react - si vous souhaitez le faire, changez simplement les points de terminaison de l'API dans le répertoire carbon2/carbon-tutorial/src/landing-page.


### En cours d'exécution

Pour exécuter ce projet
* `cd carbon2/carbon-tutorial`
* exécuter `yarn install` pour installer les paquets
* exécutez `SERVER_PORT=5000 RPID=secure.localhost  yarn start` en vous assurant que vos variables d'environnement sont correctes.
   * le server_port doit être le port sur lequel vous exécutez le composant serveur web (défini dans server.js- par défaut 5000)
   * le rpid doit être le nom d'hôte de la partie se fiant à l'information (par défaut secure.localhost )
* le script de démarrage devrait démarrer automatiquement le serveur. Pour modifier ce comportement, passez en revue la commande correspondante dans le package.json

## Exécution de ce projet dans IBM Code Engine

1. Créez un projet de moteur de code et déployez-y votre RPS à l'intérieur d'une application
2. Dans le même projet, créez une autre application pour cette application web.
3. Fournir l'image comme quay.io/langley_millard_ibm/webauthn-site
4. Configurer l'application pour qu'elle écoute sur le port 3000
5. Assurez-vous que le nombre minimum d'instances est fixé à 1, et que votre configuration dispose d'au moins 1vCPU et 4GB mémoire vive.
6. Fournissez les variables d'environnement suivantes ;

   a. RP_FQDN='REPLACE ME' - "le FQDN du RPS (c'est-à-dire application-8t.12890dj1.au-sydcodeengine.ibm.com )"

   b. SERVER_PORT=5000 (si modifié, le port du serveur web de l'application. Si ce n'est pas le cas, le port 5000 est le port par défaut)

   c. DANGEROUSLY_DISABLE_HOST_CHECK=true pour s'assurer que Code Engine autorise l'origine croisée entre le proxy et le site.

6. Cliquez sur déployer la révision.

---

## Tutoriel sur le carbone

Ce tutoriel vous guidera dans la création d'une application React avec le [Carbon Design System.](https://www.carbondesignsystem.com/) Nous vous apprendrons les tenants et les aboutissants de l'utilisation des composants Carbon, tout en vous présentant les meilleures pratiques de développement web.

Pour commencer, consultez les [instructions du tutoriel](https://carbondesignsystem.com/developing/react-tutorial/overview/).

## Scripts disponibles

Ce projet a été démarré avec [Create React App.](https://github.com/facebook/create-react-app)

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Exécute l'application en mode développement. <br>
Ouvrez [http://localhost:3000](http://localhost:3000) pour l'afficher dans le navigateur.

La page sera rechargée si vous effectuez des modifications. <br>
Vous verrez également les éventuelles erreurs de lint dans la console.

### `npm test`

Lance le test runner en mode interactif. <br>
Pour plus d'informations, voir la section relative à l'[exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Construit l'application pour la production dans le dossier `build`. <br>
Il intègre correctement React en mode production et optimise la construction pour obtenir les meilleures performances.

La compilation est minifiée et les noms de fichiers incluent les hachages. <br>
Votre application est prête à être déployée !

Voir la section sur le [déploiement](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

### `npm run eject`

**Remarque : il s'agit d'une opération à sens unique. Une fois que vous avez `eject`, vous ne pouvez plus revenir en arrière ! **

Si vous n'êtes pas satisfait de l'outil de construction et des choix de configuration, vous pouvez à tout moment consulter le site `eject`. Cette commande supprimera la dépendance de construction unique de votre projet.

Au lieu de cela, il copiera tous les fichiers de configuration et les dépendances transitives (Webpack, Babel, ESLint, etc) directement dans votre projet afin que vous ayez un contrôle total sur eux. Toutes les commandes, à l'exception de `eject`, continueront à fonctionner, mais elles pointeront vers les scripts copiés afin que vous puissiez les modifier. À ce stade, vous êtes seul.

Vous n'avez pas besoin d'utiliser `eject`. L'ensemble des fonctionnalités est adapté aux petits et moyens déploiements, et vous ne devez pas vous sentir obligé d'utiliser ces fonctionnalités. Cependant, nous comprenons que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser lorsque vous êtes prêt à le faire.

## En savoir plus

Pour en savoir plus, consultez la [documentation Create React App.](https://facebook.github.io/create-react-app/docs/getting-started)

Pour apprendre React, consultez la [documentation de React](https://reactjs.org/).

### Fractionnement du code

Cette section a été déplacée ici https://facebook.github.io/create-react-app/docs/code-splitting

### Analyse de la taille de l'offre groupée

Cette section a été déplacée ici https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Créer une application Web progressive

Cette section a été déplacée ici https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Configuration avancée

Cette section a été déplacée ici https://facebook.github.io/create-react-app/docs/advanced-configuration

### Déploiement

Cette section a été déplacée ici https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` ne parvient pas à minifier

Cette section a été déplacée ici https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

<!-- v2.3.7 : caits-prod-app-gp_webui_20241231T140651-23_en_fr -->