export default interface SqlDatabaseInterface {
  query(query: string, values: any): Promise<any>;
}
