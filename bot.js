const { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const fread = require('fs');
client.login(fread.readFileSync('./secrets.toml', 'utf8'));

client.once(Events.ClientReady, () => {
    console.log('Operational');
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    const content = message.content;
    if (content[0] == '!')
        switch (content[1]) {
            case 'i':
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xffff00)
                            .setTitle('\u{26A0} Warning')
                            .setDescription('The initialization process will significantly and irreversibly alter this server\'s structure. Do **NOT** proceed unless this is a new, blank server.')
                    ],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('00')
                                .setStyle(ButtonStyle.Danger)
                                .setLabel('Proceed'),
                            new ButtonBuilder()
                                .setCustomId('1')
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel('Cancel')
                        )
                    ]
                });
                break;
            default:
                message.reply('Invalid command.');
                break;
        }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.message.author.id == client.user.id)
        if (interaction.isButton()) {
            const id = interaction.customId;
            if (id[0] == '0') {
                if (id[1] == '0') {
                    interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(0xff0000)
                                .setTitle('Initializing server...')
                        ],
                        components: []
                    });
                    const channel = interaction.channel;
                    if (channel.parent)
                        channel.parent.setName("Administrative");
                    channel.setName("admin-main");
                    const guild = interaction.guild;
                    guild.channels.create({
                        name: 'Subjects',
                        type: ChannelType.GuildCategory
                    });
                    const role = await guild.roles.create({
                        name: "Owner",
                        colors: {
                            primaryColor: '#ff0000'
                        },
                        position: 255
                    });
                    const owner = await guild.fetchOwner();
                    owner.roles.add(role);
                    interaction.message.edit({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(0x00ff00)
                                .setTitle('Welcome to the setup process')
                                .setDescription('You will be presented with sets of commands that will assist you in setting up your server.\n\nYou can use these commands at any time, regardless of where you are in the setup process.')
                        ],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('01')
                                    .setStyle(ButtonStyle.Success)
                                    .setLabel('Okay')
                            )
                        ]
                    });
                }
            } else
                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0x00ff00)
                            .setTitle('Cancelled')
                    ],
                    components: []
                });
        }
});