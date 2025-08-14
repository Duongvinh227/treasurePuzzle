
using BE_Awing.Entity;
using BE_Awing.Repositories;
using BE_Awing.Request;


namespace BE_Awing.Services
{
    public class TreasureService
    {
        private readonly TreasureRepository repository;

        public TreasureService(TreasureRepository _repository)
        {
            repository = _repository;
        }

        public async Task<IEnumerable<PuzzleEntity>> GetAllAsync()
        {
            // Logic xử lý có thể thêm ở đây trước khi trả về controller
            return await repository.GetAllAsync();
        }
    }
}
