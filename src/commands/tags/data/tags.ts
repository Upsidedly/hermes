import { Collection } from "discord.js";
import fs from 'fs/promises';

const tags = new Collection<string, string>()

for (const tag of await fs.readdir('./text/tags/')) {
    const lines = (await fs.readFile(`./text/tags/${tag}`, 'utf8')).split('\n')
    const name = lines.shift()?.trim()

    tags.set(name!, lines.join('\n'))
}

export default tags
