"use strict";
//https://www.tiktok.com/@whinderssonnunes/video/6987124864356257029

//(?:https?:\/\/)?(?:www\.)?tiktok\.?(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?
const controllers = require('./lib/controllers');
const TikTokEmbed = {}, embed = '<iframe height="800" src="//www.tiktok.com/embed/v2/$1" width="100%" style="border: 0px;"></iframe>';
const regularUrl = /<a.*?href="(?:https?:\/\/)?(?:www\.)?tiktok\.?(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?".*?<\/a>/g;

TikTokEmbed.init = function(params, callback) {
	const router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/tiktok-embed', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/tiktok-embed', controllers.renderAdminPage);

	callback();
};

TikTokEmbed.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/tiktok-embed',
		icon: 'fa-tiktok',
		name: 'Tiktok Embed'
	});

	callback(null, header);
};

TikTokEmbed.parse = function(data, callback) {
	if (!data || !data.postData || !data.postData.content) {
		return callback(null, data);
	}

	if (data.postData.content.match(regularUrl)) {
		data.postData.content = data.postData.content.replace(regularUrl, embed);
	}

	callback(null, data);

};

module.exports = TikTokEmbed;
