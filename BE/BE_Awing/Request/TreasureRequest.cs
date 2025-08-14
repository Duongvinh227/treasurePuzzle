namespace BE_Awing.Request
{
    public class TreasureRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal Value { get; set; }
    }
}
