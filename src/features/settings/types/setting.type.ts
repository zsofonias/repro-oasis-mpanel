export interface ISetting {
  id: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
  createdAt: string;
}

export interface ISettingFormData {
  id?: string;
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}
