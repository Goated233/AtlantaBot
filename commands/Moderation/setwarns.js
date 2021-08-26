const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "setwarns",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS", "KICK_MEMBERS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const sanction = args[0];
		if(!sanction || (sanction !== "kick" && sanction !== "ban")){
			return interaction.reply({
				content: translate("moderation/setwarns:MISSING_TYPE"),
				ephemeral: true
			});
		}

		const number = args[1];

		if(number === "reset"){
			if(sanction === "kick"){
				data.guild.plugins.warnsSanctions.kick = false;
				data.guild.markModified("plugins.warnsSanctions");
				data.guild.save();
				return message.success("moderation/setwarns:SUCCESS_KICK_RESET", {
					prefix: data.guild.prefix,
					count: number
				});
			}
			if(sanction === "ban"){
				data.guild.plugins.warnsSanctions.ban = false;
				data.guild.markModified("plugins.warnsSanctions");
				data.guild.save();
				return message.success("moderation/setwarns:SUCCESS_BAN_RESET", {
					prefix: data.guild.prefix,
					count: number
				});
			}
		}

		if(!number || isNaN(number)){
			return interaction.reply({
				content: translate("misc:INVALID_NUMBER"),
				ephemeral: true
			});
		}
		if(number < 1 || number > 10){
			return interaction.reply({
				content: translate("misc:INVALID_NUMBER_RANGE", 1, 10),
				ephemeral: true
			});
		}

		if(sanction === "kick"){
			data.guild.plugins.warnsSanctions.kick = number;
			data.guild.markModified("plugins.warnsSanctions");
			data.guild.save();
			return message.success("moderation/setwarns:SUCCESS_KICK", {
				prefix: data.guild.prefix,
				count: number
			});
		}

		if(sanction === "ban"){
			data.guild.plugins.warnsSanctions.ban = number;
			data.guild.markModified("plugins.warnsSanctions");
			data.guild.save();
			return message.success("moderation/setwarns:SUCCESS_BAN", {
				prefix: data.guild.prefix,
				count: number
			});
		}

	}

};
