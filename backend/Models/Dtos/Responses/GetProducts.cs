namespace backend.Models.Dtos
{
    public class GetProducts
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
    }
}