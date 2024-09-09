import { Account } from '@/app/domain/models/account/account.model';
import { AccountEntity } from '@/app/infraestructure/entities/account-entity';
import { AccountMapperImplementation } from '@/app/infraestructure/gateways/account/account-gateway.mapper';

export function mapAccounts(
  accountEntities: AccountEntity[],
  mapper: AccountMapperImplementation
): Account[] {
  return accountEntities.map((entity) => mapper.mapFrom(entity));
}
