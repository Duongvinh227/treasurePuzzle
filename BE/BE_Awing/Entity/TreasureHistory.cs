using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE_Awing.Entity
{
    public class TreasureHistory
    {
        [ForeignKey("TreasureMap")]
        public string MapUuid { get; set; }

        [Key]
        public string HistoryUuid { get; set; }

        public double MoveCost { get; set; }

        public string Moves { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
