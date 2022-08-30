# How it works?

- First, you need [Nodejs](https://nodejs.org) and `Makefile` for running this project.

- Install packages:
```shell
npm install
# or
yarn
```
## Scrapping
- Change the config.ts file:
```ts
export const config:Config = {
    url:"https://hesamsrk.github.io/starwars-react-demo/",//your target website
    timeout: 20000,// timeout for downloading sources
    projectName:"react-demo" // name of the folder in output directory
}
```
- Then run this command and wait for it to finnish:
```shell
make scrap
```
## Serving the downloaded website

- Run this command:
````shell
make serve PORT=3005 PROJECT=demo
# change the name of the project ot port if you wish
````