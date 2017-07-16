class SitemapsController < ApplicationController

  def show
    redirect_to "http://triafu.s3.amazonaws.com/sitemap.xml.gz"
  end

end
