using BE_Awing.Data;
using BE_Awing.Entity;
using BE_Awing.Request;
using BE_Awing.Response;
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

        // Save map and treasure info to the database
        public async Task SaveData(TreasureRequest newTreasure)
        {
            await using var transaction = await database.Database.BeginTransactionAsync();
            try
            {
                var mapUuid = Guid.NewGuid().ToString();
                var historyUuid = Guid.NewGuid().ToString();

                // create TreasureMap with unique MapUuid
                var treasureMap = new TreasureMap
                {
                    MapUuid = mapUuid,
                    RowsCount = newTreasure.rowsCount,
                    ColumnsCount = newTreasure.columnsCount,
                    MaxChest = newTreasure.maxChest
                };

                // add TreasureMap to DbContext
                database.TreasureMap.Add(treasureMap);
                await database.SaveChangesAsync();

                //create TreasureHistory with MapUuid
                var treasureHistory = new TreasureHistory
                {
                    MapUuid = mapUuid,
                    HistoryUuid = historyUuid,
                    MoveCost = newTreasure.moveCost,
                    Moves = newTreasure.planMoves,
                    CreatedAt = DateTime.Now
                };

                //add TreasureHistory to DbContext
                database.TreasureHistory.Add(treasureHistory);
                await database.SaveChangesAsync();

                //Commit transaction
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                // Rollback transaction in case of error
                await transaction.RollbackAsync();
                throw new Exception("Error saving TreasureMap or TreasureHistory data", ex);
            }
        }

        // Get all treasure history with map details
        public async Task<List<TreasureHistoryResponse>> GetAllHistoryAsync()
        {
            var results = new List<TreasureHistoryResponse>();

            try
            {
                await using var connection = database.Database.GetDbConnection();
                if (connection.State != System.Data.ConnectionState.Open)
                    await connection.OpenAsync();

                using var command = connection.CreateCommand();
                command.CommandText = @"
                    SELECT 
                        h.MoveCost AS MoveCost,
                        h.Moves AS Moves,
                        h.CreatedAt AS CreatedAt,
                        m.RowsCount AS RowsCount,
                        m.ColumnsCount AS ColumnsCount,
                        m.MaxChest AS MaxChest
                    FROM TreasureHistory h
                    INNER JOIN TreasureMap m ON h.MapUuid = m.MapUuid
                    ORDER BY h.CreatedAt DESC";

                await using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    results.Add(new TreasureHistoryResponse
                    {
                        MoveCost = reader.GetDouble(reader.GetOrdinal("MoveCost")),
                        Moves = reader.GetString(reader.GetOrdinal("Moves")),
                        CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                        RowsCount = reader.GetInt32(reader.GetOrdinal("RowsCount")),
                        ColumnsCount = reader.GetInt32(reader.GetOrdinal("ColumnsCount")),
                        MaxChest = reader.GetInt32(reader.GetOrdinal("MaxChest"))
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            return results;
        }


    }

}
