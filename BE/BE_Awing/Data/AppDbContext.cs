using BE_Awing.Entity;
using Microsoft.EntityFrameworkCore;

namespace BE_Awing.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<PuzzleEntity> PuzzleEntity { get; set; }
    }
}
