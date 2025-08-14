using BE_Awing.Data;
using BE_Awing.Entity;
using Microsoft.EntityFrameworkCore;
using System;


namespace BE_Awing.Repositories
{
    public class TreasureRepository 
    {
        private readonly AppDbContext database;

        public TreasureRepository(AppDbContext context)
        {
            database = context;
        }

        public async Task<List<PuzzleEntity>> GetAllAsync()
        {
            return await database.PuzzleEntity
                                 .FromSqlRaw("SELECT * FROM PuzzleEntity")
                                 .ToListAsync();
        }

    }

}
