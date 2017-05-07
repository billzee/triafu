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
      @@new_post.errors[:file] = resolve_file_errors @@new_post.errors

      if @@new_post.errors[:file]
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
      @@new_post.errors[:file] = resolve_file_errors @@new_post.errors

      render :json => { :errors => @@new_post.errors }
    end
  end

  private

  def paginated_posts
    posts = Post.all_from_category params[:category]
    page = params[:page] ? params[:page] : 1
    posts = posts.page(page)
  end

  def resolve_file_errors errors
    if errors.include?(:file)
      return errors[:file]
    elsif errors.include?(:image)
      return errors[:image]
    elsif errors.include?(:video)
      return errors[:video]
    else
      return nil
    end
  end

  def post_params
    params.require(:post).permit(:title, :original).merge(user_id: current_user.id)
  end

  def post_file_params
    params.require(:post).permit :file
  end
end
