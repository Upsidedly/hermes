import { CommandInteraction, MessageEmbed } from "discord.js";
import { uClient } from "../../../classes.js";
import { Command } from "../../../types.js";
import tags from './data/tags.js'

async function get(client: uClient, inter: CommandInteraction) {
    await inter.deferReply()
    const target = inter.options.getUser('target');
    const tag = tags.get(inter.options.getString('name')!.toLowerCase());
    if (!tag) { return await inter.user.send({ content: `The tag you tried to send in **${inter.guild?.name}** does not exist.`}) }
    if (target) { 
        return await inter.editReply({ content: `*Tag targeted for* ${target.toString()}\n${tag}` }); 
    } else {
        return await inter.editReply({ content: tag })
    }
}

async function list(client: uClient, inter: CommandInteraction) {
    return await inter.reply({
        embeds: [
            new MessageEmbed()
                .setTitle('Tags')
                .setDescription(Array.from(tags.keys()).join('\n'))
        ]
    })
}

export default {
    name: 'tag',
    description: 'Tags for stuff and even things if you\'re feeling spicy.',
    exec: async (client: uClient, inter: CommandInteraction) => {
        if (inter.options.getSubcommand() === 'get') return await get(client, inter)
        if (inter.options.getSubcommand() === 'list') return await list(client, inter)
    },
    options: [
        {
            name: 'get',
            description: 'Get a tag',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'name',
                    description: 'Name of the tag',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'target',
                    description: 'The target of the tag',
                    type: 'USER'
                }
            ]
        },
        {
            name: 'list',
            description: 'A list of the tags!',
            type: 'SUB_COMMAND'
        }
    ]
} as Command
