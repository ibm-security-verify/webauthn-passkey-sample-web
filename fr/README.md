# Exemple d'application IBM Security Verify pour Passkey sur le Web

Exemple de mise en œuvre de Passkeys à l'aide de la fonctionnalité native du navigateur et du serveur IBM Security Verify WebAuthn Relying Party Server.

## Mise en route

Les liens de ressources dans les conditions préalables expliquent et démontrent comment créer une nouvelle application locataire et configurer les paramètres de sécurité pour permettre l'utilisation de FIDO dans l'application d'exemple.

### Prérequis

- Suivez les instructions pour créer un [serveur de confiance](https://github.com/ibm-security-verify/webauthn-relying-party-server-swift/blob/main/README.md)

- Cloner le dépôt. Exécutez cette commande dans une fenêtre Terminal :

   ```
   git clone https://github.com/ibm-security-verify/webauthn-relying-party-server.git
   ```
### Configuration du projet

Après avoir rempli les conditions préalables,


### Exécution de l'application web dans IBM Code Engine

1. Créez un projet de moteur de code et déployez-y votre RPS à l'intérieur d'une application

2. Dans le même projet, créez une autre application pour cette application web.

3. Fournir l'image comme quay.io/langley_millard_ibm/webauthn-site

4. Configurer l'application pour qu'elle écoute sur le port 3000

5. Assurez-vous que le nombre minimum d'instances est fixé à 1, et que votre configuration dispose d'au moins 1vCPU et 4GB mémoire vive.
6. Définir les variables d'environnement, voir ci-dessous :

## Variables d'environnement
`RP_FQDN`

Le nom de domaine pleinement qualifié (FQDN) de la partie utilisatrice, qui peut être obtenu auprès de l'environnement d'hébergement du conteneur. Par exemple :

```
RPS_FQDN=application-8t.12890dj1.au-syd.codeengine.ibm.com
```

`SERVER_PORT`

Le port sur lequel l'application web écoutera. Par exemple :

```
SERVER_PORT=5000 (default)
```

`DANGEROUSLY_DISABLE_HOST_CHECK`

Pour s'assurer que l'hôte du conteneur peut autoriser les requêtes cross-origin entre le serveur de la partie qui répond et l'application web. Par exemple :

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

## Ressources
[Prise en charge de l'authentification des clés de sécurité à l'aide de clés physiques](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_security_key_authentication_using_physical_keys)

[Authentification par clé publique-privée](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication)

[Authentification Web du W3C](https://www.w3.org/TR/webauthn-2/)

<!-- v2.3.7 : caits-prod-app-gp_webui_20241231T140702-25_en_fr -->