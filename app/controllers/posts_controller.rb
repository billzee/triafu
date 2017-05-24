class PostsController < ApplicationController
  before_action :authenticate_user!, :except => [:show, :index]
  @@new_post = nil

  def index
    if request.format.json?
      @paginated_posts = paginated_posts
    end
  end

  def show
    @post = Post.find_by(reference_id: params[:reference_id])
  end

  def upload_file
    @@new_post = Post.new post_file_params

    if @@new_post.invalid?
      file_errors = resolve_file_errors @@new_post.errors

      if file_errors
        render :json => {errors: file_errors}
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
      render :json => {errors: {}}
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
      file_errors = resolve_image_or_video @@new_post.errors
      @@new_post.errors[:file].push(file_errors) unless file_errors.nil?

      render :json => { :errors => @@new_post.errors }
    end
  end

  private

  def paginated_posts
    posts = Post.all_from_category params[:category]
    page = params[:page] ? params[:page] : 1
    posts = posts.page(page)
  end

  def resolve_image_or_video errors
    if errors.include?(:image)
      errors[:image].first
    elsif errors.include?(:video)
      errors[:video].first
    else
      nil
    end
  end

  def resolve_file_errors errors
    if errors.include?(:file)
      errors[:file]
    elsif errors.include?(:image)
      errors[:image]
    elsif errors.include?(:video)
      errors[:video]
    else
      nil
    end
  end

  def post_params
    params.require(:post).permit(:title, :original).merge(user_id: current_user.id)
  end

  def post_file_params
    params.require(:post).permit :file
  end
end
