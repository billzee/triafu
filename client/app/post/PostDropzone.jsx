import React, { Component } from 'react';

import PostsApi from '../api/PostsApi';

export default class PostDropzone extends Component {
  constructor(){
    super();
    Dropzone.autoDiscover = false;
  }

  componentDidMount(){
    var dropzoneDescription =
    '<i class="fa fa-file-image-o fa-4x"></i><br/>'+
    '<button type="button" class="btn btn-success text-white mt-3 mb-2">imagem ou vídeo</button><br/>'+
    '<small>Clique, toque ou arraste.</small>';

    Dropzone.prototype.defaultOptions.dictDefaultMessage = dropzoneDescription;
    Dropzone.prototype.defaultOptions.dictFallbackMessage = "Seu navegador não é suportado :(";
    Dropzone.prototype.defaultOptions.dictFallbackText = "Seu navegador não é suportado :(";
    Dropzone.prototype.defaultOptions.dictFileTooBig = "Arquivo é muito grande ({{filesize}}MiB). Máximo: {{maxFilesize}}MiB.";
    Dropzone.prototype.defaultOptions.dictInvalidFileType = "Tipo de arquivo inválido.";
    Dropzone.prototype.defaultOptions.dictResponseError = "Ocorreu um problema: {{statusCode}}.";
    Dropzone.prototype.defaultOptions.dictCancelUpload = "Cancelar upload";
    Dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = "Tem certeza que deseja cancelar?";
    Dropzone.prototype.defaultOptions.dictRemoveFile = "Remover";
    Dropzone.prototype.defaultOptions.dictMaxFilesExceeded = "Apenas uma imagem/vídeo por publicação.";

  	var dropzone = new Dropzone
  	(
  		"#new_media",
  		{
  			headers:
  			{
  				'X-CSRF-Token': ReactOnRails.authenticityToken()
  			},

        init: function(){
          this.on("addedfile", function(){
            if(this.files[1]!=null){
              this.removeFile(this.files[0]);
            }
          });
        },

  			maxFilesize: 1,
  			paramName: "media[image]",
  			maxFiles: 1,
  			clickable: true,
  			method: 'post',
  		  url: '/post/upload_media',
  			uploadMultiple: false,
        addRemoveLinks: true,

        removedfile: function(){
          $('div.dz-success').remove();
          $('div.dz-error').remove();
          PostsApi._remove_media()
          .catch(function(){
            window.location.reload();
          });
        }
  		}
  	);
  }

  render(){
    return (
      <box>
        <div {...this.props} />
      </box>
    );
  }
}
