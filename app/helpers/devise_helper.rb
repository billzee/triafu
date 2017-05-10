module DeviseHelper
  def devise_error_messages!
    return "" unless devise_error_messages?

    messages = resource.errors.details.keys.map { |attr| content_tag(:li, resource.errors.full_messages_for(attr).first) }.join

    sentence = I18n.t("errors.messages.not_saved",
                      :count => resource.errors.count,
                      :resource => resource.class.model_name.human.downcase)

    html = <<-HTML
      <ul class="mb-0 list-unstyled">#{messages}</ul>
    HTML

    html.html_safe
  end

  def devise_error_messages?
    if resource
      !resource.errors.empty?
    else
      false
    end
  end
end
