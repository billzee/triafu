class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable,
  :omniauthable, :omniauth_providers => [:facebook, :google_oauth2]

  attr_accessor :login

  mount_uploader :avatar, AvatarUploader

  before_update :username_is_being_changed

  before_create :generate_default_image

  validates :full_name, presence: true, length: { :minimum => 4, :maximum => 32 }
  validates :username, presence: true, uniqueness: true, length: { :minimum => 4, :maximum => 14 }

  validates_format_of :username, with: /^[a-z0-9_\.]*$/, :multiline => true

  validate :username_cannot_be_changed_again
  validate :username_cannot_be_an_email

  validates_uniqueness_of :facebook_uid, :allow_blank => true, :allow_nil => true
  validates_uniqueness_of :google_oauth2_uid, :allow_blank => true, :allow_nil => true

  has_many :comments
  has_many :replies
  has_many :posts

  has_many :post_votes
  has_many :comment_votes
  has_many :reply_votes

  def image
    if self.avatar.file
      self.avatar
    elsif self.facebook_image || self.google_image
      self.facebook_image || self.google_image
    else
      "https://#{ENV['S3_BUCKET_NAME']}.s3.amazonaws.com/assets/#{self.default_image}.png"
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["omniauth_data"]
        info = data["info"]

        user.full_name = info["name"]
        user.email = info["email"]
      end
    end
  end

  def self.from_omniauth(auth)
    if auth.provider == 'facebook'
      omniauth_uid = :facebook_uid
      image = :facebook_image
    elsif auth.provider == 'google_oauth2'
      omniauth_uid = :google_oauth2_uid
      image = :google_image
    end

    where("#{omniauth_uid}": auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.full_name = auth.info.name
      user.password = Devise.friendly_token[0,20]
      user[image] = auth.info.image

      user.generate_username!
      if user.invalid? && user.errors.include?(:username)
        user.generate_secure_username!
      end

      user.skip_confirmation!
    end
  end

  def generate_username!
    username = full_name.delete(' ')[0..13]
    self.username = username.downcase
  end

  def generate_secure_username!
    random_number = SecureRandom.random_number(100).to_s
    username = full_name.delete(' ')[0..11] + random_number
    self.username = username.downcase
  end

  def generate_generic_username!
    username = SecureRandom.hex(4)
    self.username = username.downcase
  end

  private

  def username_cannot_be_an_email
    if username && username.match(Devise::email_regexp)
      errors.add(:username, "não pode ser um endereço de e-mail")
    end
  end

  def username_cannot_be_changed_again
    if username_changed && username_changed?
      errors.add(:username, "já foi alterado uma vez e não pode ser alterado novamente")
    end
  end

  def username_is_being_changed
    if username_changed?
      self.username_changed = true
    end
  end

  protected

  def generate_default_image
    colors = ["red", "yellow", "pink"]
    backgrounds = ["", "-inverse"]

    self.default_image = colors.sample + backgrounds.sample
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end

  def confirmation_required?
    false
  end
end
