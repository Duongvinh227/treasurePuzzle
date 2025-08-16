
using BE_Awing.Entity;
using BE_Awing.Repositories;
using BE_Awing.Request;
using BE_Awing.Response;


namespace BE_Awing.Services
{
    public class TreasureService
    {
        private readonly TreasureRepository repository;

        public TreasureService(TreasureRepository _repository)
        {
            repository = _repository;
        }
        
        //save map and treasure info
        public async void SaveData(TreasureRequest newTreasure)
        {
            await repository.SaveData(newTreasure);
        }

        // Get all treasure history with map details
        public async Task<IEnumerable<TreasureHistoryResponse>> GetAllHistoryAsync()
        {
            return await repository.GetAllHistoryAsync();
        }
    }
}
