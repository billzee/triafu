class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  before_create :generate_username

  validates_length_of :full_name, :minimum => 4, :maximum => 32
  validates_length_of :username, :minimum => 4, :maximum => 16

  validates :username, uniqueness: true

  has_many :comments
  has_many :replies
  has_many :posts

  def generate_username
    i = 0

    until valid_attribute?('username')

      case i
      when 0
        username = full_name.delete(' ')[0..14]
      else
        random_number = rand(10 ** 3).to_s
        username = full_name.delete(' ')[0..10] + random_number
      end

      self.username = username.downcase

      i = i + 1
    end
  end

  private

  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].blank?
  end

end
