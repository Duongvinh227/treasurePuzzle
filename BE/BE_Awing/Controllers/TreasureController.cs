

using BE_Awing.Entity;
using BE_Awing.Request;
using BE_Awing.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE_Awing.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TreasureController : ControllerBase
    {
        private readonly TreasureService treasureService;

        public TreasureController(TreasureService _treasureService)
        {
            treasureService = _treasureService;
        }


        // GET: /Treasure
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PuzzleEntity>>> GetAll()
        {
            var treasures = await treasureService.GetAllAsync();
            return Ok(treasures);
        }

        //// POST: /Treasure
        //[HttpPost]
        //public ActionResult<TreasureRequest> Create([FromBody] TreasureRequest newTreasure)
        //{
        //    if (string.IsNullOrWhiteSpace(newTreasure.Name))
        //    {
        //        return BadRequest("Tên kho báu không được để trống");
        //    }

        //    newTreasure.Id = Treasures.Count > 0 ? Treasures.Max(t => t.Id) + 1 : 1;
        //    Treasures.Add(newTreasure);

        //    return CreatedAtAction(nameof(GetAll), new { id = newTreasure.Id }, newTreasure);
        //}

        //// PUT: /Treasure/{id}
        //[HttpPut("{id}")]
        //public ActionResult Update(int id, [FromBody] TreasureRequest updatedTreasure)
        //{
        //    var treasure = Treasures.FirstOrDefault(t => t.Id == id);
        //    if (treasure == null)
        //    {
        //        return NotFound($"Không tìm thấy kho báu có id = {id}");
        //    }

        //    if (!string.IsNullOrWhiteSpace(updatedTreasure.Name))
        //        treasure.Name = updatedTreasure.Name;

        //    if (!string.IsNullOrWhiteSpace(updatedTreasure.Location))
        //        treasure.Location = updatedTreasure.Location;

        //    treasure.Value = updatedTreasure.Value;

        //    return NoContent();
        //}
    }
}
