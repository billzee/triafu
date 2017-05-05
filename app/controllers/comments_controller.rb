class CommentsController < ApplicationController
  before_action :authenticate_user!, :except => :index
  PAGINATES_PER = 9

  def index
    @paginated_comments = paginated_comments
  end

  def create
    @comment = Comment.new comment_params
    if @comment.save
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
    params.require(:comment).permit(:text).merge(post_id: params[:post_id]).merge(user_id: current_user.id)
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], comment_id: params[:comment_id])
  end
end
