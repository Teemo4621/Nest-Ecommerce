import { IsArray, IsNumber, IsString, ArrayMinSize } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  product_id: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  codes: string[];
}
