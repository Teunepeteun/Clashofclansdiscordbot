const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clan-info')
		.setDescription('Provides info about the clan'),
	async execute(interaction) {
        
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

		const clashResult = await request('https://raw.githubusercontent.com/Teunepeteun/speedwagoninfo/main/speedwagon.json');
        const { file } = await clashResult.body.json();

        const answer = file;

        const clanPoints = trim(answer.clanPoints, 1024);

        const embed = new EmbedBuilder()
    .setAuthor({
    name: "Hog Rider",
    iconURL: clanPoints,
  })
  .setTitle(answer.name)
  .setDescription(answer.description)
  .addFields(
    {
      name: "Tag",
      value: answer.tag,
      inline: true
    },
    {
      name: "Total Trophies:",
      value: answer.clanPoints,
      inline: true
    },
    {
      name: "League:",
      value: answer.warLeague[0],
      inline: true
    },
    {
      name: "Members:",
      value: answer.members,
      inline: true
    },
  )
  .setImage(clanPoints)
  .setColor("#00b0f4");

  interaction.Reply({ embeds: [embed] });
	},
};