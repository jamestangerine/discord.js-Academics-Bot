const { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, CheckboxBuilder, ModalBuilder, CheckboxGroupBuilder, ComponentType, LabelBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const fread = require('fs');
client.login(fread.readFileSync('./secrets.toml', 'utf8'));

client.once(Events.ClientReady, () => {
    console.log('Operational');
});

function constructAdderMsg(concat, addIndex2) {
    return {
        embeds: [
            new EmbedBuilder()
                .setColor(0x0000ff)
                .setTitle('Recommended Topics')
                .setDescription(addIndex2 == 2 ? `The following is a selection of topics you can select to conveniently add channels to your server. Choosing one will allow you to select items to add to the \`${concat}\` category.\n\nIf you would like to update the category or other addition settings, you may select \`Configure Addition Settings\`.` : `The following is a selection of topics you can select to conveniently add channels to your server. Choosing one will allow you to select items to add to an automatically generated new category.\n\nIf you would like to update the category or other addition settings, you may select \`Configure Addition Settings\`.`)
        ],
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`101r${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('General School Channels'),
                new ButtonBuilder()
                    .setCustomId(`101n${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('General Math'),
                new ButtonBuilder()
                    .setCustomId(`101o${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('General English'),
                new ButtonBuilder()
                    .setCustomId(`101p${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('General Science'),
                new ButtonBuilder()
                    .setCustomId(`101q${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('General Social Studies')
            ),
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`101a${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP Arts'),
                new ButtonBuilder()
                    .setCustomId(`101b${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP English'),
                new ButtonBuilder()
                    .setCustomId(`101c${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP History and Social Sciences'),
                new ButtonBuilder()
                    .setCustomId(`101d${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP Math and Computer Science'),
                new ButtonBuilder()
                    .setCustomId(`101e${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP Sciences')
            ),
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`101f${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP World Languages and Cultures'),
                new ButtonBuilder()
                    .setCustomId(`101g${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP Capstone Diploma Program'),
                new ButtonBuilder()
                    .setCustomId(`101h${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('AP Career Kickstart')
            ),
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`101i${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Academic Competitions'),
                new ButtonBuilder()
                    .setCustomId(`101j${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Academic Clubs'),
                new ButtonBuilder()
                    .setCustomId(`101k${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Service & Community Clubs'),
                new ButtonBuilder()
                    .setCustomId(`101l${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Sports Clubs'),
                new ButtonBuilder()
                    .setCustomId(`101m${concat}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel('Interest Clubs'),
            ),
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`011`)
                    .setStyle(ButtonStyle.Primary)
                    .setLabel('Configure Addition Settings'),
            )
        ]
    };
}

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    const content = message.content;
    if (content[0] == '!')
        try {
            switch (content[1]) {
                case 'i':
                    message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(0xffff00)
                                .setTitle(':warning: Warning')
                                .setDescription('The initialization process will irreversibly reset this server\'s structure. Do **NOT** proceed unless you wish to fully reset the server.\n\n**Important:** Before beginning the initialization process, please check that your server is a community server. If you go into the server\'s settings and see __Community Overview__ near the bottom, it is enabled. If you instead see __Enable Community__, head there and enable community mode. Please simply use the default setup wizard suggestions; this bot will configure the rules and admin channels for you.')
                        ],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('000')
                                    .setStyle(ButtonStyle.Danger)
                                    .setLabel('Acknowledge and Proceed'),
                                new ButtonBuilder()
                                    .setCustomId('100')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Cancel')
                            )
                        ]
                    });
                    break;
                case 'c':
                    let necessaryIndices = [];
                    let addIndex = 0;
                    let i = 0;
                    const guild = message.guild;
                    switch (content[2]) {
                        case 'h':
                            const channels = await guild.channels.fetch();
                            const cAdd = guild.channels;
                            let parentCategory;
                            switch (content[8]) {
                                case 'L':
                                    while (addIndex < 2) {
                                        if (content[i] == '\"') {
                                            necessaryIndices[addIndex] = i;
                                            addIndex++;
                                        }
                                        i++;
                                    }
                                    const catSearch = content.substring(necessaryIndices[0]+1, necessaryIndices[1]);
                                    parentCategory = channels.find(cChannel => cChannel.name == catSearch && cChannel.type == ChannelType.GuildCategory);
                                    if (!parentCategory)
                                        parentCategory = await cAdd.create({
                                            name: catSearch,
                                            type: ChannelType.GuildCategory
                                        });
                                    const addChannelNames = content.substring(necessaryIndices[1]+7, content.length-1).split(content[necessaryIndices[1]+3]);
                                    const progBar = await message.reply("Adding channels...");
                                    for (let cn of addChannelNames) {
                                        cAdd.create({
                                            name: cn,
                                            type: ChannelType.GuildText,
                                            parent: parentCategory
                                        });
                                    }
                                    progBar.edit("Finished adding channels.");
                                    break;
                                default:
                                    while (addIndex < 4) {
                                        if (content[i] == '\"') {
                                            necessaryIndices[addIndex] = i;
                                            addIndex++;
                                        }
                                        i++;
                                    }
                                    const catSearch1 = content.substring(necessaryIndices[0]+1, necessaryIndices[1]);
                                    parentCategory = channels.find(cChannel => cChannel.name == catSearch1 && cChannel.type == ChannelType.GuildCategory);
                                    if (!parentCategory)
                                        parentCategory = await cAdd.create({
                                            name: catSearch1,
                                            type: ChannelType.GuildCategory
                                        });
                                    cAdd.create({
                                        name: content.substring(necessaryIndices[2]+1, necessaryIndices[3]),
                                        type: ChannelType.GuildText,
                                        parent: parentCategory
                                    });
                                    break;
                            }
                            break;
                        case 'a':
                            switch (content[9]) {
                                case 'L': // !categoryListAdd \"{separator}\" \"{categoryNameList}\"
                                    while (content[i] != '\"')
                                        i++;
                                    const addChannelNames = content.substring(i+5, content.length-1).split(content[i+1]);
                                    const progBar = await message.reply("Adding categories...");
                                    for (let cn of addChannelNames) {
                                        guild.channels.create({
                                            name: cn,
                                            type: ChannelType.GuildCategory
                                        });
                                    }
                                    progBar.edit("Finished adding categories.");
                                    break;
                                default: // !categoryAdd \"{categoryName}\"
                                    while (addIndex < 2) {
                                        if (content[i] == '\"') {
                                            necessaryIndices[addIndex] = i;
                                            addIndex++;
                                        }
                                        i++;
                                    }
                                    guild.channels.create({
                                        name: content.substring(necessaryIndices[0]+1, necessaryIndices[1]),
                                        type: ChannelType.GuildCategory,
                                    });
                                    break;
                            }
                            break;
                    }
                    break;
                case "r":
                    let necessaryIndices2 = [];
                    let addIndex2 = 0;
                    let i2 = 0;
                    const leng = content.length;
                    while (addIndex2 < 2 && i2 < leng) {
                        if (content[i2] == '\"') {
                            necessaryIndices2[addIndex2] = i2;
                            addIndex2++;
                        }
                        i2++;
                    }
                    const concat = (addIndex2 == 2 ? content.substring(necessaryIndices2[0]+1, necessaryIndices2[1]) : "");
                    message.reply(constructAdderMsg(concat, addIndex2));
                    break;
                default:
                    message.reply('Invalid command.');
                    break;
            }
        } catch (e) {
            message.reply('Invalid command.');
            console.log(e);
        }
});

/*
    000 = Initiation proceed
    100 = Initiation decline
    010 = Setup begin
    11 = Page 1 next
    001 = Page 1 previous
    101 = Add recommended topics
    011 = Edit recommended adder data
*/

const recData = [
    [
        "AP Arts",
        [
            ["AP 2-D Art and Design", "0", "AP 2D Art"],
            ["AP 3-D Art and Design", "1", "AP 3D Art"],
            ["AP Drawing", "2", "AP Drawing"],
            ["AP Art History", "3", "AP Art History"],
            ["AP Music Theory", "4", "AP Music Theory"],
        ]
    ],
    [
        "AP English",
        [
            ["AP English Language and Composition", "0", "AP Lang"],
            ["AP English Literature and Composition", "1", "AP Lit"],
        ]
    ],
    [
        "AP History and Social Sciences",
        [
            ["AP African American Studies", "0", "AP Afro"],
            ["AP Comparative Government and Politics", "1", "AP Comp Gov"],
            ["AP European History", "2", "AP Euro"],
            ["AP Human Geography", "3", "AP HuG"],
            ["AP Macroeconomics", "4", "AP Macro"],
            ["AP Microeconomics", "5", "AP Micro"],
            ["AP Psychology", "6", "AP Psych"],
            ["AP United States Government and Politics", "7", "AP US Gov"],
            ["AP United States History", "8", "AP US History"],
            ["AP World History: Modern", "9", "AP World"]
        ]
    ],
    [
        "AP Math and Computer Science",
        [
            ["AP Calculus AB", "0", "AP Calc AB"],
            ["AP Calculus BC", "1", "AP Calc BC"],
            ["AP Computer Science A", "2", "AP CSA"],
            ["AP Computer Science Principles", "3", "AP CSP"],
            ["AP Precalculus", "4", "AP Precalc"],
            ["AP Statistics", "5", "AP Stats"]
        ]
    ],
    [
        "AP Sciences",
        [
            ["AP Biology", "0", "AP Bio"],
            ["AP Chemistry", "1", "AP Chem"],
            ["AP Environmental Science", "2", "APES"],
            ["AP Physics 1: Algebra-Based", "3", "AP Physics 1"],
            ["AP Physics 2: Algebra-Based", "4", "AP Physics 2"],
            ["AP Physics C: Electricity and Magnetism", "5", "AP Physics C E&M"],
            ["AP Physics C: Mechanics", "6", "AP Physics C Mech"]
        ]
    ],
    [
        "AP World Languages and Cultures",
        [
            ["AP Chinese Language and Culture", "0", "AP Chinese"],
            ["AP French Language and Culture", "1", "AP French"],
            ["AP German Language and Culture", "2", "AP German"],
            ["AP Italian Language and Culture", "3", "AP Italian"],
            ["AP Japanese Language and Culture", "4", "AP Japanese"],
            ["AP Latin", "5", "AP Latin"],
            ["AP Spanish Language and Culture", "6", "AP Spanish"],
            ["AP Spanish Literature and Culture", "7", "AP Spanish Lit"]
        ]
    ],
    [
        "AP Capstone Diploma Program",
        [
            ["AP Research", "0", "AP Research"],
            ["AP Seminar", "1", "AP Seminar"]
        ]
    ],
    [
        "AP Career Kickstart",
        [
            ["AP Business with Personal Finance", "0", "AP Business"],
            ["AP Cybersecurity", "1", "AP Cyber"]
        ]
    ],
    [
        "Academic Competitions",
        [
            ["Science Olympiad", "0", "Science Olympiad"],
            ["Science Bowl", "1", "Science Bowl"],
            ["Quiz Bowl", "2", "Quiz Bowl"],
            ["Robotics", "3", "Robotics"],
            ["Mu Alpha Theta", "4", "Mu Alpha Theta"],
            ["HOSA", "5", "HOSA"],
            ["DECA", "6", "DECA"],
            ["Speech and Debate", "7", "Speech and Debate"],
            ["Model United Nations", "8", "Model UN"],
            ["Mock Trial", "9", "Mock Trial"]
        ]
    ],
    [
        "Academic Clubs",
        [
            ["Math Club", "0", "Math Club"],
            ["Science Club", "1", "Science Club"],
            ["Computer Science Club", "2", "Comp Sci Club"],
            ["History Club", "3", "History Club"],
            ["Drama Club", "4", "Drama Club"],
            ["Spanish Club", "5", "Spanish Club"],
            ["French Club", "6", "French Club"],
            ["German Club", "7", "German Club"],
            ["Music Club", "8", "Music Club"],
            ["Art Club", "9", "Art Club"]
        ]
    ],
    [
        "Service & Community Clubs",
        [
            ["Student Council", "0", "Student Council"],
            ["National Honor Society", "1", "NHS"],
            ["Key Club", "2", "Key Club"],
            ["Beta Club", "3", "Beta Club"],
            ["4-H", "4", "4-H"],
            ["American Red Cross", "5", "Red Cross"],
            ["Christian Club", "6", "Christian Club"],
            ["Equality Club", "7", "Equality Club"],
            ["Tutoring Club", "8", "Tutoring Club"],
            ["Yearbook Club", "9", "Yearbook Club"]
        ]
    ],
    [
        "Sports Clubs",
        [
            ["Track and Field", "0", "Track"],
            ["Football", "1", "Football"],
            ["Basketball", "2", "Basketball"],
            ["Volleyball", "3", "Volleyball"],
            ["Soccer", "4", "Soccer"],
            ["Baseball", "5", "Baseball"],
            ["Softball", "6", "Softball"],
            ["Cross Country", "7", "Cross Country"],
            ["Tennis", "8", "Tennis"],
            ["Swimming and Diving", "9", "Swimming"]
        ]
    ],
    [
        "Interest Clubs",
        [
            ["eSports", "0", "eSports"],
            ["Tabletop Games Club", "1", "Tabletop Games"],
            ["Video Game Club", "2", "Video Games"],
            ["Book Club", "3", "Book Club"],
            ["Cinema Club", "4", "Cinema"],
            ["Creative Writing Club", "5", "Creative Writing"],
            ["International Club", "6", "International Club"],
            ["Chess Club", "7", "Chess"],
            ["Gardening Club", "8", "Gardening"],
            ["Baking Club", "9", "Baking"]
        ]
    ],
    [
        "General Math",
        [
            ["Prealgebra", "0", "Prealgebra"],
            ["Algebra I", "1", "Algebra I"],
            ["Integrated Math I", "2", "Integrated Math I"],
            ["Geometry", "3", "Geometry"],
            ["Integrated Math II", "4", "Integrated Math II"],
            ["Algebra II", "5", "Algebra II"],
            ["Integrated Math III", "6", "Integrated Math III"],
            ["Precalculus", "7", "Precalculus"]
        ]
    ],
    [
        "General English",
        [
            ["English I", "0", "English I"],
            ["English II", "1", "English II"],
            ["English III", "2", "English III"],
            ["English IV", "3", "English IV"],
            ["Speech and Communications", "4", "Speech"],
            ["Creative Writing", "5", "Creative Writing"]
        ]
    ],
    [
        "General Science",
        [
            ["Physical Science", "0", "Physical Science"],
            ["Earth Science", "1", "Earth Science"],
            ["Biology", "2", "Biology"],
            ["Chemistry", "3", "Chemistry"],
            ["Astronomy", "4", "Astronomy"],
            ["Environmental Science", "5", "Environmental Science"],
            ["Anatomy and Physiology", "6", "Anatomy and Physiology"],
            ["Zoology", "7", "Zoology"],
            ["Botany", "8", "Botany"]
        ]
    ],
    [
        "General Social Studies",
        [
            ["World History", "0", "World History"],
            ["World Geography", "1", "World Geography"],
            ["US History", "2", "US History"],
            ["Civics", "3", "Civics"],
            ["US Government", "4", "US Government"],
            ["Economics (separate)", "5", "Economics"],
            ["Personal Finance (separate)", "6", "Personal Finance"],
            ["Economics and Personal Finance (combined)", "7", "Econ and Pers Fin"],
            ["Psychology", "8", "Psychology"],
            ["Sociology", "9", "Sociology"]
        ]
    ],
    [
        "General School Channels",
        [
            ["Announcements", "0", "Announcements"],
            ["Emergency Alerts", "1", "Emergency Alerts"],
            ["School Discussion", "2", "School Discussion"],
            ["Q&A", "3", "QnA"],
            ["Counseling Resources", "5", "Counseling"],
            ["College and Career Resources", "6", "College and Career"],
            ["Feedback", "7", "Feedback"]
        ]
    ]
]

const instData = [
    [
        "Step 1 - Adding subjects",
        `First, you can add channels for people to discuss each subject with the following commands:

        \`!recommendedAdd "{optional:categoryName}"\` - Provides a selection of common academic topics from which you may select channels to add to the category specified by the provided \`categoryName\` through a checkbox list UI. Omitting \`categoryName\` will automatically create a new category to which the channels will be added.
        
        \`!categoryAdd "{categoryName}"\` - Creates a new category with the provided \`categoryName\`.
        
        \`!categoryListAdd "{separator}" "{categoryNameList}"\` - Creates a list of new categories with the provided \`categoryNameList\`. Category names in this list are taken to be separated by the specified one-character \`separator\`.
        
        \`!channelAdd "{categoryName}" "{channelName}"\` - Creates a new channel in the category specified by \`categoryName\` with the provided \`channelName\`.
        
        \`!channelListAdd "{categoryName}" "{separator}" "{channelNameList}"\` - Creates a list of new channels in the category specified by \`categoryName\` with the provided \`channelNameList\`. Channel names in this list are taken to be separated by the specified one-character \`separator\``
    ],
    [
        "Step 2",
        `WIP`
    ]
]
const instDataMax = instData.length-1;

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.message.author.id == client.user.id) {
        try {
            const id = interaction.customId;
            if (interaction.isButton()) {
                if (id[0] == '0') {
                    if (id[1] == '0') {
                        if (id[2] == '0') { // Initiation proceed
                            interaction.update({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(0xff0000)
                                        .setTitle('Initializing server...')
                                ],
                                components: []
                            });
                            const channel = interaction.channel;
                            const guild = interaction.guild;
                            const cMod = guild.channels;
                            if (channel.parent)
                                channel.parent.setName("Administrative");
                            else
                                await channel.setParent(await cMod.create({
                                    name: "Administrative",
                                    type: ChannelType.GuildCategory
                                }));
                            channel.setName("admin-main");
                            const commChannels = [guild.rulesChannel, guild.publicUpdatesChannel];
                            for (let cChannel of commChannels)
                                await cChannel.setParent(channel.parent);
                            const channels = await guild.channels.fetch();
                            const comp = [channel.id, channel.parent.id, commChannels[0].id, commChannels[1].id];
                            channels.forEach((modChannel) => {
                                if (modChannel.id != comp[0] && modChannel.id != comp[1] && modChannel.id != comp[2] && modChannel.id != comp[3])
                                    modChannel.delete();
                            });
                            const roles = await guild.roles.fetch();
                            const everyId = guild.id;
                            roles.forEach((modRole) => {
                                if (modRole.id != everyId && !modRole.managed)
                                    modRole.delete();
                            });
                            const messages = await commChannels[0].messages.fetch();
                            const ruleMessage = commChannels[0].send("**Rules:**\n\nWIP");
                            messages.forEach((message) => message.delete());
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
                                            .setCustomId('010')
                                            .setStyle(ButtonStyle.Success)
                                            .setLabel('Okay')
                                    )
                                ]
                            });
                        } else { // Page 1 previous
                            let currPage = id.charCodeAt(3)-97;
                            if (currPage > 0) {
                                currPage--;
                                const concat = String.fromCharCode(currPage+97);
                                interaction.update({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(0x00ff00)
                                            .setTitle(instData[currPage][0])
                                            .setDescription(instData[currPage][1])
                                    ],
                                    components: [
                                        new ActionRowBuilder().addComponents(
                                            new ButtonBuilder()
                                                .setCustomId(`001${concat}`)
                                                .setStyle(ButtonStyle.Secondary)
                                                .setLabel('Previous'),
                                            new ButtonBuilder()
                                                .setCustomId(`11${concat}`)
                                                .setStyle(ButtonStyle.Success)
                                                .setLabel('Next')
                                        )
                                    ]
                                });
                            } else
                                interaction.deferUpdate();
                        }
                    } else if (id[2] == '0') { // Setup begin
                        interaction.update({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(0x00ff00)
                                    .setTitle(instData[0][0])
                                    .setDescription(instData[0][1])
                            ],
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('001a')
                                        .setStyle(ButtonStyle.Secondary)
                                        .setLabel('Previous'),
                                    new ButtonBuilder()
                                        .setCustomId('11a')
                                        .setStyle(ButtonStyle.Success)
                                        .setLabel('Next')
                                )
                            ]
                        });
                    } else { // Edit recommended adder data
                        interaction.showModal(
                            new ModalBuilder()
                                .setCustomId("1")
                                .setTitle("Configure Recommendation Adder")
                                .addLabelComponents(
                                    new LabelBuilder()
                                        .setLabel("Configure the recommendation adder below:")
                                        .setTextInputComponent(
                                            new TextInputBuilder()
                                                .setCustomId("configInput")
                                                .setPlaceholder("\"{categoryName}\"")
                                                .setStyle(TextInputStyle.Short)
                                        )
                                )
                        );
                    }
                } else if (id[1] == '0') {
                    if (id[2] == '0') { // Initiation decline
                        interaction.update({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(0x00ff00)
                                    .setTitle('Cancelled')
                            ],
                            components: []
                        });
                    } else { // Add recommended topics
                        const charProc = id.charCodeAt(3)-97;
                        let optionsArr = [];
                        for (let c of recData[charProc][1])
                            optionsArr.push({ label: c[0], value: c[1] });
                        const catName = recData[charProc][0];
                        interaction.showModal(
                            new ModalBuilder()
                                .setCustomId(`0${id.substring(3)}`)
                                .setTitle(catName)
                                .addLabelComponents(
                                    new LabelBuilder()
                                        .setLabel("Select the channels you would like to add")
                                        .setCheckboxGroupComponent(
                                            new CheckboxGroupBuilder()
                                                .setCustomId('cbg')
                                                .addOptions(optionsArr)
                                        )
                                )
                        );
                    }
                } else { // Page 1 next
                    let currPage = id.charCodeAt(2)-97;
                    if (currPage < instDataMax) {
                        currPage++;
                        const concat = String.fromCharCode(currPage+97);
                        interaction.update({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(0x00ff00)
                                    .setTitle(instData[currPage][0])
                                    .setDescription(instData[currPage][1])
                            ],
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`001${concat}`)
                                        .setStyle(ButtonStyle.Secondary)
                                        .setLabel('Previous'),
                                    new ButtonBuilder()
                                        .setCustomId(`11${concat}`)
                                        .setStyle(ButtonStyle.Success)
                                        .setLabel('Next')
                                )
                            ]
                        });
                    } else
                        interaction.deferUpdate();
                }
            } else if (interaction.isModalSubmit()) {
                if (id[0] == '0') {
                    const charProc = id.charCodeAt(1)-97;
                    const guild = interaction.guild;
                    const channels = guild.channels;
                    let parentChannel;
                    const fetchedChannels = await guild.channels.fetch();
                    const autoName = recData[charProc][0];
                    if (id.length == 2) {
                        parentChannel = fetchedChannels.find(cChannel => cChannel.name == autoName && cChannel.type == ChannelType.GuildCategory);
                        if (!parentChannel)
                            parentChannel = await channels.create({
                                name: autoName,
                                type: ChannelType.GuildCategory
                            });
                    } else {
                        const catSearch = id.substring(2);
                        parentChannel = fetchedChannels.find(cChannel => cChannel.name == catSearch && cChannel.type == ChannelType.GuildCategory)
                        if (!parentChannel)
                            parentChannel = await channels.create({
                                name: catSearch,
                                type: ChannelType.GuildCategory
                            });
                    }
                    for (let c of interaction.fields.getCheckboxGroup('cbg')) {
                        let n = parseInt(c);
                        channels.create({
                            name: recData[charProc][1][n][2],
                            type: ChannelType.GuildText,
                            parent: parentChannel
                        });
                    }
                    interaction.deferUpdate();
                } else {
                    const receivedInput = interaction.fields.getTextInputValue('configInput');
                    let addIndex = 0;
                    let necessaryIndices = [];
                    let i = 0;
                    const riLen = receivedInput.length;
                    while (addIndex < 2 && i < riLen) {
                        if (receivedInput[i] == '\"') {
                            necessaryIndices[addIndex] = i;
                            addIndex++;
                        }
                        i++;
                    }
                    interaction.update(constructAdderMsg(receivedInput.substring(necessaryIndices[0]+1, necessaryIndices[1]), addIndex));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
});