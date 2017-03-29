	Dropzone.autoDiscover = false;

$(document).ready(function(){
	// grap our upload form by its id
	var dropzone = new Dropzone("#new_post", {
		// restrict image size to a maximum 1MB
		maxFilesize: 1,
		// changed the passed param to one accepted by
		// our rails app
		paramName: "post[image]",
		// show remove links on each image upload
		addRemoveLinks: true,
    url: 'post/cache_image'
	});

  $('#add').on('click',function(e){
   e.preventDefault();
   dropzone.processQueue();
 });
});
