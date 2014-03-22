$(document).ready(function () {
	var userId = sessionStorage.getItem('userId');
	$.ajax({
		async: true,
		url: 'api/profile/get_user_info_xml.php',
		type: 'GET',
		data: {'id': userId},
		success: function(data) {
			data = JSON.parse(data);
			var link = $('<a/>', {
				target: "_blank",
				href: data.filepath,
				html: "Download your information as an XML"
            });
			$("#download").append(link);
			$("#download").attr("href", data.filepath);
			var linklog = $('<a/>', {
				target: "_blank",
				href: data.logpath,
				html: "Download your log file"
            });
			$("#downloadlog").append(linklog);
			$("#downloadlog").attr("href", data.logpath);


			console.log(data);
		},
		error: function(xhr, desc, err) {
			console.log(xhr);
			//console.log('Details: ' + desc + '\nError:' + err);
		}
	});

	$.ajax({
		url: 'api/settings/get_settings.php',
		type: 'GET',
		data: {'id': userId},
		success: function(data) {
			data = JSON.parse(data);
			if(data[0].Admin) {
				$('#admin').html('You are an admin user!');
			} else {
				$('#admin').html('You are not an admin user :(');
			}
			console.log(data);
		},
		error: function(xhr, desc, err) {
			console.log(xhr);
			console.log('Details: ' + desc + '\nError:' + err);
		}
	});
});