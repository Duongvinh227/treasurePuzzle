using BE_Awing.Entity;
using Microsoft.EntityFrameworkCore;

namespace BE_Awing.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<TreasureMap> TreasureMap { get; set; }

        public DbSet<TreasureHistory> TreasureHistory { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Khai báo composite key cho TreasureHistory
            modelBuilder.Entity<TreasureHistory>()
                .HasKey(th => new { th.MapUuid, th.HistoryUuid });

            // Khai báo composite key cho TreasureHistory
            modelBuilder.Entity<TreasureMap>()
                .HasKey(th => new { th.MapUuid });

            //// Khóa ngoại: MapUuid trong TreasureHistory tham chiếu TreasureMap
            //modelBuilder.Entity<TreasureHistory>()
            //    .HasOne(th => th.TreasureMap)       
            //    .WithMany(tm => tm.Histories)      
            //    .HasForeignKey(th => th.MapUuid);   

        }
    }
}
