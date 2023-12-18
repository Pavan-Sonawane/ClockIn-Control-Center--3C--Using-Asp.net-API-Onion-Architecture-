using Domain.Models;
using Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository.Context;

namespace WEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly MainDbcontext _context;

        public EventController(MainDbcontext context)
        {
            _context=context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventViewModel>>> GetEvents()
        {
            var events = await _context.Events
                .Select(e => new EventViewModel
                {
                    EventId = e.EventId,
                    UserID = e.UserID,
                    EventName = e.EventName,
                    EventDescription = e.EventDescription,
                    EventType = e.EventType,
                    Mentor = e.Mentor,
                    EventDatTime = e.EventDatTime,
                    status = e.status,
                    User = e.User
                })
                .ToListAsync();

            return events;
        }
        [HttpGet("ByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<EventViewModel>>> GetEventsByUser(int userId)
        {
            var events = await _context.Events
                .Where(e => e.UserID == userId)
                .Select(e => new EventViewModel
                {
                    EventId = e.EventId,
                    UserID = e.UserID,
                    EventName = e.EventName,
                    EventDescription = e.EventDescription,
                    EventType = e.EventType,
                    Mentor = e.Mentor,
                    EventDatTime = e.EventDatTime,
                    status = e.status,
                    User = e.User
                })
                .ToListAsync();

            return events;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<EventViewModel>> GetEvent(int id)
        {
            var @event = await _context.Events
                .Where(e => e.EventId == id)
                .Select(e => new EventViewModel
                {
                    EventId = e.EventId,
                    UserID = e.UserID,
                    EventName = e.EventName,
                    EventDescription = e.EventDescription,
                    EventType = e.EventType,
                    Mentor = e.Mentor,
                    EventDatTime = e.EventDatTime,
                    status = e.status,
                    User = e.User
                })
                .FirstOrDefaultAsync();

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }
        [HttpPost]
        public async Task<ActionResult<EventViewModel>> PostEvent(EventInsertModel eventModel)
        {
            var @event = new Event
            {
                UserID = eventModel.UserID,
                EventName = eventModel.EventName,
                EventDescription = eventModel.EventDescription,
                EventType = eventModel.EventType,
                Mentor = eventModel.Mentor,
                EventDatTime = eventModel.EventDatTime,
                status = eventModel.status
            };
            _context.Events.Add(@event);
            await _context.SaveChangesAsync();
            var eventViewModel = new EventViewModel
            {
                EventId = @event.EventId,
                UserID = @event.UserID,
                EventName = @event.EventName,
                EventDescription = @event.EventDescription,
                EventType = @event.EventType,
                Mentor = @event.Mentor,
                EventDatTime = @event.EventDatTime,
                status = @event.status,
                User = @event.User
            };
            return CreatedAtAction("GetEvent", new { id = eventViewModel.EventId }, eventViewModel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, EventInsertModel eventModel)
        {
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            @event.UserID = eventModel.UserID;
            @event.EventName = eventModel.EventName;
            @event.EventDescription = eventModel.EventDescription;
            @event.EventType = eventModel.EventType;
            @event.Mentor = eventModel.Mentor;
            @event.EventDatTime = eventModel.EventDatTime;
            @event.status = eventModel.status;

            _context.Entry(@event).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Events/5
        [HttpDelete("{EventID}")]
        public async Task<IActionResult> DeleteEvent(int EventID)
        {
            var @event = await _context.Events.FindAsync(EventID);

            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.EventId == id);
        }

    }
}

