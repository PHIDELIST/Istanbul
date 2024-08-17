namespace backend.Models.Dtos
{
    public class GetProduct
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
    }
}
