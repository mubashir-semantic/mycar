import { Expose, Transform } from 'class-transformer';
import { Report } from '../report.entity'; // Yeh import add kiya

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  // Yahan humne '{ obj }: { obj: Report }' likh kar type strictly define kar di
  @Transform(({ obj }: { obj: Report }) => obj.user.id)
  @Expose()
  userId: number;
}
