class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, :trackable, :validatable

  before_update :username_is_being_changed

  validates :full_name, presence: true, length: { :minimum => 4, :maximum => 32 }
  validates :username, presence: true, uniqueness: true, length: { :minimum => 4, :maximum => 14 }

  validate :username_cannot_be_changed_again

  has_many :comments
  has_many :replies
  has_many :posts
  has_many :post_votes

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

  def confirmation_required?
    false
  end
end
