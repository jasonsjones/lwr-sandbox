# LWC-TS Boilerplate Example

The **LWC TS Boilerplate** contains the minimum code needed to get simple SinglePageApplication on
LWR running.

## Project Setup

The directory structure looks like this:

```
scripts/
  └── start-server.mjs  // create and start server
src/
  ├── assets/           // static assets
  │   └── logo.png
  └── modules/          // lwc modules
      └── example/
          └── app/
              ├── app.css
              ├── app.html
              └── app.js
lwr.config.json         // lwr configuration
package.json            // npm packaging configuration
```

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project. The **LWC TS
Boilerplate** has one LWC module and one route.

```json
// lwr.config.json
{
    "lwc": { "modules": [{ "dir": "$rootDir/src/modules" }] },
    "routes": [
        {
            "id": "example",
            "path": "/",
            "rootComponent": "example/app"
        }
    ]
}
```

Learn more in
[Configure a LWR Project](https://github.com/salesforce/lwr-recipes/blob/master/doc/config.md).

## Setup

```bash
yarn install
yarn build
yarn start # dev mode and ESM format
```

Open the site at [http://localhost:3000](http://localhost:3000)
