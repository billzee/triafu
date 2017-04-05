class PostsController < ApplicationController

  def index
    @post = Post.new
    @@media = Media.new
    respond_to do |format|
      format.html
      format.json {render :json => Post.all_with_media}
    end
  end

  def show
    p params
    @post = Post.with_media(params[:id])
    p @post
    respond_to do |format|
      format.html
    end
  end

  def upload_media
    @@media = Media.new media_params
  end

  def create
    if @@media.save
      post = Post.new post_params
      post.media = @@media
      if post.save
        respond_to do |format|
          format.html {redirect_to post}
          format.json {render json: post.id, status: :ok}
        end
      end
    end
  end

  def vote
    post = Post.find(params[:post_id])
    post.vote params[:type]
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit :title, :original
  end

  def media_params
    params.require(:media).permit :image
  end
end
