

using BE_Awing.Entity;
using BE_Awing.Request;
using BE_Awing.Response;
using BE_Awing.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE_Awing.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TreasureController : ControllerBase
    {
        private readonly TreasureService treasureService;

        public TreasureController(TreasureService _treasureService)
        {
            treasureService = _treasureService;
        }

        //get history of all treasures
        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<TreasureHistoryResponse>>> GetAllHistory()
        {
            var treasures = await treasureService.GetAllHistoryAsync();
            return Ok(treasures);
        }

        //save map and treasure info
        [HttpPost("saveMapAndInfo")]
        public IActionResult Create([FromBody] TreasureRequest newTreasure)
        {
            if (newTreasure == null)
            {
                return BadRequest("No Data Insert");
            }
            try
            {
                treasureService.SaveData(newTreasure);
                return Ok(new { success = true, message = "Insert Data OK " });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Insert Data Faile", 
                                            error = ex.Message });
            }
        }
    }
}
