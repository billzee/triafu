class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  before_create :generate_username

  validates :username, uniqueness: true

  validates_length_of :full_name, :minimum => 4, :maximum => 30
  validates_length_of :username, :minimum => 4, :maximum => 14

  has_many :comments
  has_many :replies
  has_many :posts

  def generate_username
    i = 0

    until valid_attribute?('username')

      case i
      when 0
        username = full_name.delete(' ')[0..14]
        username.downcase!
      when 1
        username = email.split("@").first
        username.downcase!
      else
        random_number = rand(10 ** 3).to_s
        username = email.split("@").first + random_number
        username.downcase!
      end

      p 'username is ', username

      i = i + 1

    end
  end

  private

  def valid_attribute?(attribute_name)
    self.valid?
    p 'valid? ', self.valid?
    self.errors[attribute_name].blank?
  end

end
