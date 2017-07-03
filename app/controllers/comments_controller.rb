class CommentsController < ApplicationController
  before_action :authenticate_user!, :except => :index
  PAGINATES_PER = 9

  def index
    if request.format.json?
      @paginated_comments = paginated_comments
    end
  end

  def create
    @comment = Comment.new comment_params
    if @comment.save
      Notification.create user: @comment.post.user, actor: current_user, notifiable: @comment

      render :show
    else
      render :json => { :errors => @comment.errors }
    end
  end

  private

  def paginated_comments page=1
    c = Comment.all_from_post params[:post_id]
    page = params[:page] unless params[:page] == nil
    c = Kaminari.paginate_array(c).page(page).per(PAGINATES_PER)
  end

  def comment_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id]).merge(user: current_user)
  end
end
