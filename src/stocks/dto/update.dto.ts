import { IsString } from 'class-validator';

export class UpdateStockDto {
  @IsString()
  code: string;
}
