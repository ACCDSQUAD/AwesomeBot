const config = require("./../../Configuration/config.json");
const mongoose = require("mongoose");

// Server's configs (commands, admins, etc.)
module.exports = {
	admins: [new mongoose.Schema({
		_id: {type: String, required: true},
		level: {type: Number, default: 1, enum: [1, 2, 3]}
	})],
	auto_add_admins: {type: Boolean, default: true},
	blocked: [String],
	command_cooldown: {type: Number, default: 0, min: 0, max: 300000},
	command_fetch_properties: {
		default_count: {type: Number, default: 3, min: 1, max: 10},
		max_count: {type: Number, default: 5, min: 1, max: 25}
	},
	command_prefix: {type: String, default: "@mention", maxlength: 10, minlength: 1},
	commands: getCommands(),
	count_data: [new mongoose.Schema({
		_id: {type: String, required: true},
		value: {type: Number, default: 0, min: 0}
	})],
	countdown_data: [new mongoose.Schema({
		_id: {type: String, required: true},
		name: {type: String, required: true},
		expiry_timestamp: {type: Date, required: true}
	})],
	custom_api_keys: {
		google_api_key: String,
		google_cse_id: String
	},
	custom_colors: {type: Boolean, default: false},
	custom_roles: [String],
	delete_command_messages: {type: Boolean, default: false},
	extensions: [require("./modulesSchema.js")],
	list_data: [new mongoose.Schema({
		content: {type: String, required: true},
		isCompleted: {type: Boolean, default: false, required: true}
	})],
	message_of_the_day: {
		isEnabled: {type: Boolean, default: false},
		message_content: String,
		channel_id: String,
		interval: {type: Number, default: 86400000, min: 300000, max: 172800000},
		last_run: Date
	},
	moderation: {
		isEnabled: {type: Boolean, default: true},
		filters: {
			spam_filter: {
				isEnabled: {type: Boolean, default: false},
				enabled_channel_ids: [String],
				message_sensitivity: {type: Number, default: 5, enum: [3, 5, 10]},
				action: {type: String, default: "mute", enum: ["block", "mute", "kick", "ban"]},
				delete_messages: {type: Boolean, default: true},
				violator_role_id: String
			},
			nsfw_filter: {
				isEnabled: {type: Boolean, default: true},
				enabled_channel_ids: [String],
				action: {type: String, default: "block", enum: ["block", "mute", "kick", "ban"]},
				delete_message: {type: Boolean, default: true},
				violator_role_id: String
			},
			custom_filter: {
				keywords: [String],
				enabled_channel_ids: [String],
				action: {type: String, default: "mute", enum: ["block", "mute", "kick", "ban"]},
				delete_message: {type: Boolean, default: true},
				violator_role_id: String
			}
		},
		status_messages: {
			server_name_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String 
			},
			server_icon_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String 
			},
			server_region_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String 
			},
			new_member_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				messages: [String]
			},
			new_member_pm: {
				isEnabled: {type: Boolean, default: false},
				message_content: String
			},
			member_online_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				messages: [String]
			},
			member_streaming_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				enabled_user_ids: [String]
			},
			member_offline_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				messages: [String]
			},
			member_username_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String
			},
			member_nick_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String
			},
			member_avatar_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String
			},
			member_game_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String
			},
			member_rank_updated_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				type: {type: String, default: "message", enum: ["message", "pm"]}
			},
			member_removed_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				messages: [String]
			},
			member_removed_pm: {
				isEnabled: {type: Boolean, default: false},
				message_content: String
			},
			member_banned_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				messages: [String]
			},
			member_unbanned_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				messages: [String]
			},
			message_edited_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				enabled_channel_ids: [String]
			},
			message_deleted_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				enabled_channel_ids: [String]
			},
			twitch_stream_message: {
				isEnabled: {type: Boolean, default: false},
				channel_id: String,
				discord_enabled: {type: Boolean, default: false},
				enabled_user_ids: [String],
				twitch_usernames: [String]
			}
		},
		new_member_roles: [String],
		autokick_members: {
			isEnabled: {type: Boolean, default: false},
			max_inactivity: {type: Number, default: 172800000, min: 7200000, max: 2592000000}
		}
	},
	music_data: {
		addingQueueIsAdminOnly: {type: Boolean, default: false},
		removingQueueIsAdminOnly: {type: Boolean, default: false},
		addingPlaylistIsAdminOnly: {type: Boolean, default: false},
		removingPlaylistIsAdminOnly: {type: Boolean, default: false},
		playlists: [new mongoose.Schema({
			_id: {type: String, required: true},
			item_urls: [String]
		})]
	},
	name_display: {
		use_nick: {type: Boolean, default: true},
		show_discriminator: {type: Boolean, default: false}
	},
	public_data: {
		isShown: {type: Boolean, default: true},
		server_listing: {
			isEnabled: {type: Boolean, default: false},
			category: {type: String, default: "Other", enum: ["Gaming", "Tech", "Programming", "Community", "Bots", "Other"]},
			description: String,
			invite_link: String
		}
	},
	ranks_list: [new mongoose.Schema({
		_id: {type: String, required: true},
		max_score: {type: Number, min: 1, required: true},
		role_id: String
	})],
	room_data: [new mongoose.Schema({
		_id: {type: String, required: true},
		timer: Number
	})],
	rss_feeds: [new mongoose.Schema({
		_id: {type: String, required: true, lowercase: true, maxlength: 50},
		url: {type: String, required: true},
		streaming: {
			isEnabled: {type: Boolean, default: false},
			enabled_channel_ids: [String],
			last_article_title: String
		}
	})],
	tag_reaction: {
		isEnabled: {type: Boolean, default: false},
		messages: [String]
	},
	tags: {
		list: [new mongoose.Schema({
			_id: {type: String, required: true, lowercase: true, maxlength: 200},
			content: {type: String, required: true, maxlength: 1500},
			isCommand: {type: Boolean, default: false},
			isLocked: {type: Boolean, default: false}
		})],
		listIsAdminOnly: {type: Boolean, default: false},
		addingIsAdminOnly: {type: Boolean, default: false},
		addingCommandIsAdminOnly: {type: Boolean, default: true},
		removingIsAdminOnly: {type: Boolean, default: false},
		removingCommandIsAdminOnly: {type: Boolean, default: true}
	},
	translated_messages: [new mongoose.Schema({
		_id: {type: String, required: true},
		source_language: {type: String, required: true, minlength: 2, maxlength: 6},
		enabled_channel_ids: {type: [String], required: true},
	})],
	trivia_sets: [new mongoose.Schema({
		_id: String,
		items: [new mongoose.Schema({
			category: {type: String, required: true},
			question: {type: String, required: true},
			answer: {type: String, required: true}
		})],
	})],
	voicetext_channels: [String]
};

// Get command(s) structure for server config schema above
function getCommands() {
	// List of all commands
	const commands = config.commands;
	const disabledCommands = config.disabled_commands;
	const adminCommands = config.admin_commands;

	var commandsStructure = {};
	for(var i=0; i<commands.length; i++) {
		commandsStructure[commands[i]] = getCommandStructure(disabledCommands.indexOf(commands[i])==-1, adminCommands.indexOf(commands[i])>-1);
	}
	return commandsStructure;
}

function getCommandStructure(isEnabled, isAdminOnly) {
	return {
		isEnabled: {type: Boolean, default: isEnabled},
		isAdminOnly: {type: Boolean, default: isAdminOnly},
		disabled_channel_ids: [String]
	};
}