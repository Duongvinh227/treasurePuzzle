using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_Awing.Response
{
    public class TreasureHistoryResponse
    {
        public int RowsCount { get; set; }

        public int ColumnsCount { get; set; }

        public int MaxChest { get; set; }

        public double MoveCost { get; set; }

        public string Moves { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
