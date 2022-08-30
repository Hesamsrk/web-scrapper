import puppeteer from "puppeteer"
import * as fs from "fs";
import path from "path"
import mkdirp from "mkdirp";
import rimraf from "rimraf";
import {config} from "./config";




const main = async () => {
    const output = path.join(__dirname, `../output/${config.projectName}`)
    rimraf.sync(output);
    const browser = await puppeteer.launch(); // default is true
    const page = await browser.newPage()
    page.on('response', async (response) => {
        const url = new URL(response.url())
        console.log(response.url())
        const dir = path.join(__dirname, `../output/${config.projectName}`, url.pathname);
        const ext = path.extname(dir)
        if (!ext || ext.length > 5) {
            return
        }

        const parent = path.parse(dir).dir
        const filename = path.basename(dir)

        try {
            console.log(`Downloading ${filename} ...`)
            const buffer = await response.buffer()
            await writeFile(parent, filename, buffer)
        } catch (e) {
            console.error(e)
        }

    });
    await page.goto(config.url, {waitUntil: "networkidle2"})
    const content = await page.content()
    fs.writeFileSync(path.join(output, "index.html"), content)
    setTimeout(() => {
        process.exit(0)
    }, config.timeout)
}

const writeFile = async (dir: string, filename: string, data: Buffer) => {
    await mkdirp(dir)
    fs.writeFileSync(path.join(dir, filename), data);
    console.log("saved =>", {dir, filename})
}

main()
