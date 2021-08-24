"use strict";
//https://www.tiktok.com/@whinderssonnunes/video/6987124864356257029
const controllers = require('./lib/controllers');
const TikTokEmbed = {}, embed = '<div class="js-lazyYT" data-youtube-id="$4" data-width="640" data-height="360"><iframe class="lazytube" src="//www.youtube.com/embed/$4"></iframe></div>';
const regularUrl = /<a.*?href="((https?:\/\/?:www\.)?tiktok\.com\/\S*\/|(https?:\/\/)?youtu\.be\/)([a-zA-Z0-9_-]{1,30})".*?<\/a>/g;

TikTokEmbed.init = function(params, callback) {
	const router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/youtube-lite', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/youtube-lite', controllers.renderAdminPage);

	callback();
};

TikTokEmbed.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/youtube-lite',
		icon: 'fa-youtube',
		name: 'Youtube Lite'
	});

	callback(null, header);
};

TikTokEmbed.parse = function(data, callback) {
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }

		console.log('tiktok content', data.postData.content)

        // if (data.postData.content.match(regularUrl)) {	
        //     data.postData.content = data.postData.content.replace(regularUrl, embed);
        // }
        callback(null, data);

    };

module.exports = TikTokEmbed;
