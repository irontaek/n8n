import { MakeRoleMappingRuleRoleNullable1784896393356 as BaseMigration } from '../common/1784896393356-MakeRoleMappingRuleRoleNullable';

/**
 * Altering nullability recreates the table on SQLite. `role_mapping_rule` is
 * referenced by `role_mapping_rule_project` with ON DELETE CASCADE, so run
 * with FKs disabled to keep the cascade from wiping the join table.
 */
export class MakeRoleMappingRuleRoleNullable1784896393356 extends BaseMigration {
	withFKsDisabled = true as const;
}
