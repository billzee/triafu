class PostsController < ApplicationController
  before_action :authenticate_user!, :except => [:show, :index]
  @@new_post = nil

  def index
    @paginated_posts = paginated_posts
  end

  def show
    @post = Post.find(params[:id])
  end

  def upload_file
    @@new_post = Post.new post_file_params
    if @@new_post.invalid?
      errors = nil
      if @@new_post.errors.include?(:file)
        errors = @@new_post.errors[:file]
      elsif @@new_post.errors.include?(:image)
        errors = @@new_post.errors[:image]
      elsif @@new_post.errors.include?(:video)
        errors = @@new_post.errors[:video]
      end

      if errors
        render :json => {errors: errors}
      else
        render :json => {}
      end
    else
      render :json => {}
    end
  end

  def remove_file
    if @@new_post.destroy_file?
      render :json => {}
    else
      render :json => {errors: @@new_post.errors[:file]}
    end
  end

  def create
    if @@new_post
      @@new_post.update post_params
    else
      @@new_post = Post.new post_params
    end

    if @@new_post.save
      render :json => @@new_post.id
      @@new_post = nil
    else
      render :json => { :errors => @@new_post.errors }
    end
  end

  private

  def paginated_posts page=1
    posts = Post.all
    page = params[:page] unless params[:page] == nil
    posts = posts.page(page)
  end

  def post_params
    params.require(:post).permit(:title, :original).merge(user_id: current_user.id)
  end

  def post_file_params
    params.require(:post).permit :file
  end
end
