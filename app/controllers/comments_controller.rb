class CommentsController < ApplicationController

  def index
    @comments = Comment.with_replies 1

    p "aaaaaaaaaaaaaaaaaaaaaaaa", @comments
  end

  def create
    if Comment.create comment_params
      json_comments params[:post_id], params[:page]
    end
  end

  def reply
    if Reply.create reply_params
      json_comments params[:post_id], params[:page]
    end
  end

  private

  def json_comments post_id, page=1
    comments =  Comment.all
    p comments
    p comments.display_to_json
    # comments = Comment.comments_and_replies post_id
    # paginated_comments = comments.page page
    #
    # respond_to do |format|
    #   format.json { render :json => {comments: paginated_comments.to_json, total_pages: paginated_comments.total_pages} }
    # end
  end

  def comment_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id])
  end

  def reply_params
    params.require(:comment).permit(:text).merge(post_id: params[:post_id], reply_to: params[:comment_id])
  end
end
