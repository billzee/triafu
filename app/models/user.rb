class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable

  before_validation :generate_username

  validates :full_name, length: { :minimum => 4, :maximum => 32 }

  validates :username, uniqueness: true, length: { :minimum => 4, :maximum => 16 }

  has_many :comments
  has_many :replies
  has_many :posts

  def generate_username
    username = full_name.delete(' ')[0..14]
    username.downcase!

    if User.find_by(username: username) != nil
      random_number = SecureRandom.random_number(100).to_s
      username = username[0..11] + random_number
    end

    self.username = username
  end

  private

  def self.valid_attribute?(attr, value)
    mock = self.new(attr => value)
    unless mock.valid?
      return mock.errors.has_key?(attr)
    end
    true
  end

end
