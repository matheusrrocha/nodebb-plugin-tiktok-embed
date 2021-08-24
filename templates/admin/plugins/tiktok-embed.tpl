<div class="row youtube-lite">
	<div class="col-lg-9">
		<div class="panel panel-default">
			<div class="panel-heading"><i class="fa fa-youtube"></i>TikTok Embed</div>
			<div class="panel-body">
				<p class="lead">
					Lazyload TikToktok videos on your NodeBB forum with just the URL.
				</p>

				<div class="row">
					<div class="col-sm-6 well">
						<form class="form youtube-lite-settings">
							<div class="form-group">
								<label for="id">Testing</label>
								<input type="text" class="form-control" name="id" input id="youtubeKey" value="{settings.youtubeKey}"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">TikTok Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('tiktok-embed', $('.youtube-lite-settings'));
		$('#save').on('click', function() {
			var data = {
			youtubeKey: $('#youtubeKey').val()
		};
			Settings.save('tiktok-embed', $('.youtube-lite-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'youtube-lite-saved',
					title: 'Reload Required',
					message: 'Please reload your NodeBB to complete configuration of the Youtube Lite plugin',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				})
			});
		});
	});
</script>
