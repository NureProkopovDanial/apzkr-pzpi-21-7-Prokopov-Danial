using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AirTrack;
using AirTrack.Models;
using AirTrack.Interfaces;
using System.IO;

namespace AirTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaggagesController : ControllerBase
    {
        private readonly AppContext _context;
        private readonly IBarcodeService _barcodeService;

        public BaggagesController(AppContext context, IBarcodeService barcodeService)
        {
            _context = context;
            _barcodeService = barcodeService;
        }

        // GET: api/Baggages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Baggage>>> GetBaggages()
        {
            return await _context.Baggages.Include(c => c.Passenger).Include(c => c.Flight).ToListAsync();
        }

        // GET: api/Baggages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Baggage>> GetBaggage(int id)
        {
            var baggage = await _context.Baggages.FindAsync(id);

            if (baggage == null)
            {
                return NotFound();
            }

            return baggage;
        }

        // PUT: api/Baggages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBaggage(int id, Baggage baggage)
        {
            if (id != baggage.BaggageId)
            {
                return BadRequest();
            }

            _context.Entry(baggage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BaggageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Baggages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Baggage>> PostBaggage(Baggage baggage)
        {
            _context.Baggages.Add(baggage);
            await _context.SaveChangesAsync();

            _barcodeService.GenerateCode(baggage);
            return CreatedAtAction("GetBaggage", new { id = baggage.BaggageId }, baggage);
        }

        // DELETE: api/Baggages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBaggage(int id)
        {
            var baggage = await _context.Baggages.FindAsync(id);
            if (baggage == null)
            {
                return NotFound();
            }

            _context.Baggages.Remove(baggage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BaggageExists(int id)
        {
            return _context.Baggages.Any(e => e.BaggageId == id);
        }

        [HttpGet("code/{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
            var imageData = await _barcodeService.GetFileAsync(id);
            return File(imageData, "image/png");
        }
    }
}
