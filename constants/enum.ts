export enum OrderStatus {
  CREATED = 'created',
  PURCHASED = 'purchased',
  CANCELLED = 'cancelled',
}

export enum UserRole {
  Administrator = 'administrator',
  Owner = 'owner',
  Staff = 'staff',
  Member = 'member',
}

export enum BookStatus {
  PENDING = 'pending',
  AVAILABLE = 'available',
  RENTING = 'renting',
  SOLD = 'sold',
  LOST = 'lost',
}

export enum ReturnBookType {
  RETURN = 'return',
  LOST = 'lost',
}
