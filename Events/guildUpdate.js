// Server details updated (name, icon, etc.)
module.exports = (bot, db, winston, oldsvr, newsvr) => {
	// Get server data
	db.servers.findOne({_id: oldsvr.id}, (err, serverDocument) => {
		if(!err && serverDocument) {
			if(serverDocument.config.moderation.isEnabled) {
				// Send server_name_updated_message if necessary
				if(oldsvr.name!=newsvr.name && serverDocument.config.moderation.status_messages.server_name_updated.isEnabled) {
					winston.info("Name of server '" + oldsvr.name + "' changed to '" + newsvr.name + "'", {svrid: oldsvr.id});
					var ch = oldsvr.channels.find("id", serverDocument.config.moderation.status_messages.server_name_updated.channel_id);
					if(ch) {
						ch.sendMessage("Server name changed from `" + oldsvr.name + "` to `" + newsvr.name + "`");
					}
				}

				// Send server_icon_updated_message if necessary
				if(oldsvr.icon!=newsvr.icon && serverDocument.config.moderation.status_messages.server_icon_updated_message.isEnabled) {
					winston.info("Icon of server '" + oldsvr.name + "' changed from '" + oldsvr.icon + "' to '" + newsvr.icon + "'", {svrid: oldsvr.id});
					var ch = oldsvr.channels.find("id", serverDocument.config.moderation.status_messages.server_icon_updated_message.channel_id);
					if(ch) {
						ch.sendMessage("Server icon changed from `" + (oldsvr.iconURL || "<no icon>") + "` to `" + (newsvr.iconURL || "<no icon>") + "`");
					}
				}

				// Send server_region_updated_message if necessary
				if(oldsvr.region!=newsvr.region && serverDocument.config.moderation.status_messages.server_region_updated_message.isEnabled) {
					winston.info("Region of server '" + oldsvr.name + "' changed from " + oldsvr.region + " to " + newsvr.region, {svrid: oldsvr.id});
					var ch = oldsvr.channels.find("id", serverDocument.config.moderation.status_messages.server_region_updated_message.channel_id);
					if(ch) {
						ch.sendMessage("Server region changed from " + getRegionString(oldsvr.region) + " to " + getRegionString(newsvr.region));
					}

					// Format region string
					function getRegionString(region) {
						const emoji = getRegionEmoji(region);
						if(region.indexOf("us")==0) {
							region = region.substring(0, 2).toUpperCase() + region.slice(2);
						}
						return "**" + region.charAt(0).toUpperCase() + region.slice(1).replace("-", " ") + "** " + emoji;
					}

					// Get emoji for regions
					function getRegionEmoji(region) {
						switch(region) {
							case "amsterdam":
								return ":flag_nl:";
							case "brazil":
								return ":flag_br:";
							case "frankfurt":
								return ":flag_de:";
							case "london":
								return ":flag_gb:";
							case "singapore":
								return ":flag_sg:";
							case "sydney":
								return ":flag_au:";
							case "us-central":
							case "us-east":
							case "us-south":
							case "us-west":
								return ":flag_us:";
							default:
								return ":grey_question:";
						}
					}
				}
			}
		} else {
			winston.error("Failed to find server data for serverUpdated", {svrid: oldsvr.id}, err);
		}
	});
};