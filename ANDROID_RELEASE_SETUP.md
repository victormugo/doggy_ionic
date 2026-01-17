# Configuración de GitHub Actions para Android Release

Este proyecto incluye un workflow de GitHub Actions que genera automáticamente un archivo AAB (Android App Bundle) cuando se acepta un Pull Request en la rama `develop`.

## Configuración de Secretos en GitHub

Para que el workflow funcione correctamente, necesitas configurar los siguientes secretos en tu repositorio de GitHub:

### Pasos para configurar los secretos:

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret** y agrega los siguientes secretos:

#### Secretos requeridos:

- **KEYSTORE_BASE64**: Tu archivo keystore codificado en base64
  ```bash
  base64 -i tu-keystore.jks | pbcopy
  ```
  O en Windows:
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("tu-keystore.jks")) | Set-Clipboard
  ```

- **KEYSTORE_PASSWORD**: La contraseña de tu keystore

- **KEY_ALIAS**: El alias de tu clave de firma

- **KEY_PASSWORD**: La contraseña de tu clave de firma

## Generar un Keystore (si no tienes uno)

Si aún no tienes un keystore, puedes generar uno con el siguiente comando:

```bash
keytool -genkey -v -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANTE**: Guarda el keystore y las contraseñas en un lugar seguro. Si los pierdes, no podrás actualizar tu aplicación en Google Play Store.

## Funcionamiento del Workflow

El workflow se ejecuta automáticamente cuando:
- Se hace merge de un Pull Request en la rama `develop`

El workflow realiza las siguientes acciones:
1. Instala las dependencias del proyecto
2. Construye la aplicación Ionic
3. Sincroniza con Capacitor
4. Genera el archivo AAB firmado
5. Sube el AAB como artefacto (disponible por 30 días)
6. Crea un release en GitHub con el AAB adjunto

## Descargar el AAB generado

Después de que el workflow se complete exitosamente, puedes descargar el AAB de dos formas:

1. **Desde los Artifacts**: Ve a la pestaña **Actions** → selecciona el workflow → descarga el artifact
2. **Desde Releases**: Ve a la pestaña **Releases** → descarga el AAB del release más reciente

## Subir a Google Play Console

Una vez descargado el AAB, puedes subirlo a Google Play Console:

1. Ve a [Google Play Console](https://play.google.com/console)
2. Selecciona tu aplicación
3. Ve a **Prueba cerrada** (Closed testing)
4. Sube el archivo AAB
5. Completa la información de la versión y publica
