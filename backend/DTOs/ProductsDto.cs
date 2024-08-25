namespace backend.DTOs
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public string ImageAlt { get; set; }
        public string CategoryName { get; set; }
        public int Price { get; set; }
    }

    public class UpdateProductRequest
    {
        public string Name { get; set; }
        public string ImageSrc { get; set; }
        public string ImageAlt { get; set; }
        public string CategoryName { get; set; }
        public int Price { get; set; }
    }

    public class CreateProductResponse
    {
        public GetProduct Product { get; set; }
    }

    public class UpdateProductResponse
    {
        public GetProduct Product { get; set; }
    }
    public class GetProducts
    {
        public List<GetProduct> Products { get; set; }
    }
    public class GetProduct
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string ImageSrc {get;set;}
        public string ImageAlt {get;set;}
        public string CategoryName { get; set; }
        public int Price { get; set; }
    }
}
