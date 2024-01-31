import { IsString, IsDateString, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOneDTO {
  @IsString()
  @ApiProperty({ type: String, description: "The image of the cert" })
  image: string;

  @IsString()
  @ApiProperty({ type: String, description: "The name of the cert" })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: "The tokenId of the cert" })
  tokenId: string;

  @IsString()
  @ApiProperty({ type: String, description: "The nftUrl of the cert" })
  nftUrl: string;

  @IsString()
  @ApiProperty({ type: String, description: "The openseaUrl of the cert" })
  openseaUrl: string;

  @IsDateString()
  @ApiProperty({ type: String, description: "The deactivatedAt of the cert" })
  deactivatedAt: Date;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: "The isSvcroUnderSyncing of the cert",
  })
  isSvcroUnderSyncing: boolean;

  @IsDateString()
  @ApiProperty({ type: String, description: "The lastRecordedAt of the cert" })
  lastRecordedAt: Date;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: "The isBelongToTheMockUser of the cert",
  })
  isBelongToTheMockUser: boolean;

  @IsString()
  @ApiProperty({ type: String, description: "The regoNo of the vehicle" })
  vehicleRegoNo: string;

  @IsString()
  @ApiProperty({ type: String, description: "The modelCode of the vehicle" })
  vehicleModelCode: string;

  @IsString()
  @ApiProperty({ type: String, description: "The extColour of the vehicle" })
  vehicleExtColour: string;

  @IsString()
  @ApiProperty({ type: String, description: "The intColour of the vehicle" })
  vehicleIntColour: string;
}
