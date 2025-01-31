afterEach(async () => {
  await app.get(DataSource).createQueryBuilder().delete().from(User).execute();
}); 