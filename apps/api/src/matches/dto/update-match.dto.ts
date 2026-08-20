import { PartialType } from '@nestjs/swagger';

import { CreateMatchDto } from './create-match.dto';

/** Todo opcional: editás lo que cambió, no reenviás el partido entero. */
export class UpdateMatchDto extends PartialType(CreateMatchDto) {}
