using System.ComponentModel.DataAnnotations;

namespace BE_Awing.Entity
{
    public class TreasureMap
    {
        [Key]
        public string MapUuid { get; set; }

        public int RowsCount { get; set; } 

        public int ColumnsCount { get; set; } 

        public int MaxChest { get; set; }

    }
}
