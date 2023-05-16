import { makeAddPgTableOrderByPlugin, orderByAscDesc } from "postgraphile";

export default makeAddPgTableOrderByPlugin(
  "publ",
  "organization_memberships",
  ({ pgSql: sql }) => {
    const sqlIdentifier = sql.identifier(Symbol("member"));
    return orderByAscDesc(
      "MEMBER_NAME",
      // @ts-ignore
      ({ queryBuilder }) => sql.fragment`(
        select ${sqlIdentifier}.name
        from publ.users as ${sqlIdentifier}
        where ${sqlIdentifier}.id = ${queryBuilder.getTableAlias()}.user_id
        limit 1
      )`
    );
  }
);
