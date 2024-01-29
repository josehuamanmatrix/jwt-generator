# JWT generator

1. Instalar dependencias con el comando `yarn install`

2. Crear un archivo `config/config.json` dentro de la carpeta raiz con el siguiente contenido. Modificar los valores segun se necesiten.
    ```json
    {
        "tokenTTL": 300,
        "signaturePrivateKey": "",
        "rsaPublicKey": "",
        "rsaPrivateKey": ""
    }
    ```